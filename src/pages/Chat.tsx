import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Home, ArrowLeft } from 'lucide-react';

const customerChats = [
  { id: 'chat_1', propertyTitle: '2BHK Flat in Gomti Nagar', ownerName: 'Amit Sharma', lastMessage: 'Is the property still available?', time: '2 min ago', unread: 2 },
  { id: 'chat_2', propertyTitle: 'Independent House in Vrindavan', ownerName: 'Priya Gupta', lastMessage: 'Yes, you can visit tomorrow', time: '1 hr ago', unread: 0 },
  { id: 'chat_3', propertyTitle: 'PG near University Road', ownerName: 'Rahul Verma', lastMessage: 'Rent is negotiable', time: 'Yesterday', unread: 1 },
];

const ownerChats = [
  { id: 'chat_o1', propertyTitle: 'My 3BHK Villa in Hazratganj', customerName: 'Suresh Kumar', lastMessage: 'Can I schedule a visit?', time: '5 min ago', unread: 1 },
  { id: 'chat_o2', propertyTitle: 'My Shop in Aminabad', customerName: 'Neha Singh', lastMessage: 'What is the final price?', time: '3 hr ago', unread: 0 },
];

export default function Chat() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'customer' | 'owner'>('customer');

  const chats = mode === 'customer' ? customerChats : ownerChats;

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      {/* Header */}
      <div className="sticky top-14 z-30 bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate('/home')} className="p-1.5 rounded-lg hover:bg-gray-100 lg:hidden">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">{t('chat')}</h1>
        </div>

        {/* Customer / Owner Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button onClick={() => setMode('customer')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'customer' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t('customer')}
          </button>
          <button onClick={() => setMode('owner')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'owner' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t('owner')}
          </button>
        </div>
      </div>

      {/* Mode Label */}
      <div className="px-4 py-2">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {mode === 'customer' ? t('myInquiries') : t('ownerInquiries')}
        </p>
      </div>

      {/* Chat List */}
      <div className="px-4 pb-4 space-y-2">
        {chats.map((chat, i) => (
          <motion.button key={chat.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="w-full flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-all text-left">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {mode === 'customer' ? (chat as any).ownerName : (chat as any).customerName}
                </h3>
                <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Home className="w-3 h-3" /> {chat.propertyTitle}
              </p>
              <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
            {'unread' in chat && chat.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {chat.unread}
              </span>
            )}
          </motion.button>
        ))}

        {chats.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">{t('noChats')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
