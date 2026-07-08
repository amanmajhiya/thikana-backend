export interface City {
  id: string;
  name: string;
  nameHi: string;
  state: string;
  category: 'nearby' | 'metro' | 'tier2';
  popular?: boolean;
}

export const cities: City[] = [
  // Nearby Districts (Lucknow area)
  { id: 'lucknow', name: 'Lucknow', nameHi: 'लखनऊ', state: 'Uttar Pradesh', category: 'nearby', popular: true },
  { id: 'hardoi', name: 'Hardoi', nameHi: 'हरदोई', state: 'Uttar Pradesh', category: 'nearby' },
  { id: 'sitapur', name: 'Sitapur', nameHi: 'सीतापुर', state: 'Uttar Pradesh', category: 'nearby' },
  { id: 'barabanki', name: 'Barabanki', nameHi: 'बाराबंकी', state: 'Uttar Pradesh', category: 'nearby' },
  { id: 'unnao', name: 'Unnao', nameHi: 'उन्नाव', state: 'Uttar Pradesh', category: 'nearby' },
  { id: 'kannauj', name: 'Kannauj', nameHi: 'कन्नौज', state: 'Uttar Pradesh', category: 'nearby' },
  { id: 'farrukhabad', name: 'Farrukhabad', nameHi: 'फर्रुखाबाद', state: 'Uttar Pradesh', category: 'nearby' },
  { id: 'shahjahanpur', name: 'Shahjahanpur', nameHi: 'शाहजहाँपुर', state: 'Uttar Pradesh', category: 'nearby' },
  { id: 'lakhimpur', name: 'Lakhimpur Kheri', nameHi: 'लखीमपुर खीरी', state: 'Uttar Pradesh', category: 'nearby' },
  { id: 'kanpur', name: 'Kanpur', nameHi: 'कानपुर', state: 'Uttar Pradesh', category: 'nearby', popular: true },
  // UP Cities
  { id: 'varanasi', name: 'Varanasi', nameHi: 'वाराणसी', state: 'Uttar Pradesh', category: 'tier2', popular: true },
  { id: 'prayagraj', name: 'Prayagraj', nameHi: 'प्रयागराज', state: 'Uttar Pradesh', category: 'tier2', popular: true },
  { id: 'agra', name: 'Agra', nameHi: 'आगरा', state: 'Uttar Pradesh', category: 'tier2', popular: true },
  { id: 'meerut', name: 'Meerut', nameHi: 'मेरठ', state: 'Uttar Pradesh', category: 'tier2' },
  { id: 'gorakhpur', name: 'Gorakhpur', nameHi: 'गोरखपुर', state: 'Uttar Pradesh', category: 'tier2' },
  { id: 'noida', name: 'Noida', nameHi: 'नोएडा', state: 'Uttar Pradesh', category: 'tier2', popular: true },
  { id: 'bareilly', name: 'Bareilly', nameHi: 'बरेली', state: 'Uttar Pradesh', category: 'tier2' },
  { id: 'jhansi', name: 'Jhansi', nameHi: 'झाँसी', state: 'Uttar Pradesh', category: 'tier2' },
  { id: 'mathura', name: 'Mathura', nameHi: 'मथुरा', state: 'Uttar Pradesh', category: 'tier2' },
  { id: 'ghaziabad', name: 'Ghaziabad', nameHi: 'गाज़ियाबाद', state: 'Uttar Pradesh', category: 'tier2' },
  { id: 'aligarh', name: 'Aligarh', nameHi: 'अलीगढ़', state: 'Uttar Pradesh', category: 'tier2' },
  { id: 'saharanpur', name: 'Saharanpur', nameHi: 'सहारनपुर', state: 'Uttar Pradesh', category: 'tier2' },
  // Metro Cities
  { id: 'delhi', name: 'Delhi', nameHi: 'दिल्ली', state: 'Delhi', category: 'metro', popular: true },
  { id: 'mumbai', name: 'Mumbai', nameHi: 'मुंबई', state: 'Maharashtra', category: 'metro', popular: true },
  { id: 'bangalore', name: 'Bangalore', nameHi: 'बैंगलोर', state: 'Karnataka', category: 'metro', popular: true },
  { id: 'hyderabad', name: 'Hyderabad', nameHi: 'हैदराबाद', state: 'Telangana', category: 'metro', popular: true },
  { id: 'chennai', name: 'Chennai', nameHi: 'चेन्नई', state: 'Tamil Nadu', category: 'metro', popular: true },
  { id: 'kolkata', name: 'Kolkata', nameHi: 'कोलकाता', state: 'West Bengal', category: 'metro', popular: true },
  { id: 'pune', name: 'Pune', nameHi: 'पुणे', state: 'Maharashtra', category: 'metro', popular: true },
  { id: 'jaipur', name: 'Jaipur', nameHi: 'जयपुर', state: 'Rajasthan', category: 'metro', popular: true },
  { id: 'ahmedabad', name: 'Ahmedabad', nameHi: 'अहमदाबाद', state: 'Gujarat', category: 'metro' },
  { id: 'surat', name: 'Surat', nameHi: 'सूरत', state: 'Gujarat', category: 'metro' },
];

export const getNearbyDistricts = () => cities.filter(c => c.category === 'nearby');
export const getMetroCities = () => cities.filter(c => c.category === 'metro');
export const getPopularCities = () => cities.filter(c => c.popular);
export const searchCities = (query: string) => {
  const q = query.toLowerCase();
  return cities.filter(c => c.name.toLowerCase().includes(q) || c.nameHi.includes(q));
};

const STORAGE_KEY_LOCATION = 'thikana-location';
const STORAGE_KEY_RECENT = 'thikana-recent-locations';

export const saveLocation = (city: City) => {
  localStorage.setItem(STORAGE_KEY_LOCATION, JSON.stringify(city));
  addRecentLocation(city);
};

export const getSavedLocation = (): City | null => {
  const saved = localStorage.getItem(STORAGE_KEY_LOCATION);
  return saved ? JSON.parse(saved) : null;
};

export const getRecentLocations = (): City[] => {
  const saved = localStorage.getItem(STORAGE_KEY_RECENT);
  return saved ? JSON.parse(saved) : [];
};

export const addRecentLocation = (city: City) => {
  const recent = getRecentLocations();
  const filtered = recent.filter(r => r.id !== city.id);
  const updated = [city, ...filtered].slice(0, 5);
  localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(updated));
};
