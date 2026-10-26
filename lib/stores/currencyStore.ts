import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { exchangeCurrency, latestRates } from '@/lib/service/exchangeAPI';

interface ExchangeInfo {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
}

type CurrencyState = {
  baseCurrency: string;
  hasHydrated: boolean;
  exchangeInfo: ExchangeInfo | null;
  isLoading: boolean;
  isError: string | null;
  rates: [string, unknown][];
  filter: string;
  setBaseCurrency: (currency: string) => void;
  setHasHydrated: (state: boolean) => void;
  setFilter: (text: string) => void;
  exchangeCurrencyAction: (credentials: {
    to: string;
    from: string;
    amount: number;
  }) => Promise<void>;
  getLatestRatesAction: () => Promise<void>;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      baseCurrency: '',
      hasHydrated: false,
      exchangeInfo: null,
      isLoading: false,
      isError: null,
      rates: [],
      filter: '',

      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setFilter: (text) => set({ filter: text }),

      exchangeCurrencyAction: async (credentials) => {
        set({ isLoading: true, isError: null, exchangeInfo: null });
        try {
          const data = await exchangeCurrency(credentials);
          set({ exchangeInfo: data, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
          set({ isError: errorMessage, isLoading: false, exchangeInfo: null });
        }
      },

      getLatestRatesAction: async () => {
        const { baseCurrency } = get();
        if (!baseCurrency) return;

        set({ isLoading: true, isError: null, rates: [] });
        try {
          const rawRates = await latestRates(baseCurrency);
          set({ rates: rawRates, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
          set({ isError: errorMessage, isLoading: false, rates: [] });
        }
      },
    }),
    {
      name: 'bank-currency-storage',

      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
