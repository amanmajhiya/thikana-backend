import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUI } from '@/contexts/UIContext';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, LogOut, Heart, List, MessageCircle, Crown, Info,
  FileText, HelpCircle, ChevronRight, Shield, Settings, ArrowRight,
  Pencil, X, Check, Camera, Phone, Mail, MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ReferralCard from '@/components/ReferralCard';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  show: boolean;
  external?: boolean;
  onClick?: () => void;
}

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isLoggedIn, logout, isAdmin, updateUser } = useAuth();
  const { showSnackbar } = useUI();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editMobile, setEditMobile] = useState(user?.mobile || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editAddress, setEditAddress] = useState(user?.location || '');
  const [editPhoto, setEditPhoto] = useState(user?.photoUrl || '');
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    showSnackbar(t('logout'), 'success');
    navigate('/');
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditPhoto(url);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = () => {
    setEditPhoto('');
  };

  const validateEdit = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!editName.trim() || editName.trim().length < 2) {
      newErrors.name = t('requiredField');
    }
    if (!editMobile.trim()) {
      newErrors.mobile = t('requiredField');
    } else if (!/^[6-9]\d{9}$/.test(editMobile.trim())) {
      newErrors.mobile = t('invalidMobile');
    }
    if (editEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail.trim())) {
      newErrors.email = t('invalidEmail');
    }
    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [editName, editMobile, editEmail, t]);

  const handleSave = () => {
    if (!validateEdit()) return;
    updateUser({
      name: editName.trim(),
      mobile: editMobile.trim(),
      email: editEmail.trim() || undefined,
      location: editAddress.trim(),
      photoUrl: editPhoto || undefined,
    });
    setIsEditing(false);
    showSnackbar(t('profileUpdated'), 'success');
  };

  const handleCancel = () => {
    setEditName(user?.name || '');
    setEditMobile(user?.mobile || '');
    setEditEmail(user?.email || '');
    setEditAddress(user?.location || '');
    setEditPhoto(user?.photoUrl || '');
    setEditErrors({});
    setIsEditing(false);
  };

  const startEditing = () => {
    setEditName(user?.name || '');
    setEditMobile(user?.mobile || '');
    setEditEmail(user?.email || '');
    setEditAddress(user?.location || '');
    setEditPhoto(user?.photoUrl || '');
    setEditErrors({});
    setIsEditing(true);
  };

  const mainMenuItems: MenuItem[] = [
    { icon: List, label: t('myListings'), path: '/listings', show: isLoggedIn },
    { icon: Heart, label: t('saved'), path: '/saved', show: isLoggedIn },
    { icon: MessageCircle, label: t('chat'), path: '/chat', show: isLoggedIn },
    { icon: Crown, label: t('myPlan'), path: '/plans', show: isLoggedIn },
  ];

  const legalMenuItems: MenuItem[] = [
    { icon: Info, label: t('about'), path: '/legal/about', show: true },
    { icon: FileText, label: t('privacyPolicy'), path: '/legal/privacy', show: true },
    { icon: FileText, label: t('termsConditions'), path: '/legal/terms', show: true },
    { icon: HelpCircle, label: t('contactSupport'), path: '/legal/support', show: true },
  ];

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
      editErrors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 bg-[#F9FAFB] focus:border-[#1A56DB] focus:ring-2 focus:ring-blue-100'
    }`;

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB]">
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="bg-white px-5 pt-6 pb-5"
      >
        {isLoggedIn && user ? (
          <AnimatePresence mode="wait">
            {isEditing ? (
              /* EDIT MODE */
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                {/* Edit Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#1F2937]">{t('editProfile')}</h2>
                  <div className="flex items-center gap-1">
                    <button onClick={handleCancel} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                    <button onClick={handleSave} className="p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </button>
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#EFF6FF] flex items-center justify-center overflow-hidden border-2 border-[#E5E7EB]">
                      {editPhoto ? (
                        <img src={editPhoto} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-[#1A56DB]" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => editPhoto ? removePhoto() : fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#1A56DB] text-white flex items-center justify-center shadow-sm hover:bg-[#1E429F] transition-colors"
                    >
                      {editPhoto ? <X className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                  </div>
                  <span className="text-xs text-gray-400">{t('tapToChangePhoto')}</span>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1.5">
                    {t('name')} <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => { setEditName(e.target.value); if (editErrors.name) setEditErrors((p) => { const n = { ...p }; delete n.name; return n; }); }}
                      className={`${inputClass('name')} pl-10`}
                      placeholder={t('enterName')}
                    />
                  </div>
                  {editErrors.name && <p className="text-red-500 text-xs mt-1">{editErrors.name}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1.5">
                    {t('mobile')} <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                    <input
                      type="tel"
                      value={editMobile}
                      onChange={(e) => { const val = e.target.value.replace(/\D/g, '').slice(0, 10); setEditMobile(val); if (editErrors.mobile) setEditErrors((p) => { const n = { ...p }; delete n.mobile; return n; }); }}
                      className={`${inputClass('mobile')} pl-10`}
                      placeholder={t('enterMobile')}
                      inputMode="numeric"
                    />
                  </div>
                  {editErrors.mobile && <p className="text-red-500 text-xs mt-1">{editErrors.mobile}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1.5">
                    {t('email')} <span className="text-gray-400 font-normal">({t('optional')})</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => { setEditEmail(e.target.value); if (editErrors.email) setEditErrors((p) => { const n = { ...p }; delete n.email; return n; }); }}
                      className={`${inputClass('email')} pl-10`}
                      placeholder={t('emailPlaceholder')}
                    />
                  </div>
                  {editErrors.email && <p className="text-red-500 text-xs mt-1">{editErrors.email}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1.5">
                    {t('address')} <span className="text-gray-400 font-normal">({t('optional')})</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                    <textarea
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className={`${inputClass('address')} pl-10 resize-none`}
                      rows={2}
                      placeholder={t('enterAddress')}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* VIEW MODE */
              <motion.div
                key="view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-[#EFF6FF] flex items-center justify-center overflow-hidden shrink-0 border border-[#E5E7EB]">
                    {user.photoUrl ? (
                      <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-[#1A56DB]" />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-[#1F2937] truncate">{user.name}</h2>
                      {user.isGoogleVerified && (
                        <Badge
                          variant="default"
                          className="bg-[#1A56DB] hover:bg-[#1A56DB] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          {t('verified')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#4B5563] mt-0.5">{user.mobile}</p>
                    {user.email && (
                      <p className="text-sm text-[#6B7280] mt-0.5 truncate">{user.email}</p>
                    )}
                    {user.location && (
                      <p className="text-sm text-[#9CA3AF] mt-0.5 truncate">{user.location}</p>
                    )}
                  </div>

                  {/* Edit Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={startEditing}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
                    aria-label={t('editProfile')}
                  >
                    <Pencil className="w-4 h-4 text-[#9CA3AF]" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          /* Login Required State */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <h2 className="text-lg font-bold text-[#1F2937] mb-1">{t('loginRequired')}</h2>
            <p className="text-sm text-[#4B5563] mb-4">{t('loginToContinue')}</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/onboarding')}
              className="px-8 py-2.5 text-sm font-semibold text-white rounded-xl
                         shadow-sm hover:shadow-[0_4px_12px_rgba(26,86,219,0.3)] transition-shadow"
              style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #1E429F 100%)' }}
            >
              {t('continue')}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Admin Panel Button */}
      {isLoggedIn && isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOut, delay: 0.1 }}
          className="mx-4 mt-3"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin-panel')}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl 
                       bg-[#1F2937] text-white hover:bg-[#111827] transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
            <span className="flex-1 text-sm font-semibold text-left">{t('adminPanel')}</span>
            <ArrowRight className="w-4 h-4 text-white/70" />
          </motion.button>
        </motion.div>
      )}

      {/* Main Menu Items */}
      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOut, delay: 0.2 }}
          className="bg-white mx-4 mt-3 rounded-2xl border border-[#E5E7EB] overflow-hidden"
        >
          <div className="p-3">
            <ReferralCard />
          </div>
          <Separator className="bg-[#F3F4F6]" />
          {mainMenuItems
            .filter((item) => item.show)
            .map((item, index, arr) => (
              <div key={item.label}>
                <motion.button
                  whileTap={{ scale: 0.99, backgroundColor: '#F9FAFB' }}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 
                             hover:bg-[#F9FAFB] transition-colors duration-150 text-left"
                >
                  <item.icon className="w-5 h-5 text-[#4B5563] shrink-0" />
                  <span className="flex-1 text-sm font-medium text-[#1F2937]">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                </motion.button>
                {index < arr.length - 1 && (
                  <Separator className="bg-[#F3F4F6] ml-12" />
                )}
              </div>
            ))}
        </motion.div>
      )}

      {/* Legal / Info Menu */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: easeOut, delay: 0.25 }}
        className="bg-white mx-4 mt-3 rounded-2xl border border-[#E5E7EB] overflow-hidden"
      >
        {legalMenuItems
          .filter((item) => item.show)
          .map((item, index, arr) => (
            <div key={item.label}>
              <motion.button
                whileTap={{ scale: 0.99, backgroundColor: '#F9FAFB' }}
                onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3.5 
                           hover:bg-[#F9FAFB] transition-colors duration-150 text-left"
              >
                <item.icon className="w-5 h-5 text-[#4B5563] shrink-0" />
                <span className="flex-1 text-sm font-medium text-[#1F2937]">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#9CA3AF] shrink-0" />
              </motion.button>
              {index < arr.length - 1 && (
                <Separator className="bg-[#F3F4F6] ml-12" />
              )}
            </div>
          ))}
      </motion.div>

      {/* Logout Button */}
      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOut, delay: 0.3 }}
          className="mx-4 mt-3"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl 
                       border border-[#FECACA] bg-white text-[#DC2626] font-semibold text-sm
                       hover:bg-[#FEE2E2] transition-colors duration-150"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </motion.button>
        </motion.div>
      )}

      {/* App Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: easeOut, delay: 0.4 }}
        className="text-center py-6"
      >
        <p className="text-[11px] text-[#9CA3AF] font-medium tracking-wide uppercase">
          {t('appName')} &middot; {t('appVersion')}
        </p>
        <p className="text-[10px] text-[#D1D5DB] mt-1">{t('allRightsReserved')}</p>
      </motion.div>

      {/* Bottom spacer */}
      <div className="pb-24" />
    </div>
  );
}
