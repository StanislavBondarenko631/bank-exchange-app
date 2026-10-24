'use client';

import { useEffect } from 'react';
import { getUserInfo } from '@/lib/service/opencagedataApi';

export default function GeolocationChecker() {
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      try {
        // Передаем объект с широтой и долготой, как требует функция в lib
        const data = await getUserInfo({ latitude, longitude });

        // Достаем валюту по условию задания: results[0].annotations.currency.iso_code
        const currencyCode = data.results[0].annotations.currency.iso_code;

        console.log('Автоматически определенная валюта:', currencyCode);
      } catch (error) {
        console.error('Ошибка при получении валюты:', error);
      }
    };

    const error = (err: GeolocationPositionError) => {
      console.warn(`Ошибка геолокации (${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, []);

  return null;
}
