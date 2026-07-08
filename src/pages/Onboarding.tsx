import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Phone,
  MapPin,
  Navigation,
  Globe,
  ChevronDown,
  ChevronUp,
  Shield,
  ArrowLeft,
  Loader2,
  X,
  ChevronRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

type LocationMode = 'none' | 'auto' | 'map' | 'manual';

export default function Onboarding() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { login, googleLogin, isLoggedIn } = useAuth();

  // ─── Form State ───
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── Address / Location State ───
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [locationMode, setLocationMode] = useState<LocationMode>('none');
  const [manualCity, setManualCity] = useState('');
  const [detectedCity, setDetectedCity] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // ─── Popup State ───
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'terms' | 'privacy' | 'warning' | null>(null);

  // ─── Check if already onboarded or logged in ───
  useEffect(() => {
    const onboarded = localStorage.getItem('thikana-onboarded');
    if (onboarded === 'true' || isLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [navigate, isLoggedIn]);

  // ─── Name Change ───
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n.name;
        return n;
      });
    }
  };

  // ─── Mobile Change ───
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(val);
    if (errors.mobile) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n.mobile;
        return n;
      });
    }
  };

  // ─── Toggle Address Section ───
  const toggleAddress = () => {
    setIsAddressOpen((prev) => !prev);
    if (errors.location) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n.location;
        return n;
      });
    }
  };

  // ─── Auto Fetch Location ───
  const handleAutoFetch = () => {
    setLocationMode('auto');
    setIsLocating(true);
    setErrors((prev) => {
      const n = { ...prev };
      delete n.location;
      return n;
    });
    // Simulated GPS detection
    setTimeout(() => {
      setDetectedCity('Lucknow');
      setManualCity('Lucknow');
      setIsLocating(false);
      // Save location to local storage
      localStorage.setItem('thikana-city', 'Lucknow');
      localStorage.setItem('thikana-lat', '26.8467');
      localStorage.setItem('thikana-lng', '80.9462');
    }, 1500);
  };

  // ─── Choose from Map ───
  const handleChooseFromMap = () => {
    setLocationMode('map');
    setErrors((prev) => {
      const n = { ...prev };
      delete n.location;
      return n;
    });
    // Navigate to map picker, city will be set on return
    navigate('/location');
    const savedCity = localStorage.getItem('thikana-city');
    if (savedCity) {
      setDetectedCity(savedCity);
      setManualCity(savedCity);
    }
  };

  // ─── Manual City Input ───
  const handleManualCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualCity(e.target.value);
    setLocationMode('manual');
    if (e.target.value.trim()) {
      // Save city preference locally
      localStorage.setItem('thikana-city', e.target.value.trim());
      setErrors((prev) => {
        const n = { ...prev };
        delete n.location;
        return n;
      });
    }
  };

  // ─── Popup ───
  const openPopup = (type: 'terms' | 'privacy' | 'warning') => {
    setPopupType(type);
    setShowPopup(true);
  };

  // ─── Validation ───
  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = t('requiredField');
    }

    // Mobile validation (Indian 10-digit)
    if (!mobile.trim() || !/^[6-9]\d{9}$/.test(mobile.trim())) {
      newErrors.mobile = t('pleaseEnterMobile');
    }

    // Location validation
    const city = detectedCity || manualCity;
    if (!city.trim()) {
      newErrors.location = t('pleaseSelectLocation');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, mobile, detectedCity, manualCity, t]);

  // ─── Continue Handler ───
  const handleContinue = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    // Phone + Name login - NO OTP, direct register/login with backend
    await login(name.trim(), mobile.trim());

    localStorage.setItem('thikana-onboarded', 'true');
    localStorage.setItem('thikana-user-name', name.trim());

    const city = detectedCity || manualCity;
    if (city) localStorage.setItem('thikana-city', city);

    setIsSubmitting(false);
    navigate('/home');
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);

    // Google OAuth login via backend
    await googleLogin();

    localStorage.setItem('thikana-onboarded', 'true');
    localStorage.setItem('thikana-user-name', name.trim() || 'User');

    const city = detectedCity || manualCity;
    if (city) localStorage.setItem('thikana-city', city);

    setIsSubmitting(false);
    navigate('/home');
  };

  // ─── Form Validity Check ───
  const isFormValid =
    name.trim().length > 0 &&
    /^[6-9]\d{9}$/.test(mobile.trim()) &&
    !!(detectedCity || manualCity.trim());

  // ─── Display value for Address field ───
  const addressDisplay = detectedCity || manualCity || '';

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      {/* ─── Header with Back Button ─── */}
      <div className="flex items-center px-4 pt-4">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
          onClick={() => navigate('/')}
          className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
        </motion.button>
      </div>

      {/* ─── Scrollable Content ─── */}
      <div className="flex-1 overflow-y-auto px-6 pb-16">
        {/* ─── Logo ─── */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="flex justify-center mb-4"
        >
          <img
            src="/logo-thikana.png"
            alt="THIKANA"
            className="w-20 h-20 rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* ─── App Name ─── */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.1 }}
          className="text-center text-xl font-bold text-[#1A56DB] mb-1"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {lang === 'hi' ? 'ठिकाना' : 'THIKANA'}
        </motion.h1>

        {/* ─── Tagline ─── */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.15 }}
          className="text-center text-xs text-gray-500 mb-6"
        >
          घर हो या जमीन — भरोसे का ठिकाना
        </motion.p>

        {/* ═══════════════════════════════════════
            NAME FIELD
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.2 }}
          className="mb-5"
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('name')} <span className="text-red-400">*</span>
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <Input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder={t('enterName')}
              className={`w-full pl-11 pr-4 py-3.5 h-auto rounded-xl border text-base transition-all duration-150 ${
                errors.name
                  ? 'border-red-400 bg-red-50 focus-visible:border-red-500 focus-visible:ring-red-100'
                  : 'border-gray-200 bg-gray-50 focus-visible:border-[#1A56DB] focus-visible:ring-blue-100'
              }`}
            />
          </div>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1.5 ml-1"
            >
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        {/* ═══════════════════════════════════════
            MOBILE NUMBER FIELD
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.25 }}
          className="mb-5"
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('mobile')} <span className="text-red-400">*</span>
          </label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <div className="absolute left-10 top-0 bottom-0 flex items-center pr-2 border-r border-gray-200 z-10">
              <span className="text-sm text-gray-600 font-medium">+91</span>
            </div>
            <Input
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
              placeholder={t('enterMobile')}
              inputMode="numeric"
              className={`w-full pl-[88px] pr-4 py-3.5 h-auto rounded-xl border text-base transition-all duration-150 ${
                errors.mobile
                  ? 'border-red-400 bg-red-50 focus-visible:border-red-500 focus-visible:ring-red-100'
                  : 'border-gray-200 bg-gray-50 focus-visible:border-[#1A56DB] focus-visible:ring-blue-100'
              }`}
            />
          </div>
          {errors.mobile && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1.5 ml-1"
            >
              {errors.mobile}
            </motion.p>
          )}
        </motion.div>

        {/* ═══════════════════════════════════════
            ADDRESS BUTTON + COLLAPSIBLE LOCATION OPTIONS
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.3 }}
          className="mb-5"
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('address')} <span className="text-red-400">*</span>
          </label>

          {/* ─── Address Clickable Row ─── */}
          <button
            onClick={toggleAddress}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
              isAddressOpen || addressDisplay
                ? 'border-[#1A56DB] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
            }`}
          >
            <MapPin className="w-5 h-5 text-[#1A56DB] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${
                  addressDisplay ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {addressDisplay || t('selectLocation')}
              </p>
            </div>
            {isAddressOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
            )}
          </button>

          {/* ─── Expandable Location Options ─── */}
          <AnimatePresence>
            {isAddressOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="overflow-hidden"
              >
                <div className="pt-3 space-y-2">
                  {/* Option 1: Auto Fetch */}
                  <button
                    onClick={handleAutoFetch}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                      locationMode === 'auto' && detectedCity
                        ? 'border-[#1A56DB] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-4.5 h-4.5 text-[#1A56DB]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {t('autoFetchLocation')}
                      </p>
                      {locationMode === 'auto' && isLocating && (
                        <p className="text-xs text-[#1A56DB] flex items-center gap-1 mt-0.5">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          {t('detectingLocation')}
                        </p>
                      )}
                      {locationMode === 'auto' && detectedCity && !isLocating && (
                        <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {detectedCity}
                        </p>
                      )}
                    </div>
                  </button>

                  {/* Option 2: Choose from Map */}
                  <button
                    onClick={handleChooseFromMap}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                      locationMode === 'map'
                        ? 'border-[#1A56DB] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4.5 h-4.5 text-[#1A56DB]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {t('chooseFromMap')}
                      </p>
                    </div>
                  </button>

                  {/* Option 3: Enter City Manually */}
                  <button
                    onClick={() => setLocationMode('manual')}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                      locationMode === 'manual'
                        ? 'border-[#1A56DB] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4.5 h-4.5 text-[#1A56DB]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {t('enterCityManually')}
                      </p>
                    </div>
                  </button>

                  {/* Manual City Input (shown when manual mode selected) */}
                  <AnimatePresence>
                    {locationMode === 'manual' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <input
                          type="text"
                          value={manualCity}
                          onChange={handleManualCity}
                          placeholder={t('enterCity')}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Location Error */}
          {errors.location && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1.5 ml-1"
            >
              {errors.location}
            </motion.p>
          )}
        </motion.div>

        {/* ─── Spacer ─── */}
        <div className="flex-1 min-h-[20px]" />

        {/* ═══════════════════════════════════════
            TERMS & CONDITIONS TEXT
        ═══════════════════════════════════════ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[11px] text-gray-400 text-center leading-relaxed mb-4"
        >
          {t('byContinuing')}{' '}
          <button
            onClick={() => openPopup('terms')}
            className="text-[#1A56DB] hover:underline font-medium"
          >
            {t('termsConditions')}
          </button>{' '}
          {t('and')}{' '}
          <button
            onClick={() => openPopup('privacy')}
            className="text-[#1A56DB] hover:underline font-medium"
          >
            {t('privacyPolicy')}
          </button>
          .
        </motion.p>

        {/* ═══════════════════════════════════════
            CONTINUE BUTTON
        ═══════════════════════════════════════ */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.5 }}
          whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
          whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
          onClick={handleContinue}
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-150 shadow-sm mb-3 ${
            isFormValid && !isSubmitting
              ? 'text-white hover:shadow-lg cursor-pointer'
              : 'opacity-50 cursor-not-allowed text-gray-400 bg-gray-200'
          }`}
          style={{
            background:
              isFormValid && !isSubmitting
                ? 'linear-gradient(135deg, #1A56DB 0%, #1E429F 100%)'
                : undefined,
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> {t('continue')}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {t('continue')} <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </motion.button>

        {/* ═══════════════════════════════════════
            CONTINUE WITH GOOGLE BUTTON
        ═══════════════════════════════════════ */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {t('continueWithGoogle')}
        </motion.button>

        {/* ═══════════════════════════════════════
            PROUDLY MADE IN INDIA
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex items-center justify-center gap-2"
        >
          <span className="text-base">🇮🇳</span>
          <span className="text-[11px] font-semibold text-gray-400 tracking-wide">
            {t('proudlyMadeInIndia')}
          </span>
          <span className="text-base">🇮🇳</span>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════
          T&C / WARNING POPUP MODAL
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-gray-900">
                    {popupType === 'terms'
                      ? t('termsConditions')
                      : popupType === 'privacy'
                        ? t('privacyPolicy')
                        : t('importantNote')}
                  </h3>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('onboardingWarning')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
