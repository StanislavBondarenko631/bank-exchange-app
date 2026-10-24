//  До написания кода

// import styles from './Filter.module.css';

// export default function Filter() {
//   return (
//     <input
//       type="text"
//       placeholder="What currency are you looking for?🧐"
//       className={styles.input}
//     />
//   );
// }

// 8 шаг

'use client';

import { useCurrencyStore } from '@/lib/stores/currencyStore';
import styles from './Filter.module.css';

export default function Filter() {
  // Достаем значение фильтра и функцию его изменения из Zustand
  const filter = useCurrencyStore((state) => state.filter);
  const setFilter = useCurrencyStore((state) => state.setFilter);

  return (
    <input
      type="text"
      placeholder="What currency are you looking for? 🤔"
      className={styles.input}
      value={filter}
      onChange={(e) => setFilter(e.target.value)} // Передаем текст в глобальный стейт при вводе
    />
  );
}
