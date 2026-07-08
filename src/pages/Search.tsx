import { useLanguage } from '@/contexts/LanguageContext';
import { useProperty } from '@/contexts/PropertyContext';
import PropertyCard from '@/components/PropertyCard';
import EmptyState from '@/components/EmptyState';
import type { PropertyType, ListingType } from '@/lib/propertyData';
import { propertyTypes, listingTypes } from '@/lib/propertyData';
import { useState, useCallback } from 'react';
import {
  Search as SearchIcon, SlidersHorizontal, X, Check, RotateCcw,
  ArrowUpDown, MapPinned, IndianRupee, Eye, Clock
} from 'lucide-react';

type BHKOption = '1' | '2' | '3' | '4+';
type FurnishedOption = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
type SortOption = 'nearby' | 'priceLow' | 'priceHigh' | 'latest' | 'mostViewed';

export default function Search() {
  const { t } = useLanguage();
  const { getProperties } = useProperty();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState<PropertyType | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('nearby');
  const [radius, setRadius] = useState(10);
  const [filters, setFilters] = useState<{
    propertyType?: PropertyType;
    listingType?: ListingType;
    minPrice?: number;
    maxPrice?: number;
    bhk?: BHKOption;
    furnished?: FurnishedOption;
    verified?: boolean;
  }>({});

  const handleSearch = useCallback(() => {
    const combinedFilters = {
      ...filters,
      propertyType: activeQuickFilter || filters.propertyType,
    };
    let results = getProperties(combinedFilters).filter((p) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q)
      );
    });

    // Apply BHK filter client-side
    if (filters.bhk) {
      results = results.filter((p) => {
        if (!p.bedrooms) return false;
        if (filters.bhk === '4+') return p.bedrooms >= 4;
        return p.bedrooms === Number(filters.bhk);
      });
    }

    // Apply furnished filter client-side
    if (filters.furnished) {
      results = results.filter((p) => p.furnished === filters.furnished);
    }

    // Apply verified filter client-side
    if (filters.verified) {
      results = results.filter((p) => p.verified === true);
    }

    // Apply sorting
    if (sortBy === 'priceLow') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      results = [...results].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'mostViewed') {
      results = [...results].sort((a, b) => b.views - a.views);
    } else {
      // latest - sort by createdAt descending
      results = [...results].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return results;
  }, [query, filters, activeQuickFilter, sortBy, getProperties]);

  const results = handleSearch();

  const clearFilters = () => {
    setFilters({});
    setActiveQuickFilter(null);
    setQuery('');
    setSortBy('nearby');
    setRadius(10);
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  const hasActiveFilters =
    filters.propertyType ||
    filters.listingType ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.bhk ||
    filters.furnished ||
    filters.verified ||
    activeQuickFilter ||
    radius !== 10;

  const getPropertyTypeLabel = (type: string) => {
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

  const getListingTypeLabel = (type: string) => {
    if (type === 'Rent') return t('rent');
    if (type === 'Lease') return t('lease') || 'Lease';
    return t('sale');
  };

  const bhkOptions: BHKOption[] = ['1', '2', '3', '4+'];
  const furnishedOptions: FurnishedOption[] = ['Furnished', 'Semi-Furnished', 'Unfurnished'];

  const sortOptions: { key: SortOption; label: string; icon: React.ReactNode }[] = [
    { key: 'nearby', label: t('sortNearby'), icon: <MapPinned className="w-3 h-3" /> },
    { key: 'priceLow', label: t('sortPriceLow'), icon: <IndianRupee className="w-3 h-3" /> },
    { key: 'priceHigh', label: t('sortPriceHigh'), icon: <IndianRupee className="w-3 h-3" /> },
    { key: 'latest', label: t('sortLatest'), icon: <Clock className="w-3 h-3" /> },
    { key: 'mostViewed', label: t('sortMostViewed'), icon: <Eye className="w-3 h-3" /> },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-white px-4 py-3 border-b border-gray-100 shadow-sm">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="flex-1 bg-transparent outline-none text-sm"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative p-2.5 rounded-xl border transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-white border-gray-200 text-gray-500'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setActiveQuickFilter(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              activeQuickFilter === null
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {t('all')}
          </button>
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveQuickFilter(activeQuickFilter === type ? null : type)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeQuickFilter === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {getPropertyTypeLabel(type)}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-3 pb-2 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Sort By */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                {t('sortBy')}
              </label>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSortBy(opt.key)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      sortBy === opt.key
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Radius */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1">
                <MapPinned className="w-3 h-3" />
                {t('radius')}: <span className="text-blue-600 font-semibold">{radius} km</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>0 km</span>
                <span>50 km</span>
                <span>100 km</span>
              </div>
            </div>

            {/* Listing Type */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">{t('selectListingType')}</label>
              <div className="flex gap-2">
                {listingTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters((f) => ({ ...f, listingType: f.listingType === type ? undefined : type }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      filters.listingType === type
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {getListingTypeLabel(type)}
                  </button>
                ))}
              </div>
            </div>

            {/* BHK / Room Type */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                {t('bhkType')}
              </label>
              <div className="flex gap-2">
                {bhkOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilters((f) => ({ ...f, bhk: f.bhk === opt ? undefined : opt }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      filters.bhk === opt
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {opt === '4+' ? `4+ ${t('bhk')}` : `${opt} ${t('bhk')}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnished Status */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                {t('furnishedStatus')}
              </label>
              <div className="flex gap-2">
                {furnishedOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilters((f) => ({ ...f, furnished: f.furnished === opt ? undefined : opt }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      filters.furnished === opt
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {opt === 'Furnished' ? (t('furnished') || 'Furnished')
                      : opt === 'Semi-Furnished' ? (t('semiFurnished') || 'Semi-Furnished')
                      : (t('unfurnished') || 'Unfurnished')}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">{t('budget')}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={t('minPrice')}
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters((f) => ({ ...f, minPrice: Number(e.target.value) || undefined }))}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder={t('maxPrice')}
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) || undefined }))}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Verified Toggle */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                {t('verification')}
              </label>
              <button
                onClick={() => setFilters((f) => ({ ...f, verified: f.verified ? undefined : true }))}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filters.verified
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {filters.verified ? <Check className="w-3.5 h-3.5" /> : null}
                {t('verifiedOnly')}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={clearFilters}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t('resetFilter')}
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                {t('applyFilter')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="px-4 py-2 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {results.length} {results.length === 1 ? (t('propertyFound') || 'property found') : (t('propertiesFound') || 'properties found')}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 font-medium hover:underline"
          >
            {t('clearAll')}
          </button>
        )}
      </div>

      {/* Results */}
      <div className="p-4">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState
            type="search"
            actionLabel={t('resetFilter')}
            onAction={clearFilters}
          />
        )}
      </div>
    </div>
  );
}
