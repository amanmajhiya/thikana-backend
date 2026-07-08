import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Users, Building2, CheckCircle, XCircle, Clock,
  TrendingUp, Eye, Phone, MapPin, IndianRupee, Search,
  BarChart3, Star,
  Shield, LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
// Note: AdminPanel uses direct English text for admin-only functionality

interface PropertyListing {
  id: string;
  title: string;
  description: string;
  property_type: string;
  listing_type: string;
  price: number;
  city: string;
  locality: string;
  address: string;
  pincode: string;
  area_sqft: number;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  amenities: string;
  photos: string;
  status: string;
  plan_type: string;
  user_id: string;
  view_count: number;
  contact_count: number;
  created_at: string;
  owner_name?: string;
  owner_phone?: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  live: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  blocked: 'bg-gray-100 text-gray-700',
  draft: 'bg-blue-100 text-blue-700',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending Review',
  live: 'Live',
  rejected: 'Rejected',
  blocked: 'Blocked',
  draft: 'Draft',
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const { user, isLoggedIn, isAdmin } = useAuth();

  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [filtered, setFiltered] = useState<PropertyListing[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'listings' | 'users' | 'stats'>('listings');
  const [stats, setStats] = useState({
    total: 0, pending: 0, live: 0, rejected: 0,
    users: 0, totalViews: 0, totalContacts: 0
  });

  // For demo: load from localStorage or use seed data
  useEffect(() => {
    const saved = localStorage.getItem('thikana-admin-listings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setListings(parsed);
      updateStats(parsed);
    } else {
      // Generate sample pending listings for demo
      const sample: PropertyListing[] = [
        {
          id: 'prop_pending_1', title: '2 BHK Flat in Gomti Nagar',
          description: 'Spacious 2 BHK flat available for rent. Fully furnished with modern amenities.',
          property_type: 'flat', listing_type: 'rent', price: 15000,
          city: 'Lucknow', locality: 'Gomti Nagar', address: 'Gomti Nagar, Lucknow, UP',
          pincode: '226010', area_sqft: 950, bedrooms: 2, bathrooms: 2,
          furnishing: 'fully', amenities: '["Water","Electricity","Security","Lift"]',
          photos: '["https://picsum.photos/seed/admin1/400/300"]',
          status: 'pending', plan_type: 'free', user_id: 'user_1',
          view_count: 0, contact_count: 0,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          owner_name: 'Amit Sharma', owner_phone: '9876543210'
        },
        {
          id: 'prop_pending_2', title: 'Shop for Sale in Hazratganj',
          description: 'Prime commercial shop in main market area.',
          property_type: 'shop', listing_type: 'sale', price: 4500000,
          city: 'Lucknow', locality: 'Hazratganj', address: 'Hazratganj, Lucknow, UP',
          pincode: '226001', area_sqft: 400, bedrooms: 0, bathrooms: 1,
          furnishing: 'unfurnished', amenities: '["Water","Electricity"]',
          photos: '["https://picsum.photos/seed/admin2/400/300"]',
          status: 'pending', plan_type: 'booster', user_id: 'user_2',
          view_count: 0, contact_count: 0,
          created_at: new Date(Date.now() - 7200000).toISOString(),
          owner_name: 'Priya Singh', owner_phone: '8765432109'
        },
        {
          id: 'prop_pending_3', title: '3 BHK Villa with Garden',
          description: 'Beautiful independent house with parking and garden.',
          property_type: 'house', listing_type: 'sale', price: 8500000,
          city: 'Kanpur', locality: 'Swaroop Nagar', address: 'Swaroop Nagar, Kanpur, UP',
          pincode: '208002', area_sqft: 1800, bedrooms: 3, bathrooms: 3,
          furnishing: 'semi', amenities: '["Water","Electricity","Security","Parking","Garden"]',
          photos: '["https://picsum.photos/seed/admin3/400/300"]',
          status: 'pending', plan_type: 'premium', user_id: 'user_3',
          view_count: 0, contact_count: 0,
          created_at: new Date(Date.now() - 10800000).toISOString(),
          owner_name: 'Rajesh Gupta', owner_phone: '7654321098'
        },
      ];
      setListings(sample);
      updateStats(sample);
      localStorage.setItem('thikana-admin-listings', JSON.stringify(sample));
    }
  }, []);

  function updateStats(data: PropertyListing[]) {
    setStats({
      total: data.length,
      pending: data.filter(p => p.status === 'pending').length,
      live: data.filter(p => p.status === 'live').length,
      rejected: data.filter(p => p.status === 'rejected').length,
      users: new Set(data.map(p => p.user_id)).size,
      totalViews: data.reduce((sum, p) => sum + p.view_count, 0),
      totalContacts: data.reduce((sum, p) => sum + p.contact_count, 0),
    });
  }

  // Filter listings
  useEffect(() => {
    let result = [...listings];
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.owner_name?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [listings, statusFilter, searchQuery]);

  function approveProperty(id: string) {
    const updated = listings.map(p =>
      p.id === id ? { ...p, status: 'live' } : p
    );
    setListings(updated);
    localStorage.setItem('thikana-admin-listings', JSON.stringify(updated));
    updateStats(updated);
    if (selectedProperty?.id === id) {
      setSelectedProperty({ ...selectedProperty, status: 'live' });
    }
  }

  function rejectProperty(id: string) {
    const updated = listings.map(p =>
      p.id === id ? { ...p, status: 'rejected' } : p
    );
    setListings(updated);
    localStorage.setItem('thikana-admin-listings', JSON.stringify(updated));
    updateStats(updated);
    if (selectedProperty?.id === id) {
      setSelectedProperty({ ...selectedProperty, status: 'rejected' });
    }
  }

  function blockProperty(id: string) {
    const updated = listings.map(p =>
      p.id === id ? { ...p, status: 'blocked' } : p
    );
    setListings(updated);
    localStorage.setItem('thikana-admin-listings', JSON.stringify(updated));
    updateStats(updated);
  }

  const formatPrice = (price: number, type: string) => {
    if (type === 'rent' || type === 'lease') return `Rs ${price.toLocaleString('en-IN')}/mo`;
    return `Rs ${(price / 100000).toFixed(1)}L`;
  };

  // Access Denied: Only admin can view this page
  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex flex-col">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
          <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
              This page is restricted to administrators only. If you are an admin, please login with your admin account.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/onboarding')}
                className="px-6 py-3 rounded-xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #1E429F 100%)' }}
              >
                Login as Admin
              </button>
              <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">THIKANA Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden sm:block">{user?.name || 'Admin'}</span>
            <button
              onClick={() => { localStorage.clear(); window.location.href = '/'; }}
              className="p-2 rounded-lg hover:bg-red-50 text-red-500"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Building2} label="Total Listings" value={stats.total} color="blue" />
          <StatCard icon={Clock} label="Pending" value={stats.pending} color="amber" />
          <StatCard icon={CheckCircle} label="Live" value={stats.live} color="emerald" />
          <StatCard icon={Users} label="Users" value={stats.users} color="purple" />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <MiniStat icon={Eye} label="Total Views" value={stats.totalViews} />
          <MiniStat icon={Phone} label="Contact Clicks" value={stats.totalContacts} />
          <MiniStat icon={TrendingUp} label="Rejection Rate" value={`${stats.total > 0 ? Math.round((stats.rejected / stats.total) * 100) : 0}%`} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-200">
          {[
            { key: 'listings' as const, label: 'Property Listings', icon: Building2 },
            { key: 'stats' as const, label: 'Analytics', icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'listings' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by title, city, owner..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {['all', 'pending', 'live', 'rejected', 'blocked'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      statusFilter === s
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {s === 'all' ? 'All' : statusLabels[s] || s}
                    {s !== 'all' && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px]">
                        {s === 'pending' ? stats.pending : s === 'live' ? stats.live : s === 'rejected' ? stats.rejected : listings.filter(p => p.status === s).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Property</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Owner</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Price</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                          <Building2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                          <p>No listings found</p>
                        </td>
                      </tr>
                    )}
                    {filtered.map(prop => (
                      <tr
                        key={prop.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedProperty(prop)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={JSON.parse(prop.photos || '[]')[0] || 'https://via.placeholder.com/80'}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                              onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80'; }}
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate max-w-[200px]">{prop.title}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPin className="w-3 h-3" />
                                <span>{prop.city}, {prop.locality}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <p className="font-medium text-gray-700">{prop.owner_name || 'Unknown'}</p>
                          <p className="text-xs text-gray-400">{prop.owner_phone || ''}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-900">{formatPrice(prop.price, prop.listing_type)}</p>
                          <p className="text-xs text-gray-400 capitalize">{prop.property_type} | {prop.listing_type}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[prop.status] || 'bg-gray-100'}`}>
                            {statusLabels[prop.status] || prop.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            {prop.status === 'pending' && (
                              <>
                                <button
                                  onClick={e => { e.stopPropagation(); approveProperty(prop.id); }}
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                  title="Approve"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={e => { e.stopPropagation(); rejectProperty(prop.id); }}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {prop.status === 'live' && (
                              <button
                                onClick={e => { e.stopPropagation(); blockProperty(prop.id); }}
                                className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs font-semibold"
                              >
                                Block
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Analytics Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnalyticsCard
                title="Property Status Distribution"
                items={[
                  { label: 'Pending Review', value: stats.pending, color: 'bg-amber-500' },
                  { label: 'Live', value: stats.live, color: 'bg-emerald-500' },
                  { label: 'Rejected', value: stats.rejected, color: 'bg-red-500' },
                ]}
                total={stats.total}
              />
              <AnalyticsCard
                title="Engagement"
                items={[
                  { label: 'Total Views', value: stats.totalViews, color: 'bg-blue-500' },
                  { label: 'Contact Clicks', value: stats.totalContacts, color: 'bg-purple-500' },
                ]}
                total={Math.max(stats.totalViews, 1)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-2xl">
                <h3 className="font-bold text-gray-900">Property Details</h3>
                <button onClick={() => setSelectedProperty(null)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <XCircle className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <img
                  src={JSON.parse(selectedProperty.photos || '[]')[0] || ''}
                  alt=""
                  className="w-full h-48 rounded-xl object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200'; }}
                />

                <div>
                  <h4 className="text-lg font-bold text-gray-900">{selectedProperty.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{selectedProperty.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <DetailItem icon={MapPin} label="City" value={selectedProperty.city} />
                  <DetailItem icon={Building2} label="Locality" value={selectedProperty.locality} />
                  <DetailItem icon={IndianRupee} label="Price" value={formatPrice(selectedProperty.price, selectedProperty.listing_type)} />
                  <DetailItem icon={Star} label="Furnishing" value={selectedProperty.furnishing} />
                  <DetailItem icon={Building2} label="Area" value={`${selectedProperty.area_sqft} sqft`} />
                  <DetailItem icon={Shield} label="Plan" value={selectedProperty.plan_type} />
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Owner Info</p>
                  <p className="font-semibold text-gray-800">{selectedProperty.owner_name || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{selectedProperty.owner_phone || 'N/A'}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {selectedProperty.user_id}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Posted</p>
                  <p className="text-sm text-gray-600">{new Date(selectedProperty.created_at).toLocaleString()}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  {selectedProperty.status === 'pending' && (
                    <>
                      <button
                        onClick={() => { approveProperty(selectedProperty.id); setSelectedProperty(null); }}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" /> Approve
                      </button>
                      <button
                        onClick={() => { rejectProperty(selectedProperty.id); setSelectedProperty(null); }}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" /> Reject
                      </button>
                    </>
                  )}
                  {selectedProperty.status === 'live' && (
                    <button
                      onClick={() => { blockProperty(selectedProperty.id); setSelectedProperty(null); }}
                      className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl"
                    >
                      Block Property
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Sub Components ─── */

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number | string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${colorMap[color] || colorMap.blue}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3">
      <Icon className="w-4 h-4 text-gray-400" />
      <div>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-gray-400 shrink-0" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function AnalyticsCard({ title, items, total }: { title: string; items: { label: string; value: number; color: string }[]; total: number }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold text-gray-900">{item.value}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color} transition-all`}
                style={{ width: `${total > 0 ? Math.min((item.value / total) * 100 * 3, 100) : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
