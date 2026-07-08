import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

type SnackbarType = 'success' | 'error' | 'info' | 'warning';

interface SnackbarState {
  message: string;
  type: SnackbarType;
  visible: boolean;
}

type UIContextType = {
  snackbar: SnackbarState;
  showSnackbar: (message: string, type?: SnackbarType) => void;
  hideSnackbar: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const UIContext = createContext<UIContextType>({
  snackbar: { message: '', type: 'info', visible: false },
  showSnackbar: () => {},
  hideSnackbar: () => {},
  isLoading: false,
  setLoading: () => {},
});

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    type: 'info',
    visible: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showSnackbar = useCallback(
    (message: string, type: SnackbarType = 'info') => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setSnackbar({ message, type, visible: true });
      timerRef.current = setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, visible: false }));
      }, 3000);
    },
    []
  );

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <UIContext.Provider value={{ snackbar, showSnackbar, hideSnackbar, isLoading, setLoading }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
