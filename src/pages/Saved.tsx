import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProperty } from '@/contexts/PropertyContext';
import PropertyCard from '@/components/PropertyCard';
import EmptyState from '@/components/EmptyState';
import { ArrowLeft } from 'lucide-react';

export default function Saved() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { properties, favorites } = useProperty();

  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      <div className="sticky top-0 z-40 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('saved')}</h1>
      </div>

      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <EmptyState
          type="saved"
          actionLabel={t('search')}
          onAction={() => navigate('/search')}
        />
      )}
    </div>
  );
}
