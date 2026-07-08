import { Outlet, useLocation } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const HIDE_NAV_PATHS = ['/', '/language', '/onboarding'];

export default function Layout() {
  const location = useLocation();
  const { isBlocked } = useAuth();

  const shouldHideNav = HIDE_NAV_PATHS.includes(location.pathname);
  const isPropertyDetail = location.pathname.startsWith('/property/');
  const isReportPage = location.pathname.startsWith('/report/');
  const showNav = !shouldHideNav && !isBlocked && !isPropertyDetail && !isReportPage;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {showNav && <Navbar />}
      <main className={`flex-1 ${showNav ? 'pt-14 pb-20' : ''}`}>
        <Outlet />
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
