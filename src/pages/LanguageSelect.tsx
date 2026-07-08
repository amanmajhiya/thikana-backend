import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect } from 'react';

const languages: { code: Lang; label: string; native: string; sublabel: string; icon: string }[] = [
  { code: 'en', label: 'English', native: 'English', sublabel: 'English', icon: 'EN' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', sublabel: 'Hindi', icon: 'अ' },
  { code: 'hinglish', label: 'Hinglish', native: 'Hinglish', sublabel: 'English + Hindi', icon: 'A+अ' },
];

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSpring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

export default function LanguageSelect() {
  const navigate = useNavigate();
  const { t, setLang, lang } = useLanguage();

  // If already onboarded, skip to home
  useEffect(() => {
    const onboarded = localStorage.getItem('thikana-onboarded');
    if (onboarded === 'true') {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleSelect = (code: Lang) => {
    setLang(code);
    setTimeout(() => navigate('/onboarding'), 300);
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col relative overflow-hidden">
      {/* Top-right blue arc decoration */}
      <div
        className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,86,219,0.05) 0%, transparent 70%)' }}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: easeSpring }}
          className="mb-8"
        >
          <img src="/logo-thikana.png" alt="THIKANA" className="w-20 h-20 rounded-2xl shadow-lg" />
        </motion.div>

        {/* Welcome Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}
          className="text-center mb-2"
        >
          <p className="text-[28px] font-bold text-[#1F2937]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t('welcome')}
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.15 }}
          className="text-sm text-[#4B5563] mb-6 text-center"
        >
          {t('tagline')}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.2 }}
          className="w-[60%] h-px bg-[#E5E7EB] mb-6 origin-center"
        />

        {/* Instruction text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut, delay: 0.25 }}
          className="text-base font-medium text-[#4B5563] mb-6 text-center"
        >
          {t('chooseLanguage')}
        </motion.p>

        {/* Language Options with Icons */}
        <div className="w-full max-w-xs space-y-3">
          {languages.map((l, i) => (
            <motion.button
              key={l.code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOut, delay: 0.3 + i * 0.08 }}
              whileHover={{ scale: 1.01, borderColor: '#1A56DB', backgroundColor: '#EFF6FF' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(l.code)}
              className={`
                w-full flex items-center justify-between px-5 py-4 rounded-[14px] border-[1.5px] 
                transition-colors duration-150 bg-white
                ${lang === l.code
                  ? 'border-[#1A56DB] bg-[#EFF6FF]'
                  : 'border-[#E5E7EB]'
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Language Icon Badge */}
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{l.icon}</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[16px] text-[#1F2937]">{l.native}</p>
                  <p className="text-[13px] text-[#9CA3AF]">{l.sublabel}</p>
                </div>
              </div>
              {lang === l.code && (
                <div className="w-6 h-6 rounded-full bg-[#1A56DB] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Proudly Made in India */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="pb-6 flex flex-col items-center gap-1"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">&#x1F1EE;&#x1F1F3;</span>
          <span className="text-xs font-semibold text-gray-500 tracking-wide">
            {t('proudlyMadeInIndia')}
          </span>
          <span className="text-lg">&#x1F1EE;&#x1F1F3;</span>
        </div>
      </motion.div>
    </div>
  );
}
