import { useLanguage } from '@/contexts/LanguageContext';
import type { PropertyStatus } from '@/lib/propertyData';

interface StatusBadgeProps {
  status: PropertyStatus | 'verified' | 'active';
  size?: 'sm' | 'md';
}

const statusStyles: Record<string, string> = {
  live: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  draft: 'bg-gray-100 text-gray-600 border-gray-200',
  blocked: 'bg-gray-100 text-gray-500 border-gray-200',
  verified: 'bg-blue-50 text-blue-700 border-blue-200',
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const { t } = useLanguage();

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[10px]'
    : 'px-3 py-1 text-xs';

  const translatedStatus = t(status as 'live' | 'pending' | 'rejected' | 'blocked' | 'draft' | 'verified');

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium capitalize ${sizeClasses} ${
        statusStyles[status] || statusStyles.draft
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === 'live' || status === 'active'
            ? 'bg-emerald-500'
            : status === 'pending'
            ? 'bg-amber-500'
            : status === 'rejected'
            ? 'bg-red-500'
            : status === 'verified'
            ? 'bg-blue-500'
            : 'bg-gray-400'
        }`}
      />
      {translatedStatus}
    </span>
  );
}
