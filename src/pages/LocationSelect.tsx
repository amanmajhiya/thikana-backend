import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { cities, getNearbyDistricts, getMetroCities, getPopularCities, searchCities, saveLocation, getRecentLocations, type City } from '@/lib/locationData';
import { MapPin, Search, Navigation, Clock, ChevronLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LocationSelect() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [recent, setRecent] = useState<City[]>([]);

  useEffect(() => {
    setRecent(getRecentLocations());
  }, []);

  const filteredCities = searchQuery ? searchCities(searchQuery) : [];
  const popularCities = getPopularCities();
  const nearbyDistricts = getNearbyDistricts();
  const metroCities = getMetroCities();

  const handleCitySelect = (city: City) => {
    saveLocation(city);
    navigate('/onboarding');
  };

  const handleAutoDetect = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Default to Lucknow after detection
          const lucknow = cities.find(c => c.id === 'lucknow')!;
          saveLocation(lucknow);
          setDetecting(false);
          navigate('/onboarding');
        },
        () => {
          setDetecting(false);
        },
        { timeout: 10000 }
      );
    } else {
      setDetecting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center h-14 px-4 gap-3">
          <button onClick={() => navigate('/language')} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{t('chooseLocation') || 'Choose Location'}</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Auto Detect */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleAutoDetect}
          disabled={detecting}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md disabled:opacity-70"
        >
          {detecting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> {t('detectingLocation') || 'Detecting...'}</>
          ) : (
            <><Navigation className="w-5 h-5" /> {t('useCurrentLocation') || 'Use Current Location'}</>
          )}
        </motion.button>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchCity') || 'Search city...'}
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {searchQuery && filteredCities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{t('searchCity')}</h3>
              <div className="flex flex-wrap gap-2">
                {filteredCities.map(city => (
                  <CityPill key={city.id} city={city} onSelect={handleCitySelect} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popular Cities */}
        {!searchQuery && (
          <>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SectionHeader title={t('popularCities') || 'Popular Cities'} />
              <div className="flex flex-wrap gap-2 mt-2">
                {popularCities.map((city, i) => (
                  <motion.div key={city.id} variants={itemVariants} custom={i}>
                    <CityPill city={city} onSelect={handleCitySelect} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Nearby Districts */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <SectionHeader title={t('nearbyDistricts') || 'Nearby Districts'} />
              <div className="flex flex-wrap gap-2 mt-2">
                {nearbyDistricts.map((city, i) => (
                  <motion.div key={city.id} variants={itemVariants} custom={i}>
                    <CityPill city={city} onSelect={handleCitySelect} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Metro Cities */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <SectionHeader title={t('topCities') || 'Top Metro Cities'} />
              <div className="flex flex-wrap gap-2 mt-2">
                {metroCities.map((city, i) => (
                  <motion.div key={city.id} variants={itemVariants} custom={i}>
                    <CityPill city={city} onSelect={handleCitySelect} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Locations */}
            {recent.length > 0 && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                <SectionHeader title={t('recentLocations') || 'Recent Locations'} icon={<Clock className="w-4 h-4" />} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {recent.map((city, i) => (
                    <motion.div key={city.id} variants={itemVariants} custom={i}>
                      <CityPill city={city} onSelect={handleCitySelect} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
      {icon}
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
    </div>
  );
}

function CityPill({ city, onSelect }: { city: City; onSelect: (city: City) => void }) {
  return (
    <button
      onClick={() => onSelect(city)}
      className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95"
    >
      <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
      <span>{city.name}</span>
      <span className="text-gray-400 text-xs">({city.nameHi})</span>
    </button>
  );
}
