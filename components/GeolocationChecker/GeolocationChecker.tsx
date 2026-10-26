'use client';

import { useEffect } from 'react';
import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const hasHydrated = useCurrencyStore((state) => state.hasHydrated);
  const setBaseCurrency = useCurrencyStore((state) => state.setBaseCurrency);

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      try {
        const data = await getUserInfo({ latitude, longitude });

        // Добавляем проверку на существование данных
        const currencyCode = data?.results?.[0]?.annotations?.currency?.iso_code;

        if (currencyCode) {
          setBaseCurrency(currencyCode);
          console.log('Валюта успешно определена и сохранена:', currencyCode);
        } else {
          setBaseCurrency('USD');
        }
      } catch (error) {
        console.error('Ошибка при получении валюты, ставим USD:', error);
        setBaseCurrency('USD');
      }
    };

    const error = (err: GeolocationPositionError) => {
      console.warn(`Доступ к геопозиции отклонен (${err.code}): ${err.message}. Ставим USD`);
      setBaseCurrency('USD');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      setBaseCurrency('USD');
    }
  }, [hasHydrated, baseCurrency, setBaseCurrency]);

  return null;
}
