// lib\stores\currencyStore.ts

// Третий шаг :

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// // Описываем тип нашего состояния согласно условию задания
// type CurrencyState = {
//   baseCurrency: string;
//   setBaseCurrency: (currency: string) => void;
// };

// export const useCurrencyStore = create<CurrencyState>()(
//   persist(
//     (set) => ({
//       // Начальное значение по умолчанию (если в localStorage еще пусто)
//       baseCurrency: 'UAH',

//       // Функция для изменения валюты в стейте
//       setBaseCurrency: (currency) => set({ baseCurrency: currency }),
//     }),
//     {
//       // Уникальное имя ключа в localStorage для нашего приложения
//       name: 'bank-currency-storage',
//     }
//   )
// );

// 4 шаг

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// type CurrencyState = {
//   baseCurrency: string;
//   hasHydrated: boolean;
//   setBaseCurrency: (currency: string) => void;
//   setHasHydrated: (state: boolean) => void;
// };

// export const useCurrencyStore = create<CurrencyState>()(
//   persist(
//     (set) => ({
//       baseCurrency: '', // Стартуем с пустой строки, чтобы понять, определяли ли мы её раньше
//       hasHydrated: false,
//       setBaseCurrency: (currency) => set({ baseCurrency: currency }),
//       setHasHydrated: (state) => set({ hasHydrated: state }),
//     }),
//     {
//       name: 'bank-currency-storage',
//       // Сохраняем в localStorage ТОЛЬКО выбранную валюту
//       partialize: (state) => ({ baseCurrency: state.baseCurrency }),
//       // Когда Zustand прочитал localStorage, переключаем флаг в true
//       onRehydrateStorage: () => (state) => {
//         state?.setHasHydrated(true);
//       },
//     }
//   )
// );

// 5 шаг

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';

// Описываем тип для результата конвертации
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
  setBaseCurrency: (currency: string) => void;
  setHasHydrated: (state: boolean) => void;
  exchangeCurrencyAction: (credentials: {
    to: string;
    from: string;
    amount: number;
  }) => Promise<void>;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      hasHydrated: false,
      exchangeInfo: null,
      isLoading: false,
      isError: null,

      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setHasHydrated: (state) => set({ hasHydrated: state }),

      // Асинхронный экшен для отправки запроса на бэкенд
      exchangeCurrencyAction: async (credentials) => {
        set({ isLoading: true, isError: null, exchangeInfo: null });
        try {
          const data = await exchangeCurrency(credentials);
          set({ exchangeInfo: data, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
          set({
            isError: errorMessage,
            isLoading: false,
            exchangeInfo: null,
          });
        }
      },
    }),
    {
      name: 'bank-currency-storage',
      // Строго сохраняем ТОЛЬКО выбранную валюту пользователя
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
