import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUI } from '@/contexts/UIContext';
import StatusBadge from '@/components/StatusBadge';
import LoginRequiredModal from '@/components/LoginRequiredModal';
import type { Property } from '@/lib/propertyData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Eye,
  AlertCircle,
  HelpCircle,
  Home,
  IndianRupee,
  MapPin,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type TabStatus = 'draft' | 'pending' | 'live' | 'rejected' | 'blocked';

const tabs: TabStatus[] = ['draft', 'pending', 'live', 'rejected', 'blocked'];

const tabBadgeColors: Record<TabStatus, string> = {
  draft: 'bg-gray-100 text-gray-600',
  pending: 'bg-amber-50 text-amber-600',
  live: 'bg-emerald-50 text-emerald-600',
  rejected: 'bg-red-50 text-red-600',
  blocked: 'bg-gray-100 text-gray-500',
};

interface EmptyTabStateProps {
  status: TabStatus;
}

function EmptyTabState({ status }: EmptyTabStateProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const config = {
    draft: {
      icon: Home,
      iconColor: 'text-gray-400',
      bgColor: 'bg-gray-50',
      title: t('noDrafts'),
      description: t('startAddingProperty'),
      showAction: true,
    },
    pending: {
      icon: AlertCircle,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-50',
      title: t('noPendingListings'),
      description: t('submittedPropertiesAppear'),
      showAction: false,
    },
    live: {
      icon: IndianRupee,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-50',
      title: t('noLiveListings'),
      description: t('approvedPropertiesAppear'),
      showAction: false,
    },
    rejected: {
      icon: Trash2,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-50',
      title: t('noRejectedListings'),
      description: '',
      showAction: false,
    },
    blocked: {
      icon: HelpCircle,
      iconColor: 'text-gray-400',
      bgColor: 'bg-gray-50',
      title: t('noBlockedListings'),
      description: t('contactSupportForInfo'),
      showAction: false,
    },
  };

  const c = config[status];
  const Icon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div
        className={`w-20 h-20 rounded-full ${c.bgColor} flex items-center justify-center mb-4`}
      >
        <Icon className={`w-10 h-10 ${c.iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{c.title}</h3>
      {c.description && (
        <p className="text-sm text-gray-500 max-w-xs mb-6">{c.description}</p>
      )}
      {c.showAction && (
        <button
          onClick={() => navigate('/add')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('addProperty')}
        </button>
      )}
    </motion.div>
  );
}

interface ListingCardProps {
  property: Property;
  onDelete: (id: string) => void;
}

function ListingCard({ property, onDelete }: ListingCardProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showReason, setShowReason] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const formatPrice = (price: number, priceType: string) => {
    if (priceType === 'monthly') {
      return `\u20B9${price.toLocaleString('en-IN')}/mo`;
    }
    if (price >= 10000000) {
      return `\u20B9${(price / 10000000).toFixed(1)} Cr`;
    }
    if (price >= 100000) {
      return `\u20B9${(price / 100000).toFixed(1)} L`;
    }
    return `\u20B9${price.toLocaleString('en-IN')}`;
  };

  const rejectedReasons: Record<string, string> = {
    prop_009: t('wrongCategory'),
    prop_010: t('insufficientPhotos'),
    prop_011: t('incorrectPricing'),
  };

  const reason = rejectedReasons[property.id] || t('wrongCategory');

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="flex p-3 gap-3">
          {/* Thumbnail */}
          <div
            className="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0 overflow-hidden cursor-pointer"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            <img
              src={property.photos[0] || '/prop-default-1.jpg'}
              alt={property.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-semibold text-gray-800 line-clamp-1 cursor-pointer"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              {property.title}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <IndianRupee className="w-3.5 h-3.5 text-[#1A56DB]" />
              <span className="text-sm font-bold text-[#1A56DB]">
                {formatPrice(property.price, property.priceType)}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500 line-clamp-1">
                {property.locality}, {property.city}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex-shrink-0">
            <StatusBadge status={property.status} />
          </div>
        </div>

        {/* Rejected Reason */}
        {property.status === 'rejected' && (
          <div className="px-3 pb-2">
            <button
              onClick={() => setShowReason(true)}
              className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {t('viewReason')}
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex border-t border-gray-100">
          <button
            onClick={() => navigate(`/property/${property.id}`)}
            className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-100"
          >
            <Eye className="w-3.5 h-3.5" />
            {t('view')}
          </button>
          <button
            onClick={() => navigate(`/add`)}
            className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-[#1A56DB] hover:bg-blue-50 transition-colors border-r border-gray-100"
          >
            <Pencil className="w-3.5 h-3.5" />
            {t('edit')}
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {t('delete')}
          </button>
        </div>
      </motion.div>

      {/* View Reason Dialog */}
      <Dialog open={showReason} onOpenChange={setShowReason}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">{t('rejectionReason')}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {property.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-sm font-medium text-red-700">{reason}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReason(false)}
              className="w-full"
            >
              {t('close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-500" />
              {t('deleteListing')}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {t('deleteConfirmation')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(property.id);
                setShowDeleteDialog(false);
              }}
              className="flex-1"
            >
              {t('delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function MyListings() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isLoggedIn, user } = useAuth();
  const { getMyListings, deleteProperty, properties } = useProperty();
  const { showSnackbar } = useUI();
  const [activeTab, setActiveTab] = useState<TabStatus>('pending');

  if (!isLoggedIn) {
    return <LoginRequiredModal onClose={() => navigate('/home')} />;
  }

  // Get listings filtered to current user's properties only
  const userProps = properties.filter((p) => {
    // User-created properties (starts with 'user_prop_') or seed properties
    // Filter by owner mobile or user-created property IDs:
    // Properties added by the current user are those from userProperties in context
    return p.ownerMobile === user?.mobile || p.id.startsWith('user_prop_');
  });

  const getTabListings = (status: TabStatus): Property[] => {
    const source = userProps.length > 0 ? userProps : getMyListings(status);
    return source.filter((p) => p.status === status);
  };

  const handleDelete = useCallback(
    (id: string) => {
      deleteProperty(id);
      showSnackbar(t('listingDeleted'), 'success');
    },
    [deleteProperty, showSnackbar, t]
  );

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => navigate('/home')}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1">{t('myListings')}</h1>
        <button
          onClick={() => navigate('/add')}
          className="flex items-center gap-1 text-sm font-semibold text-[#1A56DB] hover:text-blue-700 transition-colors px-2 py-1"
        >
          <Plus className="w-4 h-4" />
          {t('add')}
        </button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabStatus)}
        className="w-full"
      >
        <div className="bg-white border-b border-gray-100 px-2 sticky top-14 z-30">
          <TabsList className="w-full bg-transparent h-12 p-0 gap-0">
            {tabs.map((tab) => {
              const count = getTabListings(tab).length;
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#1A56DB] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#1A56DB] text-xs font-medium px-1 py-3 text-gray-500 hover:text-gray-700 transition-colors relative"
                >
                  {t(tab)}
                  {count > 0 && (
                    <span
                      className={`ml-1 min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold flex items-center justify-center ${
                        activeTab === tab
                          ? 'bg-blue-50 text-[#1A56DB]'
                          : tabBadgeColors[tab]
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {tabs.map((tab) => {
          const listings = getTabListings(tab);
          return (
            <TabsContent key={tab} value={tab} className="m-0">
              <AnimatePresence mode="wait">
                {listings.length > 0 ? (
                  <motion.div
                    key={`${tab}-list`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-3 pb-24"
                  >
                    <AnimatePresence>
                      {listings.map((property) => (
                        <ListingCard
                          key={property.id}
                          property={property}
                          onDelete={handleDelete}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${tab}-empty`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <EmptyTabState status={tab} />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
