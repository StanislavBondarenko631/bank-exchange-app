'use client';

import Select, { SingleValue } from 'react-select';
import symbols from './symbols.json';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

import '@/components/SelectRates/SelectRates';
import styles from './SelectRates.module.css';

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
