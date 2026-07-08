import { useCallback } from 'react';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const toast = useCallback((options: ToastOptions) => {
    console.log(`[${options.variant?.toUpperCase() || 'INFO'}] ${options.title}: ${options.description || ''}`);
    // Future: yahan real toast UI laga sakte hain
  }, []);

  return { toast };
}