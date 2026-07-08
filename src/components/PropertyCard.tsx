import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProperty } from '@/contexts/PropertyContext';
import { useUI } from '@/contexts/UIContext';
import type { Property } from '@/lib/propertyData';
import { Heart, Phone, MapPin, BadgeCheck, IndianRupee, Eye, Crown, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import GoogleLoginPrompt from './GoogleLoginPrompt';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { toggleFavorite, isFavorited } = useProperty();
  const { showSnackbar } = useUI();
  const navigate = useNavigate();
  const [loginPromptAction, setLoginPromptAction] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = property.photos && property.photos.length > 0 ? property.photos : ['/prop-default-1.jpg'];

  const favorited = isFavorited(property.id);
  const isPremium = property.verified && property.price >= 1000000;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setLoginPromptAction('actionSaveProperty');
      return;
    }
    toggleFavorite(property.id);
    showSnackbar(favorited ? t('removedFromSaved') : t('saved'), 'success');
  };

  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setLoginPromptAction('actionContactOwner');
      return;
    }
    navigate(`/chat/${property.id}`);
  };

  const formatPrice = (price: number, priceType: string) => {
    if (priceType === 'monthly') {
      return `\u20B9${price.toLocaleString('en-IN')}/mo`;
    }
    if (price >= 10000000) {
      return `\u20B9${(price / 10000000).toFixed(1)} Cr`;
    }
    if (price >= 100000) {
      return `\u20B9${(price / 100000).toFixed(1)} L`;
    }
    return `\u20B9${price.toLocaleString('en-IN')}`;
  };


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

  const formatViews = (views: number) => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return String(views);
  };

  const getPlanBadge = () => {
    if (!property.plan || property.plan === 'free') return null;
    const planConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      boosted: {
        label: t('boostedTag'),
        className: 'bg-sky-500/90 text-white',
        icon: <Zap className="w-3 h-3" />
      },
      premium: {
        label: t('premium'),
        className: 'bg-purple-500/90 text-white',
        icon: <Crown className="w-3 h-3" />
      },
      superPremium: {
        label: t('superPremiumTag'),
        className: 'bg-amber-500/90 text-white',
        icon: <Crown className="w-3 h-3" />
      },
      premiumOwner: {
        label: t('premiumOwner'),
        className: 'bg-emerald-500/90 text-white',
        icon: <Crown className="w-3 h-3" />
      },
    };
    return planConfig[property.plan] || null;
  };

  return (
    <>
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
        onClick={() => navigate(`/property/${property.id}`)}
      >
        {/* Image Section with Photo Carousel */}
        <div className="relative w-full h-48 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentPhotoIndex * 100}%)` }}
            onClick={(e) => e.stopPropagation()}
          >
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`${property.title} ${idx + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
                loading="lazy"
              />
            ))}
          </div>

          {/* Photo counter */}
          {photos.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              {currentPhotoIndex + 1}/{photos.length}
            </div>
          )}

          {/* Left arrow */}
          {photos.length > 1 && currentPhotoIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(prev => prev - 1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-md"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
          )}

          {/* Right arrow */}
          {photos.length > 1 && currentPhotoIndex < photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(prev => prev + 1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-md"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          )}

          {/* Dot indicators */}
          {photos.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentPhotoIndex ? 'bg-white w-3' : 'bg-white/60 w-1.5'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Listing Type Badge */}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
              property.listingType === 'Rent' ? 'bg-blue-600/90 text-white' : 'bg-emerald-500/90 text-white'
            }`}>
              {property.listingType === 'Rent' ? t('rent') : t('sale')}
            </span>
          </div>

          {/* Plan Badge */}
          {(() => {
            const planBadge = getPlanBadge();
            if (!planBadge) return null;
            return (
              <div className="absolute top-2" style={{ left: '68px' }}>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-0.5 ${planBadge.className}`}>
                  {planBadge.icon}
                  {planBadge.label}
                </span>
              </div>
            );
          })()}

          {/* Verified Badge */}
          {property.verified && (
            <div className="absolute top-2 flex items-center gap-1"
              style={{ left: property.listingType === 'Rent' ? '50px' : '50px' }}>
              <span className="px-2 py-1 rounded-lg text-xs font-medium bg-white/90 text-blue-700 flex items-center gap-0.5">
                <BadgeCheck className="w-3.5 h-3.5" />
                {t('verified')}
              </span>
            </div>
          )}

          {/* Premium Badge */}
          {isPremium && (
            <div className="absolute top-2 right-14">
              <span className="px-2 py-1 rounded-lg text-xs font-medium bg-amber-500/90 text-white flex items-center gap-0.5">
                <Crown className="w-3 h-3" />
                {t('premium')}
              </span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-all"
            onClick={handleToggleFavorite}
          >
            <Heart
              className={`w-4 h-4 ${
                favorited ? 'fill-red-500 text-red-500' : 'text-gray-500'
              }`}
            />
          </button>

          {/* Property Type Badge */}
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-1 rounded-lg text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
              {getPropertyTypeLabel(property.propertyType)}
            </span>
          </div>

          {/* Views count */}
          <div className="absolute bottom-2 right-2">
            <span className="px-2 py-1 rounded-lg text-xs font-medium bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(property.views)}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Price */}
          <div className="flex items-center gap-1 mb-1.5">
            <IndianRupee className="w-4 h-4 text-blue-700" />
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(property.price, property.priceType)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1.5">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-500 line-clamp-1">
              {property.locality}, {property.city}
            </span>
          </div>

          {/* Details Row */}
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
            {property.bedrooms && (
              <span>{property.bedrooms} {t('bhk')}</span>
            )}
            {property.bathrooms && <span>{property.bathrooms} {t('bathrooms')}</span>}
            {property.furnished && <span>{property.furnished}</span>}
            {property.builtUpArea && <span>{property.builtUpArea} {t('sqft')}</span>}
          </div>

          {/* Contact Button */}
          <button
            className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            onClick={handleContact}
          >
            <Phone className="w-4 h-4" />
            {t('contact')}
          </button>
        </div>
      </div>

      {loginPromptAction && (
        <GoogleLoginPrompt
          action={loginPromptAction}
          onClose={() => setLoginPromptAction(null)}
        />
      )}
    </>
  );
}
