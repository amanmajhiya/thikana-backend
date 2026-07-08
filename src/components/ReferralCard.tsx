// ReferralCard - Compact referral summary card for Profile page
// Shows referral code, balance, and navigation to full referral page
import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReferral } from '@/contexts/ReferralContext';
import { motion } from 'framer-motion';
import { Share2, IndianRupee, ChevronRight, Users } from 'lucide-react';

export default function ReferralCard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { referralCode, balance, referrals } = useReferral();

  return (
    <motion.button
      onClick={() => navigate('/referral')}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left"
    >
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#1A56DB]/30 hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-11 h-11 rounded-xl bg-[#1A56DB] text-white flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>

            {/* Info */}
            <div>
              <p className="text-sm font-semibold text-gray-900">{t('referAndEarn')}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">{t('code')}:</span>
                <span className="text-xs font-bold text-[#1A56DB] tracking-wide">{referralCode}</span>
              </div>
            </div>
          </div>

          {/* Right side: balance + arrow */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="flex items-center gap-0.5 text-emerald-600">
                <IndianRupee className="w-3 h-3" />
                <span className="text-sm font-bold">{balance}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Users className="w-3 h-3" />
                <span className="text-xs">{referrals.length}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
