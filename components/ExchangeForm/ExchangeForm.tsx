'use client';

import { FormEvent } from 'react';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import styles from './ExchangeForm.module.css';

export default function ExchangeForm() {
  const exchangeCurrencyAction = useCurrencyStore((state) => state.exchangeCurrencyAction);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const currencyValue = formData.get('currency') as string;

    const regex = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

    if (!regex.test(currencyValue)) {
      console.warn('Неверный формат строки');
      return;
    }

    const parts = currencyValue.split(' ');
    const amount = parseFloat(parts[0]);
    const from = parts[1].toUpperCase();
    const to = parts[3].toUpperCase();

    await exchangeCurrencyAction({ to, from, amount });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
