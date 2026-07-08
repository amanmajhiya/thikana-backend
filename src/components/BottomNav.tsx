import { useLocation, useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  Home,
  LayoutGrid,
  Plus,
  MessageCircle,
  User,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { key: 'home', icon: Home, path: '/home' },
  { key: 'services', icon: LayoutGrid, path: '/services' },
  { key: 'addProperty', icon: Plus, path: '/add', isCenter: true },
  { key: 'chat', icon: MessageCircle, path: '/chat' },
  { key: 'profile', icon: User, path: '/profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Get active index
  const activeIdx = navItems.findIndex((item) => {
    if (item.path === '/add') {
      return location.pathname === '/add';
    }
    return location.pathname === item.path ||
      (item.path === '/services' && location.pathname.startsWith('/services'));
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-3 pt-2">
      {/* Glassmorphism floating nav */}
      <nav
        className="flex items-center justify-around gap-1 px-2 py-2 rounded-3xl w-full max-w-md relative"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow:
            '0 -4px 30px rgba(26,86,219,0.08), 0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        {/* Top edge subtle gradient line */}
        <div
          className="absolute inset-x-0 top-0 h-[1px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(26,86,219,0.15) 50%, transparent 100%)',
          }}
        />

        {navItems.map((item, i) => {
          const isActive = i === activeIdx;
          const isCenter = item.isCenter;
          const Icon = item.icon;
          const isHovered = hoveredIdx === i;

          if (isCenter) {
            // Center elevated button
            return (
              <motion.button
                key={item.key}
                onClick={() => navigate(item.path)}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
                whileHover={{ scale: 1.12, y: -4 }}
                whileTap={{ scale: 0.88, y: 2 }}
                className="relative flex flex-col items-center justify-center -mt-7 mx-1"
              >
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-[-6px] rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(26,86,219,0.15) 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: isActive ? [1, 1.15, 1] : 1,
                    opacity: isActive ? [0.6, 1, 0.6] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Main button */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center relative"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #1A56DB 0%, #2563EB 50%, #1E40AF 100%)'
                      : 'linear-gradient(135deg, #3B82F6 0%, #1A56DB 100%)',
                    boxShadow: isActive
                      ? '0 0 20px rgba(26,86,219,0.5), 0 4px 12px rgba(26,86,219,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                      : '0 4px 15px rgba(26,86,219,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  <Plus
                    className="w-6 h-6 text-white"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-[9px] font-bold mt-1.5 transition-colors duration-200 ${
                    isActive ? 'text-blue-700' : 'text-gray-400'
                  }`}
                >
                  {t(item.key)}
                </span>
              </motion.button>
            );
          }

          // Normal tab
          return (
            <motion.button
              key={item.key}
              onClick={() => navigate(item.path)}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center justify-center py-1 px-3 min-w-[52px]"
            >
              {/* Active background pill */}
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-2xl bg-blue-50"
                  style={{
                    boxShadow:
                      'inset 0 1px 2px rgba(26,86,219,0.08), 0 1px 2px rgba(26,86,219,0.04)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Hover background */}
              {!isActive && isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl bg-gray-50"
                  transition={{ duration: 0.15 }}
                />
              )}

              {/* Icon */}
              <div className="relative z-10">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              </div>

              {/* Label */}
              <span
                className={`relative z-10 text-[9px] font-semibold mt-1 transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700'
                    : 'text-gray-400'
                }`}
              >
                {t(item.key)}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTabDot"
                  className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-blue-600"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
