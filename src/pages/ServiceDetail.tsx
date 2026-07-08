import { useParams, useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';

const serviceNames: Record<string, string> = {
  'home-cleaning': 'serviceHomeCleaning',
  'painter': 'servicePainter',
  'electrician': 'serviceElectrician',
  'plumber': 'servicePlumber',
  'packers-movers': 'servicePackersMovers',
  'solar': 'serviceSolar',
  'home-loan': 'serviceHomeLoan',
  'interior': 'serviceInterior',
  'cctv': 'serviceCCTV',
  'construction': 'serviceConstruction',
  'carpenter': 'serviceCarpenter',
  'water-tank': 'serviceWaterTank',
};

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const nameKey = serviceId ? (serviceNames[serviceId] || 'services') : 'services';

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <div className="sticky top-14 z-30 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate('/services')} className="p-1.5 rounded-lg hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t(nameKey as any)}</h1>
      </div>

      {/* Coming Soon Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6"
        >
          <Clock className="w-12 h-12 text-blue-600" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          {t('comingSoon')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-sm text-gray-500 text-center mb-8"
        >
          {t('serviceAvailableSoon')}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/services')}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl"
        >
          {t('back')}
        </motion.button>
      </div>
    </div>
  );
}
