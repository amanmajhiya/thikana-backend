import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { signInWithGoogle } from '@/lib/firebase';
import { authApi } from '@/lib/api';

// ─── Types ─────────────────────────────────────────────
export interface User {
  id: string;
  uid: string;
  name: string;
  email?: string;
  mobile?: string;
  city?: string;
  location?: string;
  photoUrl?: string;
  isGoogleVerified: boolean;
  isAdmin?: boolean;
  isBlocked?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isGoogleVerified: boolean;
  isAdmin: boolean;
  isBlocked: boolean;
  pendingAction: string | null;
  login: (name: string, mobile: string) => Promise<void>;
  googleLogin: () => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  requireGoogleLogin: (action: string) => boolean;
  clearPendingAction: () => void;
}

// ─── Default Context ───────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isGoogleVerified: false,
  isAdmin: false,
  isBlocked: false,
  pendingAction: null,
  login: async () => {},
  googleLogin: async () => false,
  logout: () => {},
  updateUser: () => {},
  requireGoogleLogin: () => false,
  clearPendingAction: () => {},
});

// ─── Helper ────────────────────────────────────────────
function mapBackendUser(data: any): User {
  return {
    id: data.id || data.uid || '',
    uid: data.uid || data.id || '',
    name: data.name || '',
    email: data.email || '',
    mobile: data.mobile || data.phone || '',
    city: data.city || '',
    location: data.location || '',
    photoUrl: data.photoUrl || '',
    isGoogleVerified: !!data.email,
    isAdmin: data.isAdmin || false,
    isBlocked: data.isBlocked || false,
  };
}

// ─── Provider ──────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('thikana-user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem('thikana-user');
      }
    }
  }, []);

  // Phone + Name login (NO OTP) — uses registerOrLogin API
  const login = useCallback(async (name: string, mobile: string) => {
    try {
      const res: any = await authApi.registerOrLogin({ name, phone: mobile });
      const newUser = mapBackendUser(res.user);
      newUser.isGoogleVerified = false;
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('thikana-user', JSON.stringify(newUser));
    } catch (err: any) {
      toast({
        title: 'Login Failed',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // ✅ REAL Google OAuth Login
  const googleLogin = useCallback(async (): Promise<boolean> => {
    try {
      const googleData = await signInWithGoogle();

      if (!googleData.success) {
        toast({
          title: 'Google Login Failed',
          description: googleData.error,
          variant: 'destructive',
        });
        return false;
      }

      const res: any = await authApi.googleLogin({
        googleId: googleData.googleId || '',
        email: googleData.email || '',
        name: googleData.name || '',
        photoUrl: googleData.photoUrl || '',
      });

      const googleUser = mapBackendUser(res.user);
      googleUser.isGoogleVerified = true;
      googleUser.photoUrl = googleData.photoUrl || googleUser.photoUrl;

      // Merge with existing phone-login user data if present
      if (user) {
        googleUser.name = user.name || googleUser.name;
        googleUser.mobile = user.mobile || googleUser.mobile;
        googleUser.city = user.city || googleUser.city;
      }

      setUser(googleUser);
      setIsLoggedIn(true);
      localStorage.setItem('thikana-user', JSON.stringify(googleUser));

      toast({
        title: t('googleLoginSuccess'),
        description: `Welcome, ${googleUser.name}!`,
      });

      return true;
    } catch (err: any) {
      console.error('Google login failed:', err.message || err);
      toast({
        title: 'Login Error',
        description: err.message || 'Something went wrong during Google login.',
        variant: 'destructive',
      });
      return false;
    }
  }, [user, t, toast]);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setPendingAction(null);
    localStorage.removeItem('thikana-user');
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem('thikana-user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const requireGoogleLogin = useCallback((action: string): boolean => {
    if (!isLoggedIn) {
      setPendingAction(action);
      return false;
    }
    if (!user?.isGoogleVerified) {
      setPendingAction(action);
      return false;
    }
    return true;
  }, [isLoggedIn, user]);

  const clearPendingAction = useCallback(() => {
    setPendingAction(null);
  }, []);

  const isGoogleVerified = user?.isGoogleVerified || false;
  const isAdmin = user?.isAdmin || false;
  const isBlocked = user?.isBlocked || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isGoogleVerified,
        isAdmin,
        isBlocked,
        pendingAction,
        login,
        googleLogin,
        logout,
        updateUser,
        requireGoogleLogin,
        clearPendingAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}