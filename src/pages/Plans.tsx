import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, X, Crown, Zap, Star, Shield, TrendingUp, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface Plan {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  period: string;
  features: string[];
  notIncluded: string[];
  badge: string | null;
  color: string;
  buttonClass: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    nameHi: 'मुफ्त',
    price: 0,
    period: 'perProperty',
    features: ['feat1PropertyListing', 'featUpTo3Photos', 'featStandardSearch', 'featAdminApproval', 'feat30Days'],
    notIncluded: ['featNotFeatured', 'featNotVerifiedBadge', 'featNotPriorityApproval', 'featNotAnalytics', 'featNotDirectContact'],
    badge: null,
    color: 'gray',
    buttonClass: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
  },
  {
    id: 'booster',
    name: 'Booster',
    nameHi: 'बूस्टर',
    price: 49,
    period: 'perProperty',
    features: ['feat1PropertyListing', 'featUpTo5Photos', 'featTop3Search', 'featBoostedBadge', 'feat3xViews', 'feat15DaysBoost'],
    notIncluded: ['featNotVerifiedBadge', 'featNotPriorityApproval', 'featNotAnalytics', 'featNotDirectContact'],
    badge: null,
    color: 'blue',
    buttonClass: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  {
    id: 'premium',
    name: 'Premium',
    nameHi: 'प्रीमियम',
    price: 199,
    period: 'perProperty',
    features: ['feat1PropertyListing', 'featUpTo10Photos', 'featHomepageFeatured', 'featGoldPremiumBadge', 'featGreenVerifiedTick', 'feat24hrApproval', 'featDirectWhatsApp', 'feat5xViews', 'feat45Days'],
    notIncluded: ['featNotAnalytics', 'featNotDirectContact'],
    badge: 'mostPopular',
    color: 'amber',
    buttonClass: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600',
  },
  {
    id: 'super',
    name: 'Super Premium',
    nameHi: 'सुपर प्रीमियम',
    price: 499,
    period: 'perProperty',
    features: ['feat1PropertyListing', 'featUpTo15PhotosVideo', 'featHomepageBanner', 'featCrownBadge', 'featInstantApproval', 'featAllContactDirect', 'featAnalytics', 'feat10xViews', 'feat60Days'],
    notIncluded: [],
    badge: 'bestValue',
    color: 'purple',
    buttonClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700',
  },
  {
    id: 'owner',
    name: 'Premium Owner',
    nameHi: 'प्रीमियम मालिक',
    price: 999,
    period: 'perMonth',
    features: ['featUnlimitedListings', 'featUpTo15PhotosEach', 'featAutoPremium', 'featGoldCrownBadge', 'featPrioritySupport', 'featFullAnalytics', 'featDownloadLeads', 'featCityInsights', 'featTrustedOwners', 'featWhatsAppAlerts'],
    notIncluded: [],
    badge: null,
    color: 'emerald',
    buttonClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700',
  },
];

const faqs = [
  { q: 'faqQ1', a: 'faqA1' },
  { q: 'faqQ2', a: 'faqA2' },
  { q: 'faqQ3', a: 'faqA3' },
  { q: 'faqQ4', a: 'faqA4' },
];

export default function Plans() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center h-14 px-4 gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{t('chooseYourPlan')}</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center mb-2">
          {t('planPageSubtitle')}
        </p>

        {/* Plan Cards */}
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`bg-white rounded-2xl border-2 ${plan.id === 'premium' ? 'border-amber-400 shadow-lg' : 'border-gray-100'} p-5`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${
                plan.id === 'premium' ? 'bg-amber-100 text-amber-700' :
                plan.id === 'super' ? 'bg-purple-100 text-purple-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {plan.id === 'premium' && <Star className="w-3 h-3" />}
                {plan.id === 'super' && <Zap className="w-3 h-3" />}
                {plan.id === 'owner' && <Crown className="w-3 h-3" />}
                {plan.badge ? t(plan.badge) : null}
              </div>
            )}

            {/* Plan Name */}
            <div className="flex items-center gap-2 mb-1">
              {plan.id === 'owner' && <Crown className="w-5 h-5 text-emerald-600" />}
              {plan.id === 'super' && <Shield className="w-5 h-5 text-purple-600" />}
              {plan.id === 'premium' && <Star className="w-5 h-5 text-amber-500" />}
              {plan.id === 'booster' && <Zap className="w-5 h-5 text-blue-600" />}
              {plan.id === 'free' && <TrendingUp className="w-5 h-5 text-gray-500" />}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">{lang === 'hi' ? plan.nameHi : plan.nameHi}</p>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
              <span className="text-sm text-gray-500">{t(plan.period)}</span>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-4">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {t(f as any)}
                </li>
              ))}
              {plan.notIncluded.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                  {t(f as any)}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.buttonClass}`}>
              {plan.id === 'free' ? t('getStarted') : t('upgrade')}
            </button>
          </motion.div>
        ))}

        {/* Note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          {t('allPlansInclude')}
        </p>

        {/* FAQ */}
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 text-center">{t('frequentlyAskedQuestions')}</h3>
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-gray-800 hover:bg-gray-50">
                {t(faq.q as any)}
              </summary>
              <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">
                {t(faq.a as any)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
