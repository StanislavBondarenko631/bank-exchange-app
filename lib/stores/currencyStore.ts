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

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { exchangeCurrency } from '@/lib/service/exchangeAPI';

// // Описываем тип для результата конвертации
// interface ExchangeInfo {
//   to: string;
//   from: string;
//   amount: number;
//   rate: number;
//   result: number;
// }

// type CurrencyState = {
//   baseCurrency: string;
//   hasHydrated: boolean;
//   exchangeInfo: ExchangeInfo | null;
//   isLoading: boolean;
//   isError: string | null;
//   setBaseCurrency: (currency: string) => void;
//   setHasHydrated: (state: boolean) => void;
//   exchangeCurrencyAction: (credentials: {
//     to: string;
//     from: string;
//     amount: number;
//   }) => Promise<void>;
// };

// export const useCurrencyStore = create<CurrencyState>()(
//   persist(
//     (set) => ({
//       baseCurrency: '',
//       hasHydrated: false,
//       exchangeInfo: null,
//       isLoading: false,
//       isError: null,

//       setBaseCurrency: (currency) => set({ baseCurrency: currency }),
//       setHasHydrated: (state) => set({ hasHydrated: state }),

//       // Асинхронный экшен для отправки запроса на бэкенд
//       exchangeCurrencyAction: async (credentials) => {
//         set({ isLoading: true, isError: null, exchangeInfo: null });
//         try {
//           const data = await exchangeCurrency(credentials);
//           set({ exchangeInfo: data, isLoading: false });
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
//           set({
//             isError: errorMessage,
//             isLoading: false,
//             exchangeInfo: null,
//           });
//         }
//       },
//     }),
//     {
//       name: 'bank-currency-storage',
//       // Строго сохраняем ТОЛЬКО выбранную валюту пользователя
//       partialize: (state) => ({ baseCurrency: state.baseCurrency }),
//       onRehydrateStorage: () => (state) => {
//         state?.setHasHydrated(true);
//       },
//     }
//   )
// );

// 6 шаг

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { exchangeCurrency, latestRates } from '@/lib/service/exchangeAPI';

// interface ExchangeInfo {
//   to: string;
//   from: string;
//   amount: number;
//   rate: number;
//   result: number;
// }

// // Описываем структуру объекта для списка курсов
// interface RateItem {
//   key: string;
//   value: string;
// }

// type CurrencyState = {
//   baseCurrency: string;
//   hasHydrated: boolean;
//   exchangeInfo: ExchangeInfo | null;
//   isLoading: boolean;
//   isError: string | null;
//   rates: RateItem[]; // Добавили поле по ТЗ
//   setBaseCurrency: (currency: string) => void;
//   setHasHydrated: (state: boolean) => void;
//   exchangeCurrencyAction: (credentials: {
//     to: string;
//     from: string;
//     amount: number;
//   }) => Promise<void>;
//   getLatestRatesAction: () => Promise<void>; // Добавили новый экшен
// };

// export const useCurrencyStore = create<CurrencyState>()(
//   persist(
//     (set, get) => ({
//       baseCurrency: '',
//       hasHydrated: false,
//       exchangeInfo: null,
//       isLoading: false,
//       isError: null,
//       rates: [], // Начальное значение по умолчанию

//       setBaseCurrency: (currency) => set({ baseCurrency: currency }),
//       setHasHydrated: (state) => set({ hasHydrated: state }),

//       exchangeCurrencyAction: async (credentials) => {
//         set({ isLoading: true, isError: null, exchangeInfo: null });
//         try {
//           const data = await exchangeCurrency(credentials);
//           set({ exchangeInfo: data, isLoading: false });
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
//           set({ isError: errorMessage, isLoading: false, exchangeInfo: null });
//         }
//       },

//       // Новый асинхронный экшен для получения курсов валют
//       getLatestRatesAction: async () => {
//         const { baseCurrency } = get();
//         if (!baseCurrency) return; // Если базовая валюта еще не определена — выходим

//         set({ isLoading: true, isError: null, rates: [] });
//         try {
//           const rawRates = await latestRates(baseCurrency);

//           // Применяем фильтрацию и трансформацию строго по формуле из задания
//           const filteredRates = rawRates
//             .filter(([key]) => key !== baseCurrency)
//             .map(([key, value]) => ({
//               key,
//               value: (1 / (value as number)).toFixed(2),
//             }));

//           set({ rates: filteredRates, isLoading: false });
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
//           set({ isError: errorMessage, isLoading: false, rates: [] });
//         }
//       },
//     }),
//     {
//       name: 'bank-currency-storage',
//       partialize: (state) => ({ baseCurrency: state.baseCurrency }),
//       onRehydrateStorage: () => (state) => {
//         state?.setHasHydrated(true);
//       },
//     }
//   )
// );

// 8 шаг

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
  rates: [string, unknown][]; // Храним пары [валюта, значение] для формулы из задания
  filter: string; // Новое поле для фильтра
  setBaseCurrency: (currency: string) => void;
  setHasHydrated: (state: boolean) => void;
  setFilter: (text: string) => void; // Новый экшен изменения фильтра
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
      filter: '', // По умолчанию фильтр пустой

      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setFilter: (text) => set({ filter: text }), // Обновляем текст фильтра

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
          set({ rates: rawRates, isLoading: false }); // Сохраняем массив для фильтрации на странице
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
          set({ isError: errorMessage, isLoading: false, rates: [] });
        }
      },
    }),
    {
      name: 'bank-currency-storage',
      // В localStorage сохраняем СТРОГО только baseCurrency. Фильтр туда не идет!
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
