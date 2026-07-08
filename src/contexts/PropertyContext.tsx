// Property data management - uses local storage with seed data
import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  type Property,
  type PropertyType,
  type ListingType,
  properties,
} from '@/lib/propertyData';

interface Filters {
  city?: string;
  propertyType?: PropertyType;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
}

interface Report {
  propertyId: string;
  reason: string;
  description?: string;
  reportedAt: string;
}

type PropertyContextType = {
  properties: Property[];
  favorites: string[];
  getProperties: (filters?: Filters) => Property[];
  getPropertyById: (id: string) => Property | undefined;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'reportedCount' | 'views'>) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => Property | null;
  deleteProperty: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorited: (id: string) => boolean;
  getMyListings: (status?: string) => Property[];
  reportProperty: (id: string, reason: string, description?: string) => void;
};

const PropertyContext = createContext<PropertyContextType>({
  properties: [],
  favorites: [],
  getProperties: () => [],
  getPropertyById: () => undefined,
  addProperty: () => ({} as Property),
  updateProperty: () => null,
  deleteProperty: () => {},
  toggleFavorite: () => {},
  isFavorited: () => false,
  getMyListings: () => [],
  reportProperty: () => {},
});

const STORAGE_KEY_FAVORITES = 'thikana-favorites';
const STORAGE_KEY_USER_PROPERTIES = 'thikana-user-properties';
const STORAGE_KEY_REPORTS = 'thikana-reports';

function loadFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITES) || '[]');
  } catch {
    return [];
  }
}

function loadUserProperties(): Property[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USER_PROPERTIES) || '[]');
  } catch {
    return [];
  }
}

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);
  const [userProperties, setUserProperties] = useState<Property[]>(loadUserProperties);

  const allProperties = React.useMemo(() => {
    const combined = [...properties, ...userProperties];
    const seen = new Set<string>();
    return combined.filter(p => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [userProperties]);

  const getProperties = useCallback(
    (filters?: Filters) => {
      return allProperties.filter((p) => {
        if (p.status !== 'live') return false;
        if (filters?.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
        if (filters?.propertyType && p.propertyType !== filters.propertyType) return false;
        if (filters?.listingType && p.listingType !== filters.listingType) return false;
        if (filters?.minPrice !== undefined && p.price < filters.minPrice) return false;
        if (filters?.maxPrice !== undefined && p.price > filters.maxPrice) return false;
        return true;
      });
    },
    [allProperties]
  );

  const getPropertyById = useCallback(
    (id: string) => allProperties.find((p) => p.id === id),
    [allProperties]
  );

  const addProperty = useCallback(
    (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'reportedCount' | 'views'>): Property => {
      const newProperty: Property = {
        ...property,
        id: 'user_prop_' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reportedCount: 0,
        views: 0,
      };
      setUserProperties((prev) => {
        const updated = [...prev, newProperty];
        localStorage.setItem(STORAGE_KEY_USER_PROPERTIES, JSON.stringify(updated));
        return updated;
      });
      return newProperty;
    },
    []
  );

  const updateProperty = useCallback(
    (id: string, updates: Partial<Property>): Property | null => {
      let updatedProperty: Property | null = null;
      setUserProperties((prev) => {
        const updated = prev.map((p) => {
          if (p.id === id) {
            updatedProperty = { ...p, ...updates, updatedAt: new Date().toISOString() };
            return updatedProperty;
          }
          return p;
        });
        localStorage.setItem(STORAGE_KEY_USER_PROPERTIES, JSON.stringify(updated));
        return updated;
      });
      return updatedProperty;
    },
    []
  );

  const deleteProperty = useCallback((id: string) => {
    setUserProperties((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEY_USER_PROPERTIES, JSON.stringify(updated));
      return updated;
    });
    setFavorites((prev) => {
      const updated = prev.filter((fid) => fid !== id);
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorited = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const getMyListings = useCallback(
    (status?: string) => {
      return userProperties.filter((p) => (status ? p.status === status : true));
    },
    [userProperties]
  );

  const reportProperty = useCallback((id: string, reason: string, description?: string) => {
    const reports: Report[] = JSON.parse(localStorage.getItem(STORAGE_KEY_REPORTS) || '[]');
    reports.push({ propertyId: id, reason, description, reportedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties: allProperties,
        favorites,
        getProperties,
        getPropertyById,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleFavorite,
        isFavorited,
        getMyListings,
        reportProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export const useProperty = () => useContext(PropertyContext);
