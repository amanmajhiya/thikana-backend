import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useProperty } from '@/contexts/PropertyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUI } from '@/contexts/UIContext';
import StatusBadge from '@/components/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ShieldAlert,
  UserX,
  Search,
  Eye,
  Check,
  X,
  Ban,
  Building2,
  Clock,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Property, PropertyStatus } from '@/lib/propertyData';

type AdminTab = 'pending' | 'live' | 'rejected' | 'reported' | 'users' | 'blocked';

interface AdminUser {
  id: string;
  name: string;
  mobile: string;
  location: string;
  status: 'active' | 'blocked';
  role: 'user' | 'admin';
  joinDate: string;
  propertyCount: number;
}

const adminUsersData: AdminUser[] = [
  { id: 'u1', name: 'Rahul Kumar', mobile: '9876543210', location: 'Lucknow', status: 'active', role: 'user', joinDate: '2025-01-15', propertyCount: 2 },
  { id: 'u2', name: 'Sneha Mishra', mobile: '8765432109', location: 'Delhi', status: 'active', role: 'user', joinDate: '2025-02-01', propertyCount: 1 },
  { id: 'u3', name: 'Amit Sharma', mobile: '7654321098', location: 'Bangalore', status: 'active', role: 'user', joinDate: '2025-02-10', propertyCount: 3 },
  { id: 'u4', name: 'Priya Gupta', mobile: '6543210987', location: 'Jaipur', status: 'blocked', role: 'user', joinDate: '2025-01-20', propertyCount: 0 },
  { id: 'u5', name: 'Vikram Singh', mobile: '5432109876', location: 'Mumbai', status: 'active', role: 'admin', joinDate: '2024-12-01', propertyCount: 1 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function Admin() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isLoggedIn, isAdmin } = useAuth();
  const { properties, updateProperty } = useProperty();
  const { showSnackbar } = useUI();
  const [activeTab, setActiveTab] = useState<AdminTab>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState<AdminUser[]>(adminUsersData);
  const [localProperties, setLocalProperties] = useState<Property[]>(properties);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Sync local properties when context changes
  if (properties.length !== localProperties.length) {
    setLocalProperties(properties);
  }

  const handleApprove = useCallback(
    (id: string) => {
      setLocalProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'live' as PropertyStatus } : p))
      );
      updateProperty(id, { status: 'live' });
      showSnackbar(t('propertyApproved'), 'success');
    },
    [updateProperty, showSnackbar, t]
  );

  const handleReject = useCallback(
    (id: string) => {
      setSelectedPropertyId(id);
      setRejectModalOpen(true);
    },
    []
  );

  const confirmReject = useCallback(() => {
    if (!selectedPropertyId) return;
    setLocalProperties((prev) =>
      prev.map((p) =>
        p.id === selectedPropertyId ? { ...p, status: 'rejected' as PropertyStatus } : p
      )
    );
    updateProperty(selectedPropertyId, { status: 'rejected' });
    setRejectModalOpen(false);
    setRejectReason('');
    setSelectedPropertyId(null);
    showSnackbar(t('propertyRejected'), 'error');
  }, [selectedPropertyId, updateProperty, showSnackbar, t]);

  const handleBlockUser = useCallback(
    (userId: string) => {
      setUserList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: 'blocked' as const } : u))
      );
      showSnackbar('User blocked', 'warning');
    },
    [showSnackbar]
  );

  const handleUnblockUser = useCallback(
    (userId: string) => {
      setUserList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: 'active' as const } : u))
      );
      showSnackbar('User unblocked', 'success');
    },
    [showSnackbar]
  );

  // Stats
  const allProps = localProperties.length > 0 ? localProperties : properties;
  const liveCount = allProps.filter((p) => p.status === 'live').length;
  const pendingCount = allProps.filter((p) => p.status === 'pending').length;
  const rejectedCount = allProps.filter((p) => p.status === 'rejected').length;
  const totalReports = allProps.reduce((sum, p) => sum + (p.reportedCount || 0), 0);
  const userCount = userList.length;
  const blockedUserCount = userList.filter((u) => u.status === 'blocked').length;

  // Filtered lists
  const pendingProperties = allProps.filter(
    (p) =>
      p.status === 'pending' &&
      (searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.locality.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const liveProperties = allProps.filter(
    (p) =>
      p.status === 'live' &&
      (searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.locality.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const rejectedProperties = allProps.filter(
    (p) =>
      p.status === 'rejected' &&
      (searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.locality.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const reportedProperties = allProps.filter(
    (p) =>
      (p.reportedCount || 0) > 0 &&
      (searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.locality.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const activeUsers = userList.filter(
    (u) =>
      u.status === 'active' &&
      (searchQuery === '' ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const blockedUsers = userList.filter(
    (u) =>
      u.status === 'blocked' &&
      (searchQuery === '' ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Access denied page
  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-[100dvh] bg-gray-50 flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
          This page is only accessible to admin users.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {t('back')}
        </button>
      </div>
    );
  }

  const statsCards = [
    { label: t('pending'), value: pendingCount, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: t('live'), value: liveCount, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: t('rejected'), value: rejectedCount, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { label: t('contactSupport') || 'Reports', value: totalReports, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Users', value: userCount, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: t('blocked'), value: blockedUserCount, icon: UserX, color: 'text-gray-500', bg: 'bg-gray-100' },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">
            {t('appName')} <span className="text-blue-600">Admin</span>
          </h1>
        </div>
        <span className="px-2.5 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
          ADMIN
        </span>
      </div>

      <ScrollArea className="h-[calc(100dvh-56px)]">
        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4"
        >
          {statsCards.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
            >
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 rounded-xl"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AdminTab)} className="px-4 pb-24">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="bg-white border border-gray-200 inline-flex w-auto min-w-full">
              <TabsTrigger value="pending" className="text-xs px-3">
                <Clock className="w-3 h-3 mr-1" />
                {t('pending')}
              </TabsTrigger>
              <TabsTrigger value="live" className="text-xs px-3">
                <CheckCircle className="w-3 h-3 mr-1" />
                {t('live')}
              </TabsTrigger>
              <TabsTrigger value="rejected" className="text-xs px-3">
                <XCircle className="w-3 h-3 mr-1" />
                {t('rejected')}
              </TabsTrigger>
              <TabsTrigger value="reported" className="text-xs px-3">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="users" className="text-xs px-3">
                <Users className="w-3 h-3 mr-1" />
                Users
              </TabsTrigger>
              <TabsTrigger value="blocked" className="text-xs px-3">
                <Ban className="w-3 h-3 mr-1" />
                {t('blocked')}
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          {/* Pending Tab */}
          <TabsContent value="pending" className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {pendingProperties.length > 0 ? (
                pendingProperties.map((p) => (
                  <PropertyAdminCard
                    key={p.id}
                    property={p}
                    onApprove={() => handleApprove(p.id)}
                    onReject={() => handleReject(p.id)}
                    onView={() => navigate(`/property/${p.id}`)}
                    showActions
                  />
                ))
              ) : (
                <EmptyTabState message="No pending properties" />
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Live Tab */}
          <TabsContent value="live" className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {liveProperties.length > 0 ? (
                liveProperties.map((p) => (
                  <PropertyAdminCard
                    key={p.id}
                    property={p}
                    onReject={() => handleReject(p.id)}
                    onView={() => navigate(`/property/${p.id}`)}
                    showActions
                    actionVariant="live"
                  />
                ))
              ) : (
                <EmptyTabState message="No live properties" />
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Rejected Tab */}
          <TabsContent value="rejected" className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {rejectedProperties.length > 0 ? (
                rejectedProperties.map((p) => (
                  <PropertyAdminCard
                    key={p.id}
                    property={p}
                    onApprove={() => handleApprove(p.id)}
                    onView={() => navigate(`/property/${p.id}`)}
                    showActions
                    actionVariant="rejected"
                  />
                ))
              ) : (
                <EmptyTabState message="No rejected properties" />
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Reported Tab */}
          <TabsContent value="reported" className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {reportedProperties.length > 0 ? (
                reportedProperties.map((p) => (
                  <motion.div
                    key={p.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={p.photos[0] || '/prop-default-1.jpg'}
                          alt={p.title}
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">{p.title}</h3>
                          <p className="text-xs text-gray-500">
                            {p.locality}, {p.city}
                          </p>
                          <p className="text-xs text-blue-600 font-medium">
                            ₹{p.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-red-50 rounded-full">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span className="text-xs font-semibold text-red-600">
                          {p.reportedCount} reports
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => navigate(`/property/${p.id}`)}
                        className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(p.id)}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleBlockUser(p.ownerMobile)}
                        className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Ban className="w-3 h-3" />
                        Block
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <EmptyTabState message="No reported properties" />
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {activeUsers.length > 0 ? (
                activeUsers.map((u) => (
                  <motion.div
                    key={u.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-11 h-11">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-semibold">
                            {u.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm text-gray-800">{u.name}</h3>
                            {u.role === 'admin' && (
                              <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {u.mobile} · {u.location}
                          </p>
                          <p className="text-xs text-gray-400">
                            {u.propertyCount} properties · Joined {new Date(u.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleBlockUser(u.id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg transition-colors"
                        >
                          Block
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <EmptyTabState message="No active users" />
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Blocked Tab */}
          <TabsContent value="blocked" className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {blockedUsers.length > 0 ? (
                blockedUsers.map((u) => (
                  <motion.div
                    key={u.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-4 rounded-xl border border-red-100 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-11 h-11">
                          <AvatarFallback className="bg-red-100 text-red-600 text-sm font-semibold">
                            {u.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm text-gray-800">{u.name}</h3>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-semibold rounded-full border border-gray-200">
                              BLOCKED
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {u.mobile} · {u.location}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnblockUser(u.id)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-medium rounded-lg transition-colors"
                      >
                        Unblock
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <EmptyTabState message="No blocked users" />
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </ScrollArea>

      {/* Reject Reason Modal */}
      <AnimatePresence>
        {rejectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 pb-4"
            onClick={() => setRejectModalOpen(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Reject Property</h3>
                <p className="text-sm text-gray-500">Please provide a reason for rejection</p>
              </div>
              <div className="p-4">
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g., Fake listing, insufficient photos..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none"
                  rows={3}
                />
              </div>
              <div className="p-4 flex gap-3">
                <button
                  onClick={() => setRejectModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={confirmReject}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Property Admin Card Component
function PropertyAdminCard({
  property,
  onApprove,
  onReject,
  onView,
  showActions,
  actionVariant = 'pending',
}: {
  property: Property;
  onApprove?: () => void;
  onReject?: () => void;
  onView?: () => void;
  showActions?: boolean;
  actionVariant?: 'pending' | 'live' | 'rejected';
}) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: 20 }}
      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <img
          src={property.photos[0] || '/prop-default-1.jpg'}
          alt={property.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">{property.title}</h3>
            <StatusBadge status={property.status} />
          </div>
          <p className="text-xs text-blue-600 font-medium">
            ₹{property.price.toLocaleString('en-IN')}
            {property.priceType === 'monthly' ? '/mo' : ''}
          </p>
          <p className="text-xs text-gray-500">
            {property.locality}, {property.city}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            By: {property.ownerName.charAt(0)}**** {property.ownerName.split(' ').pop()?.charAt(0)}****
          </p>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2 mt-3">
          {onView && (
            <button
              onClick={onView}
              className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3 h-3" />
              View
            </button>
          )}
          {actionVariant === 'pending' && onApprove && (
            <button
              onClick={onApprove}
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <Check className="w-3 h-3" />
              Approve
            </button>
          )}
          {actionVariant === 'rejected' && onApprove && (
            <button
              onClick={onApprove}
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <Check className="w-3 h-3" />
              Re-approve
            </button>
          )}
          {onReject && (
            <button
              onClick={onReject}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <X className="w-3 h-3" />
              Reject
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

function EmptyTabState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Building2 className="w-10 h-10 text-gray-300 mb-3" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}
