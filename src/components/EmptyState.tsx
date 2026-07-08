import { useLanguage } from '@/contexts/LanguageContext';
import { SearchX, Home, MessageSquareOff, BookmarkX } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'saved' | 'chat' | 'listings' | 'generic';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const iconMap = {
  search: SearchX,
  saved: BookmarkX,
  chat: MessageSquareOff,
  listings: Home,
  generic: SearchX,
};

export default function EmptyState({
  type = 'generic',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { t } = useLanguage();
  const Icon = iconMap[type];

  const defaultTitles = {
    search: t('noProperties'),
    saved: t('noSavedProperties'),
    chat: t('noChats'),
    listings: t('noProperties'),
    generic: t('noProperties'),
  };

  const defaultDescriptions = {
    search: t('emptySearchDesc'),
    saved: t('emptySavedDesc'),
    chat: t('emptyChatDesc'),
    listings: t('emptyListingsDesc'),
    generic: t('emptyGenericDesc'),
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-blue-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title || defaultTitles[type]}
      </h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6">
        {description || defaultDescriptions[type]}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
