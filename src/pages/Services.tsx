import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  Sparkles, PaintBucket, Zap, Droplets, Truck, Sun,
  Banknote, Palette, Camera, BrickWall, Hammer, Container,
  ArrowLeft, Clock
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, PaintBucket, Zap, Droplets, Truck, Sun,
  Banknote, Palette, Camera, BrickWall, Hammer, Container,
};

const services = [
  { id: 'home-cleaning', nameKey: 'serviceHomeCleaning', icon: 'Sparkles' },
  { id: 'painter', nameKey: 'servicePainter', icon: 'PaintBucket' },
  { id: 'electrician', nameKey: 'serviceElectrician', icon: 'Zap' },
  { id: 'plumber', nameKey: 'servicePlumber', icon: 'Droplets' },
  { id: 'packers-movers', nameKey: 'servicePackersMovers', icon: 'Truck' },
  { id: 'solar', nameKey: 'serviceSolar', icon: 'Sun' },
  { id: 'home-loan', nameKey: 'serviceHomeLoan', icon: 'Banknote' },
  { id: 'interior', nameKey: 'serviceInterior', icon: 'Palette' },
  { id: 'cctv', nameKey: 'serviceCCTV', icon: 'Camera' },
  { id: 'construction', nameKey: 'serviceConstruction', icon: 'BrickWall' },
  { id: 'carpenter', nameKey: 'serviceCarpenter', icon: 'Hammer' },
  { id: 'water-tank', nameKey: 'serviceWaterTank', icon: 'Container' },
];

export default function Services() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] pb-24">
      {/* Header */}
      <div className="sticky top-14 z-30 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate('/home')} className="p-1.5 rounded-lg hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('services')}</h1>
      </div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mt-4 p-4 rounded-2xl bg-blue-600 text-white text-center"
      >
        <h2 className="text-lg font-bold mb-1">{t('servicesComingSoon')}</h2>
        <p className="text-sm text-blue-100">{t('servicesSubtitle')}</p>
      </motion.div>

      {/* Services Grid */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {services.map((service, i) => {
          const IconComponent = iconMap[service.icon] || Sparkles;
          return (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(`/services/${service.id}`)}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {t(service.nameKey as any)}
              </span>
              <span className="flex items-center gap-0.5 text-[10px] text-amber-600 font-medium">
                <Clock className="w-3 h-3" />
                {t('comingSoon')}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
