// До внесения изменений

// import Select, { SingleValue } from 'react-select';

// import symbols from './symbols.json';

// import './ReactSelect.css';
// import styles from './SelectRates.module.css';

// export default function SelectRates({ baseCurrency }) {
//   const handleChange = (selectedOption: SingleValue<OptionType>) => {};

//   return (
//     <div className={styles.box}>
//       <p className={styles.text}>Your base currency:&nbsp;</p>
//       <Select className={styles.select} classNamePrefix="react-select" isSearchable />
//     </div>
//   );
// }

// 7 шаг

'use client';

import Select, { SingleValue } from 'react-select';
import symbols from './symbols.json';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

import '@/components/SelectRates/SelectRates'; // Исправили регистр имени файла
import styles from './SelectRates.module.css';

// Описываем тип для опций селекта
interface CurrencyOption {
  value: string;
  label: string;
}

interface SelectRatesProps {
  baseCurrency: string;
}

export default function SelectRates({ baseCurrency }: SelectRatesProps) {
  const setBaseCurrency = useCurrencyStore((state) => state.setBaseCurrency);

  const handleChange = (selectedOption: SingleValue<CurrencyOption>) => {
    if (selectedOption) {
      setBaseCurrency(selectedOption.value);
    }
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        options={symbols}
        isSearchable
        onChange={handleChange}
      />
    </div>
  );
}
