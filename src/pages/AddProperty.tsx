import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  propertyTypes,
  listingTypes,
  amenitiesByType,
  propertyTypeIcons,
} from '@/lib/propertyData';
import type { PropertyType, ListingType, PlanType } from '@/lib/propertyData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  X,
  Plus,
  Check,
  IndianRupee,
  Home,
  ChevronRight,
  ChevronLeft,
  Camera,
  Sparkles,
  Zap,
  Crown,
  Star,
  Building,
  MapPin,
  FileText,
  Tag,
  Bed,
  Maximize,
  Landmark,
  Eye,
  Send,
  BedDouble,
  Castle,
  Building2,
  Store,
  Briefcase,
  Warehouse,
  Wheat,
  Map,
  Trees,
  Users,
} from 'lucide-react';
import GoogleLoginPrompt from '@/components/GoogleLoginPrompt';

const propertyIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bed, Building, BedDouble, Home, Castle, Building2, Store, Briefcase,
  Warehouse, Wheat, Map, Trees, Users,
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type FormData = {
  title: string;
  description: string;
  price: string;
  negotiable: boolean;
  propertyType: PropertyType | '';
  listingType: ListingType | '';
  bedrooms: string;
  bathrooms: string;
  furnished: string;
  builtUpArea: string;
  city: string;
  locality: string;
  address: string;
  landmark: string;
  pincode: string;
  photos: string[];
  amenities: string[];
  plan: PlanType;
  showAddress: boolean;
};

const initialForm: FormData = {
  title: '',
  description: '',
  price: '',
  negotiable: false,
  propertyType: '',
  listingType: '',
  bedrooms: '',
  bathrooms: '',
  furnished: '',
  builtUpArea: '',
  city: '',
  locality: '',
  address: '',
  landmark: '',
  pincode: '',
  photos: [],
  amenities: [],
  plan: 'free',
  showAddress: true,
};

const plans: {
  key: PlanType;
  price: string;
  badge: string;
  icon: React.ReactNode;
  features: string[];
}[] = [
  {
    key: 'free',
    price: '\u20B90',
    badge: '',
    icon: <Sparkles className="w-5 h-5" />,
    features: ['freeFeature1', 'freeFeature2', 'freeFeature3'],
  },
  {
    key: 'boosted',
    price: '\u20B949',
    badge: 'boosted',
    icon: <Zap className="w-5 h-5" />,
    features: ['boostedFeature1', 'boostedFeature2', 'boostedFeature3'],
  },
  {
    key: 'premium',
    price: '\u20B9199',
    badge: 'mostPopular',
    icon: <Star className="w-5 h-5" />,
    features: ['premiumFeature1', 'premiumFeature2', 'premiumFeature3'],
  },
  {
    key: 'superPremium',
    price: '\u20B9499',
    badge: 'bestValue',
    icon: <Crown className="w-5 h-5" />,
    features: ['superFeature1', 'superFeature2', 'superFeature3'],
  },
  {
    key: 'premiumOwner',
    price: '\u20B9999/mo',
    badge: '',
    icon: <Building className="w-5 h-5" />,
    features: ['ownerFeature1', 'ownerFeature2', 'ownerFeature3'],
  },
];

const stepLabels = [
  'planAndPhotos',
  'propertyDetails',
  'addressLocation',
  'reviewSubmit',
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function AddProperty() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isLoggedIn, isBlocked, user, requireGoogleLogin } = useAuth();
  const { addProperty } = useProperty();

  const [step, setStep] = useState(0); // 0..3
  const [form, setForm] = useState<FormData>({ ...initialForm });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Load city from location screen */
  useEffect(() => {
    const savedCity = localStorage.getItem('thikana-city');
    if (savedCity && !form.city) {
      updateField('city', savedCity);
    }
  }, []);

  /* ---------- helpers ---------- */
  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const n = { ...prev };
          delete n[field];
          return n;
        });
      }
    },
    [errors]
  );

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    // Photo upload handler
    const newPhotos = Array.from(files)
      .slice(0, 10 - form.photos.length)
      .map((file) => URL.createObjectURL(file));
    if (newPhotos.length > 0) {
      setForm((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos].slice(0, 10),
      }));
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = (index: number) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  /* ---------- validation ---------- */
  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (form.photos.length < 1) newErrors.photos = t('minOnePhoto');
    }
    if (s === 1) {
      if (!form.propertyType) newErrors.propertyType = t('requiredField');
      if (!form.listingType) newErrors.listingType = t('requiredField');
      if (!form.title.trim()) newErrors.title = t('requiredField');
      if (!form.price.trim() || Number(form.price) <= 0) newErrors.price = t('requiredField');
      if (form.amenities.length === 0) newErrors.amenities = t('requiredField');
    }
    if (s === 2) {
      if (!form.city.trim()) newErrors.city = t('requiredField');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step < 3) {
      setStep((s) => s + 1);
      window.scrollTo(0, 0);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/home');
    }
  };

  /* ---------- submit ---------- */
  const handleSubmit = () => {
    // Save property to local storage via context
    addProperty({
      title: form.title.trim() || t('untitledProperty'),
      description: form.description.trim(),
      price: Number(form.price) || 0,
      priceType: form.listingType === 'Sale' ? 'fixed' : 'monthly',
      propertyType: (form.propertyType as PropertyType) || 'Room',
      listingType: (form.listingType as ListingType) || 'Rent',
      status: 'pending',
      verified: false,
      address: form.showAddress ? (form.address.trim() || form.locality.trim() || form.city || '') : '',
      city: form.city || '',
      locality: form.locality.trim() || form.city || '',
      photos:
        form.photos.length > 0 ? form.photos : ['/prop-default-1.jpg'],
      ownerName: user?.name || '',
      ownerMobile: user?.mobile || '',
      ownerMobileHidden: true,
      amenities: form.amenities,
      builtUpArea: form.builtUpArea ? Number(form.builtUpArea) : undefined,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      furnished: form.furnished as any,
      plan: form.plan,
    });
    setSubmitted(true);
    setShowUpgradePopup(true);
  };

  /* ---------- styles ---------- */
  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm transition-all outline-none ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 bg-[#F9FAFB] focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100'
    }`;

  /* ---------- login + google verification gate ---------- */
  if (!isLoggedIn) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex items-center justify-center px-4">
        <GoogleLoginPrompt
          action="add property"
          onClose={() => navigate('/home')}
        />
      </div>
    );
  }
  if (!requireGoogleLogin('addProperty')) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex items-center justify-center px-4">
        <GoogleLoginPrompt
          action="add property"
          onClose={() => navigate('/home')}
        />
      </div>
    );
  }

  /* ---------- blocked gate ---------- */
  if (isBlocked) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {t('blockedMessage')}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{t('contactSupport')}</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-2.5 bg-[#1A56DB] text-white text-sm font-semibold rounded-xl"
          >
            {t('home')}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- success screen ---------- */
  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex items-center justify-center px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5"
          >
            <Check className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-gray-900 mb-2"
          >
            {t('propertySubmitted')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-sm text-gray-500 mb-8"
          >
            {t('submittedPropertiesAppear')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <button
              onClick={() => navigate('/listings')}
              className="w-full py-3.5 bg-gradient-to-r from-[#1A56DB] to-[#1E429F] text-white font-semibold rounded-xl"
            >
              {t('myListings')}
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm({ ...initialForm });
                setShowUpgradePopup(false);
              }}
              className="w-full py-2.5 text-sm font-medium text-[#1A56DB] hover:underline"
            >
              {t('addAnotherProperty')}
            </button>
          </motion.div>
        </motion.div>

        {/* ---------- upgrade popup (optional, can skip) ---------- */}
        <AnimatePresence>
          {showUpgradePopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
              onClick={() => setShowUpgradePopup(false)}
            >
              <motion.div
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-1 rounded-full bg-gray-300 mx-auto mb-5" />
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-7 h-7 text-[#1A56DB]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                  {t('boostYourListing')}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-5">
                  {t('upgradeToReachMore')}
                </p>

                <div className="space-y-3 mb-5">
                  {plans.slice(1).map((p) => (
                    <button
                      key={p.key}
                      onClick={() => {
                        updateField('plan', p.key);
                        setShowUpgradePopup(false);
                      }}
                      className="w-full relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all text-left group"
                    >
                      {p.badge && (
                        <div className="absolute top-0 right-0 z-10">
                          <span className={`inline-block px-3 py-1 rounded-bl-xl text-[10px] font-bold text-white ${
                            p.key === 'premium' ? 'bg-blue-600' : 'bg-amber-500'
                          }`}>
                            {t(p.badge)}
                          </span>
                        </div>
                      )}
                      <div className="p-4 bg-gradient-to-br from-white to-gray-50 group-hover:from-blue-50 group-hover:to-white transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            {p.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">{t(p.key)}</h4>
                            <p className="text-base font-bold text-blue-600">{p.price}</p>
                          </div>
                        </div>
                        <ul className="space-y-1.5">
                          {p.features.map((f, fi) => (
                            <li key={fi} className="flex items-center gap-2 text-xs text-gray-600">
                              <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                              {t(f)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowUpgradePopup(false)}
                  className="w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {t('skipForNow')}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ---------- main form ---------- */
  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-28">
      {/* Header */}
      <div className="sticky top-14 z-30 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={goBack}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1">
          {t('addProperty')}
        </h1>
        <div className="flex items-center gap-1.5">
          {stepLabels.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-6 h-2.5 bg-[#1A56DB]'
                  : i < step
                    ? 'w-2.5 h-2.5 bg-blue-300'
                    : 'w-2.5 h-2.5 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step indicator labels */}
      <div className="px-4 pt-4 pb-2 max-w-lg mx-auto">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-[#1A56DB] uppercase tracking-wide">
            {t('step')} {step + 1} {t('of')} {stepLabels.length}
          </p>
          <p className="text-xs font-medium text-gray-500">
            {t(stepLabels[step])}
          </p>
        </div>
        {/* Progress bar */}
        <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A56DB] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / stepLabels.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {/* ============================================================ */}
        {/* STEP 1: Plan + Photos                                        */}
        {/* ============================================================ */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 max-w-lg mx-auto space-y-6"
          >
            {/* Selected Plan Card */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl border-2 border-blue-200 p-5 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                  {plans.find((p) => p.key === form.plan)?.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{t('selectedPlan')}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {t(form.plan)}
                  </p>
                  <p className="text-base font-bold text-blue-600">
                    {plans.find((p) => p.key === form.plan)?.price}
                  </p>
                </div>
                {form.plan === 'free' && (
                  <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    {t('free').toUpperCase()}
                  </span>
                )}
              </div>
              {/* Feature preview */}
              <div className="bg-white/80 rounded-xl p-3 mb-4 space-y-1.5">
                {plans.find((p) => p.key === form.plan)?.features.slice(0, 3).map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="w-3.5 h-3.5 text-blue-500" />
                    {t(f)}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowPlanPopup(true)}
                className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 text-sm font-bold hover:bg-blue-600 hover:text-white transition-all"
              >
                {t('choosePlan')}
              </button>
            </div>

            {/* Photo Upload */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-5 h-5 text-[#1A56DB]" />
                <h2 className="text-sm font-semibold text-gray-800">
                  {t('uploadPhotos')}{' '}
                  <span className="text-red-400">*</span>
                </h2>
              </div>

              <div className="flex gap-3 mb-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                {form.photos.length < 10 && (
                  <label
                    htmlFor="photo-upload"
                    className="w-40 h-44 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-[#1A56DB] hover:bg-blue-50/50 transition-colors flex-shrink-0 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-10 h-10 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">
                      {t('addPhoto')}
                    </span>
                    <span className="text-[10px] text-gray-400">{t('max10')}</span>
                  </label>
                )}
                <AnimatePresence>
                  {form.photos.map((photo, idx) => (
                    <motion.div
                      key={photo + idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="relative w-40 h-44 rounded-xl overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={photo}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <input
                id="photo-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                onChange={handlePhotoSelect}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {form.photos.length} / 10 {t('photos')}
                </span>
                {errors.photos && (
                  <p className="text-red-500 text-xs">{errors.photos}</p>
                )}
              </div>
            </div>

            {/* Photo tips */}
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-medium mb-2">{t('photoTips')}</p>
              <ul className="text-xs space-y-1.5 text-blue-700 list-disc list-inside">
                <li>{t('photoTip1')}</li>
                <li>{t('photoTip2')}</li>
                <li>{t('photoTip3')}</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: Property Details                                     */}
        {/* ============================================================ */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 max-w-lg mx-auto space-y-6"
          >
            {/* 1. Property Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Home className="w-4 h-4 inline mr-1 -mt-0.5 text-gray-400" />
                {t('propertyType')} <span className="text-red-400">*</span>
              </label>
              {errors.propertyType && (
                <p className="text-red-500 text-xs mb-2">{errors.propertyType}</p>
              )}
              <div className="grid grid-cols-3 gap-2">
                {propertyTypes.map((type) => {
                  const IconComp = propertyIconMap[propertyTypeIcons[type as keyof typeof propertyTypeIcons]] || Home;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField('propertyType', type)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl border-2 transition-all ${
                        form.propertyType === type
                          ? 'border-[#1A56DB] bg-blue-50 text-[#1A56DB]'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        form.propertyType === type ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <IconComp className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[11px] font-medium text-center leading-tight">
                        {type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Listing Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1 -mt-0.5 text-gray-400" />
                {t('listingType')} <span className="text-red-400">*</span>
              </label>
              {errors.listingType && (
                <p className="text-red-500 text-xs mb-2">{errors.listingType}</p>
              )}
              <div className="flex gap-3">
                {listingTypes.map((lt) => (
                  <button
                    key={lt}
                    type="button"
                    onClick={() => updateField('listingType', lt)}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                      form.listingType === lt
                        ? 'border-[#1A56DB] bg-blue-50 text-[#1A56DB]'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    {lt === 'Rent' ? t('rent') : lt === 'Sale' ? t('sale') : t('lease')}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Property Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1 -mt-0.5 text-gray-400" />
                {t('propertyTitle')} <span className="text-red-400">*</span>
              </label>
              {errors.title && (
                <p className="text-red-500 text-xs mb-2">{errors.title}</p>
              )}
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  updateField('title', e.target.value.slice(0, 100))
                }
                className={inputClass('title')}
                placeholder={t('enterTitle')}
              />
            </div>

            {/* 4. Property Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('description')}{' '}
                <span className="text-gray-400 font-normal">
                  ({t('optional')})
                </span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  updateField('description', e.target.value.slice(0, 500))
                }
                className={`${inputClass('description')} resize-none`}
                rows={3}
                placeholder={t('enterDescription')}
              />
              <span className="text-[10px] text-gray-400">
                {form.description.length}/500
              </span>
            </div>

            {/* 5. Price - Dynamic Label */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <IndianRupee className="w-4 h-4 inline mr-1 -mt-0.5 text-gray-400" />
                {form.listingType === 'Sale'
                  ? t('finalPrice')
                  : form.listingType === 'Rent' || form.listingType === 'Lease'
                  ? t('monthlyRent')
                  : t('price')}{' '}
                <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  className={`${inputClass('price')} pl-10`}
                  placeholder={
                    form.listingType === 'Sale'
                      ? t('placeholderSalePrice')
                      : form.listingType === 'Rent' || form.listingType === 'Lease'
                      ? t('placeholderRentPrice')
                      : t('enterPrice')
                  }
                />
              </div>
              {form.listingType === 'Rent' && (
                <p className="text-[11px] text-gray-400 mt-1">{t('perMonth') || 'Per month'}</p>
              )}
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            {/* 6. Negotiable - Yes/No Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t('negotiable')}</p>
                  <p className="text-xs text-gray-500">
                    {form.negotiable
                      ? t('priceNegotiableDesc')
                      : t('fixedPriceDesc')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateField('negotiable', true)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    form.negotiable
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  {t('yes')}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('negotiable', false)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    !form.negotiable
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  {t('no')}
                </button>
              </div>
            </div>

            {/* 7. Amenities - Single Dynamic Section */}
            {form.propertyType && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('amenities')} <span className="text-red-400">*</span>
                  {errors.amenities && (
                    <span className="text-red-500 text-xs ml-2 font-normal">{errors.amenities}</span>
                  )}
                </label>
                <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-blue-600 mb-3">
                    {t('availableFor')} {form.propertyType}:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      amenitiesByType[
                        form.propertyType as keyof typeof amenitiesByType
                      ] || []
                    ).map((amenity: string) => {
                      const isSelected = form.amenities.includes(amenity);
                      return (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? 'border-[#1A56DB] bg-blue-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#1A56DB] text-white'
                                : 'border-2 border-gray-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              isSelected ? 'text-[#1A56DB]' : 'text-gray-600'
                            }`}
                          >
                            {amenity}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 8. Area */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Maximize className="w-4 h-4 inline mr-1 -mt-0.5 text-gray-400" />
                {t('builtUpArea')}{' '}
                <span className="text-gray-400 font-normal">
                  ({t('optional')})
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={form.builtUpArea}
                  onChange={(e) =>
                    updateField('builtUpArea', e.target.value)
                  }
                  className={inputClass('builtUpArea')}
                  placeholder={t('placeholderArea')}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                  {t('sqft')}
                </span>
              </div>
            </div>

            {/* Spacer for bottom bar */}
            <div className="h-4" />
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: Address + Location                                   */}
        {/* ============================================================ */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 max-w-lg mx-auto space-y-6"
          >
            {/* City Name - MANDATORY */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1 -mt-0.5 text-gray-400" />
                {t('city')} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={errors.city ? inputClass('city').replace('border-gray-200', 'border-red-300').replace('bg-gray-50', 'bg-red-50') : inputClass('city')}
                placeholder={t('selectCity')}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            {/* Locality / Area */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('locality')}{' '}
                <span className="text-gray-400 font-normal">
                  ({t('optional')})
                </span>
              </label>
              <input
                type="text"
                value={form.locality}
                onChange={(e) => updateField('locality', e.target.value)}
                className={inputClass('locality')}
                placeholder={t('enterLocality')}
              />
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('fullAddress')}{' '}
                <span className="text-gray-400 font-normal">
                  ({t('optional')})
                </span>
              </label>
              <textarea
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
                className={`${inputClass('address')} resize-none`}
                rows={2}
                placeholder={t('enterAddress')}
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Landmark className="w-4 h-4 inline mr-1 -mt-0.5 text-gray-400" />
                {t('landmark')}{' '}
                <span className="text-gray-400 font-normal">
                  ({t('optional')})
                </span>
              </label>
              <input
                type="text"
                value={form.landmark}
                onChange={(e) => updateField('landmark', e.target.value)}
                className={inputClass('landmark')}
                placeholder={t('enterLandmark')}
              />
            </div>

            {/* Pin Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('pincode')}{' '}
                <span className="text-gray-400 font-normal">
                  ({t('optional')})
                </span>
              </label>
              <input
                type="text"
                value={form.pincode}
                onChange={(e) =>
                  updateField('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                className={inputClass('pincode')}
                placeholder={t('enterPincode')}
                maxLength={6}
                inputMode="numeric"
              />
            </div>

            {/* Show Full Address Toggle */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {t('showFullAddress') || 'Show Full Address'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {form.showAddress
                      ? (t('addressVisible') || 'Address will be visible on listing')
                      : (t('addressHidden') || 'Address will be hidden from listing')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => updateField('showAddress', !form.showAddress)}
                className={`relative w-14 h-8 rounded-full transition-all duration-200 ${
                  form.showAddress ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-200 ${
                    form.showAddress ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: Review + Submit                                      */}
        {/* ============================================================ */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 max-w-lg mx-auto space-y-6"
          >
            {/* Review header */}
            <div className="flex items-center gap-2 mb-4 mt-8">
              <Eye className="w-5 h-5 text-[#1A56DB]" />
              <h2 className="text-base font-semibold text-gray-800">
                {t('reviewYourProperty')}
              </h2>
            </div>

            {/* Plan summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">{t('plan')}</p>
              <div className="flex items-center gap-2">
                {plans.find((p) => p.key === form.plan)?.icon}
                <span className="font-semibold text-gray-900">
                  {t(form.plan)}
                </span>
                <span className="text-sm text-[#1A56DB] font-bold ml-auto">
                  {plans.find((p) => p.key === form.plan)?.price}
                </span>
              </div>
            </div>

            {/* Photos summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <p className="text-xs text-gray-500 mb-2">
                {t('photos')} ({form.photos.length})
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {form.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={photo}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3 mb-6">
              <p className="text-xs text-gray-500 font-medium">
                {t('propertyDetails')}
              </p>

              <ReviewRow
                label={t('propertyTitle')}
                value={form.title || '-'}
              />
              <ReviewRow
                label={t('propertyType')}
                value={form.propertyType || '-'}
              />
              <ReviewRow
                label={t('listingType')}
                value={form.listingType || '-'}
              />
              <ReviewRow
                label={t('price')}
                value={
                  form.price
                    ? `\u20B9${Number(form.price).toLocaleString('en-IN')}`
                    : '-'
                }
              />
              <ReviewRow
                label={t('bedrooms')}
                value={form.bedrooms ? `${form.bedrooms} ${t('bhk')}` : '-'}
              />
              <ReviewRow
                label={t('bathrooms')}
                value={form.bathrooms || '-'}
              />
              <ReviewRow
                label={t('furnished')}
                value={form.furnished || '-'}
              />
              <ReviewRow
                label={t('builtUpArea')}
                value={
                  form.builtUpArea ? `${form.builtUpArea} sq ft` : '-'
                }
              />
              <ReviewRow
                label={t('description')}
                value={form.description || '-'}
                full
              />
              {form.amenities.length > 0 && (
                <ReviewRow
                  label={t('amenities')}
                  value={form.amenities.join(', ')}
                  full
                />
              )}
            </div>

            {/* Location summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3 mb-6">
              <p className="text-xs text-gray-500 font-medium">
                {t('location')}
              </p>
              <ReviewRow label={t('city')} value={form.city || '-'} />
              <ReviewRow
                label={t('locality')}
                value={form.locality || '-'}
              />
              <ReviewRow
                label={t('fullAddress')}
                value={form.address || '-'}
                full
              />
              <ReviewRow
                label={t('landmark')}
                value={form.landmark || '-'}
              />
              <ReviewRow
                label={t('pincode')}
                value={form.pincode || '-'}
              />
            </div>

            {/* Submit note */}
            <p className="text-xs text-gray-500 text-center">
              {t('freePublishNote')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* FIXED BOTTOM ACTION BAR                                      */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* FIXED BOTTOM ACTION BAR - ALWAYS VISIBLE                     */}
      {/* ============================================================ */}
      <div className="fixed bottom-[72px] left-0 right-0 bg-white border-t border-gray-100 p-3 z-40">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 0 ? (
            <button
              onClick={goBack}
              className="px-5 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm flex items-center gap-1 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('back')}
            </button>
          ) : (
            <button
              onClick={goBack}
              className="px-5 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm flex items-center gap-1 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('cancel')}
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={goNext}
              className="flex-1 py-3.5 bg-gradient-to-r from-[#1A56DB] to-[#1E429F] text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm min-w-0"
            >
              {t('continue')} <ChevronRight className="w-4 h-4 flex-shrink-0" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3.5 bg-gradient-to-r from-[#1A56DB] to-[#1E429F] text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm min-w-0"
            >
              <Send className="w-4 h-4 flex-shrink-0" />
              {t('publishFree')}
            </button>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* PLAN SELECTION BOTTOM SHEET                                    */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showPlanPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={() => setShowPlanPopup(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-10 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 rounded-full bg-gray-300 mx-auto mb-5" />
              <h2 className="text-lg font-bold text-gray-900 text-center mb-1">
                {t('chooseYourPlan')}
              </h2>
              <p className="text-xs text-gray-500 text-center mb-5">
                {t('selectPlanDescription')}
              </p>

              <div className="space-y-3">
                {plans.map((p) => {
                  const isSelected = form.plan === p.key;
                  return (
                    <button
                      key={p.key}
                      onClick={() => {
                        updateField('plan', p.key);
                        setShowPlanPopup(false);
                      }}
                      className={`w-full relative overflow-hidden rounded-2xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-blue-600 shadow-lg shadow-blue-200'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {/* Badge */}
                      {p.badge && (
                        <div className="absolute top-0 right-0 z-10">
                          <span className={`inline-block px-3 py-1 rounded-bl-xl text-[10px] font-bold text-white ${
                            p.key === 'premium'
                              ? 'bg-blue-600'
                              : p.key === 'superPremium'
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}>
                            {t(p.badge)}
                          </span>
                        </div>
                      )}

                      <div className={`p-4 ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
                          : 'bg-white'
                      }`}>
                        {/* Header row */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-blue-50 text-blue-600'
                          }`}>
                            {p.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-bold text-gray-900">
                              {t(p.key)}
                            </h3>
                            <p className="text-lg font-bold text-blue-600">
                              {p.price}
                              {p.key === 'premiumOwner' && (
                                <span className="text-xs font-normal text-gray-400 ml-1">/{t('month')}</span>
                              )}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        {/* Features */}
                        <ul className="space-y-2">
                          {p.features.map((f, fi) => (
                            <li key={fi} className="flex items-center gap-2 text-xs text-gray-600">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                              }`}>
                                <Check className="w-3 h-3" />
                              </span>
                              {t(f)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowPlanPopup(false)}
                className="w-full mt-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {t('cancel')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Review Row Helper                                                  */
/* ------------------------------------------------------------------ */
function ReviewRow({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={`${full ? '' : 'flex items-center justify-between'}`}>
      <span className="text-xs text-gray-500">{label}</span>
      <span
        className={`text-xs font-medium text-gray-800 ${
          full ? 'block mt-0.5' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
}
