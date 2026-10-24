// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Описываем тип нашего состояния согласно условию задания
type CurrencyState = {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      // Начальное значение по умолчанию (если в localStorage еще пусто)
      baseCurrency: 'UAH',

      // Функция для изменения валюты в стейте
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
    }),
    {
      // Уникальное имя ключа в localStorage для нашего приложения
      name: 'bank-currency-storage',
    }
  )
);
