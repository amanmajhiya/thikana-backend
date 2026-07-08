import { useParams, useNavigate } from 'react-router';
import { useProperty } from '@/contexts/PropertyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';
import GoogleLoginPrompt from '@/components/GoogleLoginPrompt';
import {
  ArrowLeft, Heart, Phone, MapPin, IndianRupee,
  Share2, Flag, BedDouble, Bath, Calendar, Maximize, Eye, Crown,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { requireGoogleLogin } = useAuth();
  const { getPropertyById, toggleFavorite, isFavorited, reportProperty } = useProperty();
  const [loginPromptAction, setLoginPromptAction] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const property = id ? getPropertyById(id) : undefined;
  const favorited = property ? isFavorited(property.id) : false;

  // Simulate view increment on mount
  useEffect(() => {
    if (property) {
      setViewCount(property.views + 1);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#F9FAFB]">
        <div className="text-center">
          <p className="text-gray-500">{t('noProperties')}</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 text-sm">{t('back')}</button>
        </div>
      </div>
    );
  }

  const handleFavorite = () => {
    if (!requireGoogleLogin('actionSaveProperty')) return;
    toggleFavorite(property.id);
  };

  const handleContact = () => {
    if (!requireGoogleLogin('actionContactOwner')) return;
    navigate(`/chat/${property.id}`);
  };

  const handleReport = () => {
    if (!requireGoogleLogin('actionReportProperty')) return;
    setShowReport(true);
  };

  const submitReport = (reason: string) => {
    reportProperty(property.id, reason);
    setShowReport(false);
  };

  const formatPrice = (price: number, priceType: string) => {
    if (priceType === 'monthly') return `\u20B9${price.toLocaleString('en-IN')}/month`;
    if (price >= 10000000) return `\u20B9${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `\u20B9${(price / 100000).toFixed(1)} Lacs`;
    return `\u20B9${price.toLocaleString('en-IN')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return String(views);
  };

  const isPremium = property.verified && property.price >= 1000000;
  const photos = property.photos.length > 0 ? property.photos : ['/prop-default-1.jpg'];

  const goToPrevPhoto = () => {
    setPhotoIndex((i) => (i > 0 ? i - 1 : photos.length - 1));
  };

  const goToNextPhoto = () => {
    setPhotoIndex((i) => (i < photos.length - 1 ? i + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNextPhoto();
      else goToPrevPhoto();
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB]">
      {/* Image Header with Swipe */}
      <div
        className="relative h-64 bg-gray-200 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Photo container */}
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${photoIndex * 100}%)` }}
        >
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`${property.title} ${idx + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md z-10"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Favorite + Share */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={handleFavorite}
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md"
          >
            <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Left / Right Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={goToNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Dot Indicators + Photo Counter */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <StatusBadge status={property.status} />
            {property.verified && <StatusBadge status="verified" />}
            {isPremium && (
              <span className="px-2 py-1 rounded-lg text-xs font-medium bg-amber-500 text-white flex items-center gap-0.5">
                <Crown className="w-3 h-3" />
                {t('premium')}
              </span>
            )}
          </div>
          {photos.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPhotoIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === photoIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
              <span className="ml-2 text-[10px] text-white/80 font-medium">
                {photoIndex + 1}/{photos.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 pb-24 space-y-5">
        {/* Price & Type */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <IndianRupee className="w-6 h-6 text-blue-700" />
            <span className="text-2xl font-bold text-gray-900">{formatPrice(property.price, property.priceType)}</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">{property.title}</h1>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">{property.address}</span>
          </div>
          {/* Views */}
          <div className="flex items-center gap-1 mt-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">{formatViews(viewCount)} {t('views')}</span>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {property.bedrooms && (
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
              <BedDouble className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">{t('numberOfRooms')}</p>
              <p className="font-semibold text-sm">{property.bedrooms}</p>
            </div>
          )}
          {property.bathrooms && (
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
              <Bath className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">{t('bathroom')}</p>
              <p className="font-semibold text-sm">{property.bathrooms}</p>
            </div>
          )}
          {property.builtUpArea && (
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
              <Maximize className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">{t('area')}</p>
              <p className="font-semibold text-sm">{property.builtUpArea} {t('sqft')}</p>
            </div>
          )}
          {property.furnished && (
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
              <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">{t('furnished')}</p>
              <p className="font-semibold text-sm">{property.furnished}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">{t('description')}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
        </div>

        {/* Amenities */}
        {property.amenities.length > 0 && (
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">{t('amenities')}</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Owner Info */}
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3">{t('ownerName')}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-semibold text-sm">
                  {property.ownerName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{property.ownerName}</p>
                <p className="text-xs text-gray-500">
                  {property.ownerMobileHidden ? t('contactViaChat') : property.ownerMobile}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Button */}
        <button
          onClick={handleReport}
          className="flex items-center gap-2 text-red-500 text-sm font-medium py-2"
        >
          <Flag className="w-4 h-4" />
          {t('reportProperty')}
        </button>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-30">
        <button
          onClick={handleContact}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Phone className="w-5 h-5" />
          {t('contact')}
        </button>
      </div>

      {/* Login Prompt */}
      {loginPromptAction && (
        <GoogleLoginPrompt
          action={loginPromptAction}
          onClose={() => setLoginPromptAction(null)}
        />
      )}

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
            <h3 className="text-lg font-semibold mb-3">{t('reportProperty')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('reportReason')}</p>
            <div className="space-y-2">
              {['fakeProperty', 'wrongLocation', 'alreadyRentedSold', 'wrongPrice', 'brokerListing', 'fraud'].map((reason) => (
                <button
                  key={reason}
                  onClick={() => submitReport(t(reason as 'fakeProperty'))}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-200 text-sm transition-colors"
                >
                  {t(reason as 'fakeProperty')}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowReport(false)}
              className="mt-4 w-full py-2.5 text-sm text-gray-500 hover:text-gray-700"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
