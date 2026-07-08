import { useNavigate, useLocation } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { MapPin, Bell, ChevronDown, Languages, Check, ArrowLeft } from 'lucide-react';
import type { Lang } from '@/lib/i18n';

const langOptions: { code: Lang; label: string; sublabel: string }[] = [
  { code: 'en', label: 'English', sublabel: 'EN' },
  { code: 'hi', label: 'हिन्दी', sublabel: 'अ' },
  { code: 'hinglish', label: 'Hinglish', sublabel: 'A+अ' },
];

// Routes where navbar should NOT show back button (top-level tab routes)
const homeRoutes = ['/home', '/services', '/add', '/chat', '/profile'];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentCity, setCurrentCity] = useState(() => {
    return localStorage.getItem('thikana-city') || 'Lucknow';
  });

  // Scroll-based hide/show
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const city = localStorage.getItem('thikana-city');
    if (city) setCurrentCity(city);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide on scroll down (past 60px), show on scroll up
      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isHomeScreen = homeRoutes.some(route => location.pathname === route);
  const showBackButton = !isHomeScreen && location.pathname !== '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
        {/* LEFT: Logo or Back Button */}
        {showBackButton ? (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 p-1.5 -ml-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">
              {lang === 'hi' ? 'ठिकाना' : 'THIKANA'}
            </span>
          </button>
        ) : (
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <img src="/logo-thikana.png" alt="THIKANA" className="w-9 h-9 rounded-xl" />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-blue-700 tracking-tight">
                {lang === 'hi' ? 'ठिकाना' : 'THIKANA'}
              </span>
            </div>
          </div>
        )}

        {/* RIGHT: Location pill + Language + Notification Bell */}
        <div className="flex items-center gap-2.5">
          {/* Location Pill */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-blue-50 border border-gray-100 transition-colors"
            onClick={() => navigate('/location')}
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-gray-700 max-w-[80px] truncate">
              {currentCity}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {/* Language Button */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-100 transition-colors"
            >
              <Languages className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-gray-700">
                {lang === 'en' ? 'EN' : lang === 'hi' ? 'अ' : 'A+अ'}
              </span>
            </button>

            {/* Language Dropdown */}
            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {langOptions.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-50 transition-colors ${
                        lang === l.code ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        lang === l.code ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {l.sublabel}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{l.label}</p>
                      </div>
                      {lang === l.code && <Check className="w-4 h-4 text-blue-600 ml-auto" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notification Bell */}
          <button
            className="relative w-9 h-9 rounded-full bg-gray-50 hover:bg-blue-50 border border-gray-100 flex items-center justify-center transition-colors"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="w-[18px] h-[18px] text-gray-600" />
            {/* Notification dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
