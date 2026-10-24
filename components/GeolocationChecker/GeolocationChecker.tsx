// 'use client';

// Первый и второй шаг :

// import { useEffect } from 'react';
// import { getUserInfo } from '@/lib/service/opencagedataApi';

// export default function GeolocationChecker() {
//   useEffect(() => {
//     const options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     };

//     const success = async (position: GeolocationPosition) => {
//       const { latitude, longitude } = position.coords;
//       try {
//         // Передаем объект с широтой и долготой, как требует функция в lib
//         const data = await getUserInfo({ latitude, longitude });

//         // Достаем валюту по условию задания: results[0].annotations.currency.iso_code
//         const currencyCode = data.results[0].annotations.currency.iso_code;

//         console.log('Автоматически определенная валюта:', currencyCode);
//       } catch (error) {
//         console.error('Ошибка при получении валюты:', error);
//       }
//     };

//     const error = (err: GeolocationPositionError) => {
//       console.warn(`Ошибка геолокации (${err.code}): ${err.message}`);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error, options);
//     }
//   }, []);

//   return null;
// }

// Четвертый шаг

'use client';

import { useEffect } from 'react';
import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyStore } from '@/lib/stores/currencyStore'; // Исправили путь импорта

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
