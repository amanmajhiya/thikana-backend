import { useParams, useNavigate } from 'react-router';
import { useProperty } from '@/contexts/PropertyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Phone,
  Send,
  MoreVertical,
  Image,
  Paperclip,
  Check,
  CheckCheck,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'owner';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatThreadData {
  propertyId: string;
  ownerName: string;
  propertyTitle: string;
  messages: Message[];
}

const chatThreads: Record<string, ChatThreadData> = {
  prop_001: {
    propertyId: 'prop_001',
    ownerName: 'Amit Sharma',
    propertyTitle: 'Spacious 2BHK Flat with Balcony View',
    messages: [
      { id: 'm1', text: 'Hi, is this flat still available?', sender: 'user', timestamp: '10:30 AM', status: 'read' },
      { id: 'm2', text: 'Yes, it is available! When would you like to visit?', sender: 'owner', timestamp: '10:32 AM', status: 'read' },
      { id: 'm3', text: 'I am looking for something immediate. Can I visit today evening?', sender: 'user', timestamp: '10:35 AM', status: 'read' },
      { id: 'm4', text: 'Sure, 6 PM works for me. I will share the location pin.', sender: 'owner', timestamp: '10:36 AM', status: 'read' },
      { id: 'm5', text: 'That sounds great. What about the parking facility?', sender: 'user', timestamp: '10:38 AM', status: 'read' },
      { id: 'm6', text: 'There is dedicated parking for one car and visitor parking as well.', sender: 'owner', timestamp: '10:40 AM', status: 'read' },
      { id: 'm7', text: 'Is the price negotiable? I can visit tomorrow evening.', sender: 'user', timestamp: '11:15 AM', status: 'delivered' },
    ],
  },
  prop_003: {
    propertyId: 'prop_003',
    ownerName: 'Rajesh Gupta',
    propertyTitle: 'Independent House with Garden',
    messages: [
      { id: 'm1', text: 'Hello, I am interested in your property. Is it still available?', sender: 'user', timestamp: 'Yesterday, 3:00 PM', status: 'read' },
      { id: 'm2', text: 'Yes, the house is available for sale.', sender: 'owner', timestamp: 'Yesterday, 3:15 PM', status: 'read' },
      { id: 'm3', text: 'Can we schedule a visit tomorrow? I am available after 4 PM.', sender: 'user', timestamp: 'Yesterday, 3:30 PM', status: 'read' },
      { id: 'm4', text: 'Tomorrow works. Please bring your ID proof for security.', sender: 'owner', timestamp: 'Yesterday, 3:45 PM', status: 'read' },
      { id: 'm5', text: 'Thank you for the information. I will get back to you.', sender: 'user', timestamp: 'Yesterday, 4:00 PM', status: 'read' },
    ],
  },
  prop_007: {
    propertyId: 'prop_007',
    ownerName: 'Vikram Singh',
    propertyTitle: '3BHK Luxury Flat in Gated Society',
    messages: [
      { id: 'm1', text: 'Hi, what is the maintenance cost for this flat?', sender: 'user', timestamp: 'Yesterday, 9:00 AM', status: 'read' },
      { id: 'm2', text: 'Maintenance is ₹3,500 per month including water and security.', sender: 'owner', timestamp: 'Yesterday, 9:30 AM', status: 'read' },
      { id: 'm3', text: 'Is the society pet-friendly?', sender: 'user', timestamp: 'Yesterday, 10:00 AM', status: 'read' },
      { id: 'm4', text: 'Yes, pets are allowed. There is a pet park in the society too.', sender: 'owner', timestamp: 'Yesterday, 10:15 AM', status: 'read' },
      { id: 'm5', text: 'Great! I would like to schedule a visit this weekend.', sender: 'user', timestamp: 'Yesterday, 10:30 AM', status: 'read' },
    ],
  },
  prop_005: {
    propertyId: 'prop_005',
    ownerName: 'Ram Prasad',
    propertyTitle: 'Agricultural Land with Clear Title',
    messages: [
      { id: 'm1', text: 'Namaste, is the land title clear?', sender: 'user', timestamp: '2 days ago, 11:00 AM', status: 'read' },
      { id: 'm2', text: 'Yes, all documents are clear. The land title is verified.', sender: 'owner', timestamp: '2 days ago, 11:30 AM', status: 'read' },
      { id: 'm3', text: 'What is the road width leading to the land?', sender: 'user', timestamp: '2 days ago, 12:00 PM', status: 'read' },
      { id: 'm4', text: 'It is 20 feet wide pucca road. Easily accessible by tractor and car.', sender: 'owner', timestamp: '2 days ago, 12:15 PM', status: 'read' },
      { id: 'm5', text: 'The land documents are ready for verification.', sender: 'owner', timestamp: '2 days ago, 12:30 PM', status: 'read' },
    ],
  },
  prop_002: {
    propertyId: 'prop_002',
    ownerName: 'Suresh Kumar',
    propertyTitle: 'Cozy Single Room with Attached Bath',
    messages: [
      { id: 'm1', text: 'Hi, is the room still available for rent?', sender: 'user', timestamp: '3 days ago, 2:00 PM', status: 'read' },
      { id: 'm2', text: 'Yes, the room is still available. When can you move in?', sender: 'owner', timestamp: '3 days ago, 2:30 PM', status: 'read' },
      { id: 'm3', text: 'I need it from next month. Is that fine?', sender: 'user', timestamp: '3 days ago, 3:00 PM', status: 'read' },
      { id: 'm4', text: 'That works. I will need one month advance rent as security.', sender: 'owner', timestamp: '3 days ago, 3:30 PM', status: 'read' },
      { id: 'm5', text: 'Okay, can I visit the room this Saturday?', sender: 'user', timestamp: '3 days ago, 4:00 PM', status: 'read' },
      { id: 'm6', text: 'Yes, Saturday 11 AM works for me.', sender: 'owner', timestamp: '3 days ago, 4:15 PM', status: 'read' },
    ],
  },
};

const defaultThread: ChatThreadData = {
  propertyId: 'default',
  ownerName: 'Property Owner',
  propertyTitle: 'Property Discussion',
  messages: [
    { id: 'm1', text: 'Hi, I am interested in this property.', sender: 'user', timestamp: '10:00 AM', status: 'read' },
    { id: 'm2', text: 'Hello! Thank you for your interest. How can I help you?', sender: 'owner', timestamp: '10:05 AM', status: 'read' },
    { id: 'm3', text: 'Is it still available?', sender: 'user', timestamp: '10:10 AM', status: 'read' },
    { id: 'm4', text: 'Yes, it is available. Would you like to schedule a visit?', sender: 'owner', timestamp: '10:15 AM', status: 'read' },
    { id: 'm5', text: 'Sure, I can visit this weekend.', sender: 'user', timestamp: '10:20 AM', status: 'read' },
    { id: 'm6', text: 'Perfect! Saturday or Sunday works for me.', sender: 'owner', timestamp: '10:25 AM', status: 'read' },
  ],
};

function getStatusIcon(status?: string) {
  if (status === 'read') {
    return <CheckCheck className="w-3 h-3 text-emerald-400" />;
  }
  if (status === 'delivered') {
    return <CheckCheck className="w-3 h-3 text-blue-200" />;
  }
  return <Check className="w-3 h-3 text-blue-200" />;
}

export default function ChatDetail() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPropertyById } = useProperty();
  const [messages, setMessages] = useState<Message[]>(() => {
    if (id && chatThreads[id]) {
      return chatThreads[id].messages;
    }
    return defaultThread.messages;
  });
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const property = id ? getPropertyById(id) : undefined;

  const threadData = id && chatThreads[id]
    ? chatThreads[id]
    : {
        ownerName: property?.ownerName || defaultThread.ownerName,
        propertyTitle: property?.title || defaultThread.propertyTitle,
      };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: 'm_' + Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Simulate owner reply after 2 seconds
    setTimeout(() => {
      const replies = [
        t('chatReply1'),
        t('chatReply2'),
        t('chatReply3'),
        t('chatReply4'),
        t('chatReply5'),
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyMessage: Message = {
        id: 'm_reply_' + Date.now(),
        text: randomReply,
        sender: 'owner',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F0F2F5]">
      {/* Header */}
      <div className="bg-white px-3 py-3 border-b border-gray-100 flex items-center gap-3 shadow-sm flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <Avatar className="w-9 h-9">
          <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-semibold">
            {threadData.ownerName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-800 truncate">
            {threadData.ownerName}
          </h3>
          <p className="text-xs text-gray-500 truncate">{threadData.propertyTitle}</p>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Phone className="w-5 h-5 text-blue-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            const showDateDivider =
              index === 0 ||
              (messages[index - 1] &&
                messages[index - 1].timestamp !== msg.timestamp &&
                (msg.timestamp.includes('Yesterday') ||
                  msg.timestamp.includes('days ago')));

            return (
              <div key={msg.id}>
                {/* Date Divider */}
                {showDateDivider && index > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center my-4"
                  >
                    <span className="px-3 py-1 bg-gray-200 text-gray-500 text-xs rounded-full">
                      {msg.timestamp}
                    </span>
                  </motion.div>
                )}

                {/* Message Bubble */}
                <motion.div
                  initial={{ opacity: 0, y: isUser ? 16 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[15px] leading-relaxed ${
                      isUser
                        ? 'bg-[#1A56DB] text-white rounded-br-md'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 ${
                        isUser ? 'text-blue-200' : 'text-gray-400'
                      }`}
                    >
                      <span className="text-[11px]">{msg.timestamp}</span>
                      {isUser && getStatusIcon(msg.status)}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input Bar */}
      <div className="bg-white px-3 py-3 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <Image className="w-5 h-5 text-gray-400" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('typeMessage')}
              className="w-full px-4 py-2.5 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-100 text-sm"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
              input.trim()
                ? 'bg-[#1A56DB] hover:bg-blue-700'
                : 'bg-gray-200'
            }`}
          >
            <Send className={`w-4 h-4 ${input.trim() ? 'text-white' : 'text-gray-400'}`} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
