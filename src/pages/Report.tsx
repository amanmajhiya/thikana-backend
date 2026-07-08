import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUI } from '@/contexts/UIContext';
import LoginRequiredModal from '@/components/LoginRequiredModal';
import { reportReasons } from '@/lib/propertyData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Flag,
  MapPin,
  Home,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function Report() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { getPropertyById, reportProperty } = useProperty();
  const { showSnackbar } = useUI();

  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const property = id ? getPropertyById(id) : undefined;

  const reasonKeyMap: Record<string, string> = {
    'Fake property': 'fakeProperty',
    'Wrong location': 'wrongLocation',
    'Already rented/sold': 'alreadyRentedSold',
    'Wrong price': 'wrongPrice',
    'Broker listing': 'brokerListing',
    'Fraud/suspicious': 'fraud',
    'Other': 'other',
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      setError(t('selectReasonError'));
      return;
    }
    if (!id) return;

    reportProperty(id, selectedReason, description);
    setSubmitted(true);
    showSnackbar(t('reportSuccess'), 'success');

    // Auto navigate back after delay
    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/home');
      }
    }, 2500);
  };

  if (!isLoggedIn) {
    return <LoginRequiredModal onClose={() => navigate('/home')} />;
  }

  if (!property) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex items-center justify-center px-4">
        <div className="text-center">
          <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{t('propertyNotFound')}</p>
          <button
            onClick={() => navigate('/home')}
            className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {t('goHome')}
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1">
          {t('reportProperty')}
        </h1>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Property Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="flex p-3 gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gray-200 flex-shrink-0 overflow-hidden">
                    <img
                      src={property.photos[0] || '/prop-default-1.jpg'}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                      {t('reporting')}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-bold text-[#1A56DB]">
                        {formatPrice(property.price, property.priceType)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-500">
                        {property.locality}, {property.city}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Reason Selection */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {t('reportReason')}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {t('selectOneReason')}
                </p>

                <RadioGroup
                  value={selectedReason}
                  onValueChange={(val) => {
                    setSelectedReason(val);
                    setError('');
                  }}
                  className="space-y-2"
                >
                  {reportReasons.map((reason) => {
                    const key = reasonKeyMap[reason] || 'other';
                    const isSelected = selectedReason === reason;
                    return (
                      <div
                        key={reason}
                        onClick={() => {
                          setSelectedReason(reason);
                          setError('');
                        }}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-[#1A56DB] bg-blue-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <RadioGroupItem
                          value={reason}
                          id={reason}
                          className="border-gray-300 text-[#1A56DB]"
                        />
                        <Label
                          htmlFor={reason}
                          className={`text-sm font-medium cursor-pointer flex-1 ${
                            isSelected ? 'text-[#1A56DB]' : 'text-gray-700'
                          }`}
                        >
                          {t(key as 'fakeProperty')}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-xs mt-2 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  {t('additionalDetails')}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{t('optional')}</p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  rows={4}
                  placeholder={t('describeIssue')}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedReason}
                  className="w-full py-5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
                >
                  <Flag className="w-4 h-4" />
                  {t('submitReport')}
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            /* ─── Success State ─── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5"
              >
                <Check className="w-10 h-10 text-emerald-500" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-gray-900 mb-2"
              >
                {t('reportSuccess')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-500 mb-2"
              >
                {t('reportThankYou')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-gray-400"
              >
                {t('redirecting')}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
