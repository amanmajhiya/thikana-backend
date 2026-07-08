import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, ArrowLeft } from 'lucide-react';

export default function Notifications() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      <div className="sticky top-14 z-30 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate('/home')} className="p-1.5 rounded-lg hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('notifications')}</h1>
      </div>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 text-blue-300" />
        </div>
        <p className="text-sm text-gray-500">{t('notificationDesc')}</p>
      </div>
    </div>
  );
}
