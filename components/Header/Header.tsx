// Так выглядело изначально

// 'use client';

// import Link from 'next/link';
// import { MdCurrencyExchange } from 'react-icons/md';
// import { usePathname } from 'next/navigation';

// import styles from './Header.module.css';

// export default function Header() {
//   const pathname = usePathname();

//   return (
//     <header className={styles.header}>
//       <div className={styles.wrapper}>
//         <MdCurrencyExchange className={styles.logo} />
//         <nav>
//           <ul className={styles.nav}>
//             <li>
//               <Link href="/" className={pathname === '/' ? styles.active : styles.link}>
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/rates" className={pathname === '/rates' ? styles.active : styles.link}>
//                 Rates
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* ✔ Add base currency here !!! */}
//     </header>
//   );
// }

// 4 шаг вот так выглядит теперь код

// 'use client';

// import Link from 'next/link';
// import { MdCurrencyExchange } from 'react-icons/md';
// import { usePathname } from 'next/navigation';
// import { useCurrencyStore } from '@/lib/stores/currencyStore'; // Добавили импорт хранилища

// import styles from './Header.module.css';

// export default function Header() {
//   const pathname = usePathname();
//   // Достаем базовую валюту из глобального стейта
//   const baseCurrency = useCurrencyStore((state) => state.baseCurrency);

//   return (
//     <header className={styles.header}>
//       <div className={styles.wrapper}>
//         <MdCurrencyExchange className={styles.logo} />
//         <nav>
//           <ul className={styles.nav}>
//             <li>
//               <Link href="/" className={pathname === '/' ? styles.active : styles.link}>
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/rates" className={pathname === '/rates' ? styles.active : styles.link}>
//                 Rates
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Добавляем вывод валюты строго по условию задания */}
//       {baseCurrency && <p>Your base currency: {baseCurrency}</p>}
//     </header>
//   );
// }

// 7 шаг

'use client';

import Link from 'next/link';
import { MdCurrencyExchange } from 'react-icons/md'; // Возвращаем твой оригинальный импорт
import { usePathname } from 'next/navigation';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import SelectRates from '../SelectRates/SelectRates';

import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <MdCurrencyExchange className={styles.logo} />
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link href="/" className={pathname === '/' ? styles.active : styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/rates" className={pathname === '/rates' ? styles.active : styles.link}>
                Rates
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Выпадающий список выбора базовой валюты */}
      {baseCurrency && <SelectRates baseCurrency={baseCurrency} />}
    </header>
  );
}
