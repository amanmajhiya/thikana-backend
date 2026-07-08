import { Routes, Route } from 'react-router';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { ReferralProvider } from '@/contexts/ReferralContext';
import { UIProvider, useUI } from '@/contexts/UIContext';
import Layout from '@/components/Layout';
import Splash from '@/pages/Splash';
import LanguageSelect from '@/pages/LanguageSelect';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import PropertyDetail from '@/pages/PropertyDetail';
import AddProperty from '@/pages/AddProperty';
import MyListings from '@/pages/MyListings';
import Saved from '@/pages/Saved';
import Chat from '@/pages/Chat';
import ChatDetail from '@/pages/ChatDetail';
import Profile from '@/pages/Profile';
import Referral from '@/pages/Referral';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import PaymentTermsPage from '@/pages/PaymentTermsPage';
import AboutPage from '@/pages/AboutPage';
import Admin from '@/pages/Admin';
import AdminPanel from '@/pages/AdminPanel';
import Report from '@/pages/Report';
import Legal from '@/pages/Legal';
import LocationSelect from '@/pages/LocationSelect';
import Plans from '@/pages/Plans';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Notifications from '@/pages/Notifications';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

function Snackbar() {
  const { snackbar, hideSnackbar } = useUI();

  if (!snackbar.visible) return null;

  const iconMap = {
    success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    error: <AlertCircle className="w-4 h-4 text-red-500" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-500" />,
    info: <Info className="w-4 h-4 text-blue-500" />,
  };

  const bgMap = {
    success: 'bg-emerald-50 border-emerald-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[200] flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg ${bgMap[snackbar.type]}`}
      >
        {iconMap[snackbar.type]}
        <span className="text-sm font-medium text-gray-800">{snackbar.message}</span>
        <button onClick={hideSnackbar} className="ml-2">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route element={<Layout />}>
          <Route path="/language" element={<LanguageSelect />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/location" element={<LocationSelect />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/add" element={<AddProperty />} />
          <Route path="/listings" element={<MyListings />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<ChatDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/legal/:page" element={<Legal />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/payment-terms" element={<PaymentTermsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
      <Snackbar />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <PropertyProvider>
          <ReferralProvider>
            <UIProvider>
              <AppRoutes />
            </UIProvider>
          </ReferralProvider>
        </PropertyProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
