import { useLanguage } from '@/contexts/LanguageContext';
import { useProperty } from '@/contexts/PropertyContext';
import PropertyCard from '@/components/PropertyCard';
import EmptyState from '@/components/EmptyState';
import { SkeletonCardGrid } from '@/components/SkeletonCard';
import { useState, useEffect } from 'react';
import { Search, RefreshCw, Bed, Building, Home as HomeIcon, BedDouble, Map, Store, Briefcase, Warehouse, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router';
import { homePropertyTypes } from '@/lib/propertyData';
import type { PropertyType } from '@/lib/propertyData';
import { motion } from 'framer-motion';

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Bed, Building, Home: HomeIcon, BedDouble, Map, Store, Briefcase, Warehouse,
};

export default function Home() {
  const { t } = useLanguage();
  const { getProperties } = useProperty();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<ReturnType<typeof getProperties>>([]);
  const [activeCategory, setActiveCategory] = useState<PropertyType | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadProperties = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProperties(getProperties(activeCategory ? { propertyType: activeCategory } : undefined));
      setLoading(false);
      setIsRefreshing(false);
    }, 800);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    return loadProperties();
  }, [getProperties, activeCategory]);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    loadProperties();
  };

  const getCategoryLabel = (type: PropertyType) => {
    switch (type) {
      case 'Room': return t('categoryRoom');
      case 'Flat': return t('categoryFlat');
      case 'PG': return t('categoryPG');
      case 'House': return t('categoryHouse');
      case 'Villa': return t('categoryVilla');
      case 'Apartment': return t('categoryApartment');
      case 'Shop': return t('categoryShop');
      case 'Office': return t('categoryOffice');
      case 'Showroom': return t('categoryShowroom');
      case 'Warehouse': return t('categoryWarehouse');
      case 'Agriculture Land': return t('categoryAgricultureLand');
      case 'Plot': return t('categoryPlot');
      case 'Farm House': return t('categoryFarmHouse');
      case 'Hostel': return t('categoryHostel');
      default: return type;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      {/* Search Bar */}
      <div className="px-4 pt-3 pb-2 bg-gray-50">
          <div
            className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
            onClick={() => navigate('/search')}
          >
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-400 truncate">{t('searchPlaceholder')}</span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-shrink-0 p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-all"
            title={t('pullToRefresh')}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveCategory(null)}
            className={`flex flex-col items-center gap-1.5 flex-shrink-0 min-w-[72px] py-3 px-2 rounded-2xl border-2 transition-all ${
              activeCategory === null
                ? 'border-[#1A56DB] bg-blue-50 shadow-sm'
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCategory === null ? 'bg-blue-600' : 'bg-blue-50'}`}>
              <LayoutGrid className={`w-5 h-5 ${activeCategory === null ? 'text-white' : 'text-blue-600'}`} />
            </div>
            <span className={`text-[11px] font-semibold text-center leading-tight ${activeCategory === null ? 'text-blue-700' : 'text-gray-600'}`}>
              {t('all')}
            </span>
          </motion.button>
          {homePropertyTypes.map((pt, i) => {
            const IconComp = iconComponents[pt.icon] || Home;
            const isActive = activeCategory === pt.type;
            return (
              <motion.button
                key={pt.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: 0.32 + i * 0.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveCategory(isActive ? null : pt.type)}
                className={`flex flex-col items-center gap-1.5 min-w-[72px] py-3 px-2 rounded-2xl border-2 transition-all duration-150 ${
                  isActive
                    ? 'border-[#1A56DB] bg-blue-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-blue-600' : 'bg-blue-50'}`}>
                  <IconComp className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                </div>
                <span className={`text-[11px] font-semibold text-center leading-tight ${isActive ? 'text-blue-700' : 'text-gray-600'}`}>
                  {getCategoryLabel(pt.type)}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Pull to refresh hint */}
      <div className="px-4 pt-2 flex items-center justify-between">
        <p className="text-xs text-gray-400">{t('nearByYou')}</p>
        <p className="text-xs text-gray-400">{properties.length} {t('propertiesFound')}</p>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <SkeletonCardGrid count={6} />
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <EmptyState type="search" />
      )}
    </div>
  );
}
