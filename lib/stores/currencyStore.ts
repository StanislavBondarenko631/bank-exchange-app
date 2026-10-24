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

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrencyState = {
  baseCurrency: string;
  hasHydrated: boolean;
  setBaseCurrency: (currency: string) => void;
  setHasHydrated: (state: boolean) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '', // Стартуем с пустой строки, чтобы понять, определяли ли мы её раньше
      hasHydrated: false,
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'bank-currency-storage',
      // Сохраняем в localStorage ТОЛЬКО выбранную валюту
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      // Когда Zustand прочитал localStorage, переключаем флаг в true
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
