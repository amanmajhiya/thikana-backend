import { useNavigate } from 'react-router';
import {
  ArrowLeft, Gift, Users, Copy, CheckCircle, Share2,
  MessageCircle, IndianRupee, Wallet, Shield
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReferral } from '@/contexts/ReferralContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Referral() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    referralCode, balance, withdrawable, referrals, copyReferralCode, getShareText, upiId, setUpiId
  } = useReferral();
  const [copied, setCopied] = useState(false);
  const [upiInput, setUpiInput] = useState(upiId);
  const [upiSaved, setUpiSaved] = useState(false);

  const referralLink = `https://thikana.app/ref/${referralCode}`;
  const shareText = getShareText();
  const approvedCount = referrals.filter(r => r.status === 'approved').length;
  const pendingCount = referrals.filter(r => r.status === 'pending').length;

  // Use counts to avoid unused variable warnings
  const stats = { approved: approvedCount, pending: pendingCount };
  void stats;

  const handleCopy = async () => {
    const ok = await copyReferralCode();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareSMS = () => {
    const text = encodeURIComponent(shareText);
    window.open(`sms:?body=${text}`, '_blank');
  };

  const handleSaveUpi = () => {
    if (upiInput.trim()) {
      setUpiId(upiInput.trim());
      setUpiSaved(true);
      setTimeout(() => setUpiSaved(false), 2000);
    }
  };

  const handleShareMore = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('shareTitle'),
          text: shareText,
          url: referralLink,
        });
      } catch { /* user cancelled */ }
    } else {
      handleCopy();
    }
  };

  const steps = [
    {
      num: 1,
      title: t('step1Share'),
      desc: t('step1Desc'),
    },
    {
      num: 2,
      title: t('step2Join'),
      desc: t('step2Desc'),
    },
    {
      num: 3,
      title: t('step3Earn'),
      desc: t('step3Desc'),
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3"
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900">{t('referAndEarn')}</h1>
      </motion.div>

      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.05 }}
          className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
               style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #1E429F 100%)' }}>
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t('inviteFriends')}
          </h2>
          <p className="text-sm text-gray-600 max-w-xs mx-auto">
            {t('shareThikanaDesc')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <Users className="w-5 h-5 text-[#1A56DB] mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">{referrals.length}</p>
            <p className="text-[11px] text-gray-500">{t('friendsInvited')}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <IndianRupee className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">₹{balance}</p>
            <p className="text-[11px] text-gray-500">{t('rewardsEarned')}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <Wallet className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">₹{withdrawable}</p>
            <p className="text-[11px] text-gray-500">{t('withdrawable')}</p>
          </div>
        </motion.div>

        {/* UPI ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.13 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
        >
          <p className="text-sm font-semibold text-gray-800 mb-3 text-center">
            {t('upiId')}
          </p>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={upiInput}
              onChange={(e) => setUpiInput(e.target.value)}
              placeholder={t('enterUpiId')}
              className="flex-1 bg-[#F9FAFB] border-gray-200 text-center font-medium text-sm h-11"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveUpi}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shrink-0 text-white"
              style={{ background: upiSaved ? '#10B981' : 'linear-gradient(135deg, #1A56DB 0%, #1E429F 100%)' }}
            >
              {upiSaved ? t('upiSaved') : t('save')}
            </motion.button>
          </div>
          <p className="text-[11px] text-gray-400 text-center mt-2">
            {t('upiNote')}
          </p>
        </motion.div>

        {/* Referral Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.15 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
        >
          <p className="text-sm font-semibold text-gray-800 mb-3 text-center">
            {t('yourReferralCode')}
          </p>

          {/* Code Display */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-[#F9FAFB] rounded-xl px-4 py-3.5 border border-gray-200 text-center">
              <p className="text-xl font-bold text-[#1A56DB] tracking-[0.15em]">{referralCode}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-1.5 shrink-0 text-white"
              style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #1E429F 100%)' }}
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('copied') : t('copy')}
            </motion.button>
          </div>

          <p className="text-xs text-gray-500 text-center mb-4">
            {t('shareCodeToStart')}
          </p>

          {/* Share Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4" />
              {t('whatsapp')}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleShareSMS}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-[#1A56DB] text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Share2 className="w-4 h-4" />
              {t('sms')}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleShareMore}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-50 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <Share2 className="w-4 h-4" />
              {t('more')}
            </motion.button>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.2 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            {t('howItWorks')}
          </h3>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #1E429F 100%)' }}
                >
                  <span className="text-white text-sm font-bold">{step.num}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{step.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Referral History */}
        {referrals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.25 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              {t('referralHistory')}
            </h3>
            <div className="space-y-0">
              {referrals.map((ref, idx) => (
                <div key={ref.id}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{ref.referredName}</p>
                        <p className="text-xs text-gray-500">{ref.referredPhone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        ref.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : ref.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {ref.status === 'approved'
                          ? t('approved')
                          : ref.status === 'pending'
                          ? t('pending')
                          : t('rejected')}
                      </span>
                      {ref.amount > 0 && (
                        <p className="text-xs text-emerald-600 font-semibold mt-1">
                          +₹{ref.amount}
                        </p>
                      )}
                    </div>
                  </div>
                  {idx < referrals.length - 1 && <Separator className="bg-gray-100" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Terms & Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.3 }}
          className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
        >
          <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            {t('termsConditions')}
          </h4>
          <ul className="space-y-3">
            {[
              t('refTerm1'),
              t('refTerm2'),
              t('refTerm3'),
              t('refTerm4'),
              t('refTerm5'),
              t('refTerm6'),
              t('refTerm7'),
              t('refTerm8'),
            ].map((term, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                {term}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
