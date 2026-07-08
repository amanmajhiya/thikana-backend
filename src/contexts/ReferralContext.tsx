// Referral context - manages referral/affiliate system state
// Firebase-ready: replace localStorage with Firestore on integration
import React, { createContext, useContext, useState, useCallback } from 'react';

export type ReferralStatus = 'pending' | 'approved' | 'rejected';

export interface Referral {
  id: string;
  referredName: string;
  referredPhone: string;
  status: ReferralStatus;
  propertyAdded: boolean;
  date: string;
  amount: number;
}

export interface ReferralState {
  referralCode: string;
  balance: number;
  withdrawable: number;
  upiId: string;
  referrals: Referral[];
}

type ReferralContextType = {
  referralCode: string;
  balance: number;
  withdrawable: number;
  upiId: string;
  referrals: Referral[];
  generateReferralCode: () => string;
  addReferral: (referredPhone: string, referredName?: string) => void;
  approveReferral: (id: string) => void;
  rejectReferral: (id: string) => void;
  setUpiId: (upi: string) => void;
  canWithdraw: () => boolean;
  copyReferralCode: () => Promise<boolean>;
  getShareText: () => string;
};

const REFERRAL_STORAGE_KEY = 'thikana-referral';
const REFERRAL_CODE_KEY = 'thikana-referral-code';
const UPI_ID_KEY = 'thikana-upi-id';

// Mock data for demo
const mockReferrals: Referral[] = [
  { id: '1', referredName: 'Rahul Kumar', referredPhone: '9876543210', status: 'approved', propertyAdded: true, date: '2026-07-01', amount: 20 },
  { id: '2', referredName: 'Priya Singh', referredPhone: '8765432109', status: 'pending', propertyAdded: true, date: '2026-07-03', amount: 0 },
  { id: '3', referredName: 'Amit Verma', referredPhone: '7654321098', status: 'rejected', propertyAdded: false, date: '2026-07-04', amount: 0 },
];

function loadReferralState(): ReferralState {
  try {
    const saved = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch { /* ignore */ }

  // Initialize with mock data
  const code = loadReferralCode();
  const upi = localStorage.getItem(UPI_ID_KEY) || '';
  const totalEarned = mockReferrals.reduce((sum, r) => sum + r.amount, 0);
  const withdrawable = mockReferrals
    .filter(r => r.status === 'approved')
    .reduce((sum, r) => sum + r.amount, 0);

  return {
    referralCode: code,
    balance: totalEarned,
    withdrawable,
    upiId: upi,
    referrals: mockReferrals,
  };
}

function loadReferralCode(): string {
  const saved = localStorage.getItem(REFERRAL_CODE_KEY);
  if (saved) return saved;
  const code = 'THIKANA' + Math.floor(1000 + Math.random() * 9000);
  localStorage.setItem(REFERRAL_CODE_KEY, code);
  return code;
}

function saveReferralState(state: ReferralState) {
  localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(state));
}

const ReferralContext = createContext<ReferralContextType>({
  referralCode: '',
  balance: 0,
  withdrawable: 0,
  upiId: '',
  referrals: [],
  generateReferralCode: () => '',
  addReferral: () => {},
  approveReferral: () => {},
  rejectReferral: () => {},
  setUpiId: () => {},
  canWithdraw: () => false,
  copyReferralCode: async () => false,
  getShareText: () => '',
});

export function ReferralProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ReferralState>(loadReferralState);

  const generateReferralCode = useCallback((): string => {
    const code = 'THIKANA' + Math.floor(1000 + Math.random() * 9000);
    setState(prev => {
      const updated = { ...prev, referralCode: code };
      localStorage.setItem(REFERRAL_CODE_KEY, code);
      saveReferralState(updated);
      return updated;
    });
    return code;
  }, []);

  const addReferral = useCallback((referredPhone: string, referredName?: string) => {
    const newReferral: Referral = {
      id: 'ref_' + Date.now(),
      referredName: referredName || 'Unknown',
      referredPhone,
      status: 'pending',
      propertyAdded: false,
      date: new Date().toISOString().split('T')[0],
      amount: 0,
    };
    setState(prev => {
      const updated = {
        ...prev,
        referrals: [newReferral, ...prev.referrals],
      };
      saveReferralState(updated);
      // TODO: Firebase - save new referral to Firestore
      return updated;
    });
  }, []);

  const approveReferral = useCallback((id: string) => {
    setState(prev => {
      const updatedReferrals = prev.referrals.map(r =>
        r.id === id ? { ...r, status: 'approved' as ReferralStatus, amount: 20 } : r
      );
      const newBalance = updatedReferrals.reduce((sum, r) => sum + r.amount, 0);
      const newWithdrawable = updatedReferrals
        .filter(r => r.status === 'approved')
        .reduce((sum, r) => sum + r.amount, 0);
      const updated = {
        ...prev,
        referrals: updatedReferrals,
        balance: newBalance,
        withdrawable: newWithdrawable,
      };
      saveReferralState(updated);
      // TODO: Firebase - update referral status in Firestore
      // TODO: Firebase - update user balance in Firestore
      return updated;
    });
  }, []);

  const rejectReferral = useCallback((id: string) => {
    setState(prev => {
      const updatedReferrals = prev.referrals.map(r =>
        r.id === id ? { ...r, status: 'rejected' as ReferralStatus, amount: 0 } : r
      );
      const newBalance = updatedReferrals.reduce((sum, r) => sum + r.amount, 0);
      const newWithdrawable = updatedReferrals
        .filter(r => r.status === 'approved')
        .reduce((sum, r) => sum + r.amount, 0);
      const updated = {
        ...prev,
        referrals: updatedReferrals,
        balance: newBalance,
        withdrawable: newWithdrawable,
      };
      saveReferralState(updated);
      // TODO: Firebase - update referral status in Firestore
      return updated;
    });
  }, []);

  const setUpiId = useCallback((upi: string) => {
    setState(prev => {
      const updated = { ...prev, upiId: upi };
      localStorage.setItem(UPI_ID_KEY, upi);
      saveReferralState(updated);
      // TODO: Firebase - save UPI ID to user profile in Firestore
      return updated;
    });
  }, []);

  const canWithdraw = useCallback((): boolean => {
    return state.withdrawable >= 100;
  }, [state.withdrawable]);

  const copyReferralCode = useCallback(async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(state.referralCode);
      return true;
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = state.referralCode;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        return true;
      } catch {
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [state.referralCode]);

  const getShareText = useCallback((): string => {
    return `Join THIKANA - Property app! Use my code ${state.referralCode} and list your property. Download: https://thikana.app/download`;
  }, [state.referralCode]);

  return (
    <ReferralContext.Provider
      value={{
        referralCode: state.referralCode,
        balance: state.balance,
        withdrawable: state.withdrawable,
        upiId: state.upiId,
        referrals: state.referrals,
        generateReferralCode,
        addReferral,
        approveReferral,
        rejectReferral,
        setUpiId,
        canWithdraw,
        copyReferralCode,
        getShareText,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
}

export const useReferral = () => useContext(ReferralContext);
