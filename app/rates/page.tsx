'use client';

import { useEffect } from 'react';
import { Wave } from 'react-animated-text';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import RatesList from '@/components/RatesList/RatesList';
import Loader from '@/components/Loader/Loader';
import Heading from '@/components/Heading/Heading';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Filter from '@/components/Filter/Filter';

import css from './RatesPage.module.css';

export default function RatesPage() {
  const rates = useCurrencyStore((state) => state.rates);
  const filter = useCurrencyStore((state) => state.filter);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const isError = useCurrencyStore((state) => state.isError);
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const getLatestRatesAction = useCurrencyStore((state) => state.getLatestRatesAction);

  useEffect(() => {
    getLatestRatesAction();
  }, [baseCurrency, getLatestRatesAction]);

  const filteredRates = rates
    .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter.toLowerCase()))
    .map(([key, value]) => ({
      key,
      value: (1 / (value as number)).toFixed(2),
    }));

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info={true}
            error={false}
            top={false}
            bottom={true}
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency || 'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          {rates.length > 0 && !isLoading && <Filter />}

          {isLoading && <Loader />}

          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}

          {rates.length > 0 && filteredRates.length === 0 && !isLoading && (
            <Heading
              info={true}
              error={false}
              top={false}
              bottom={false}
              title="No currencies match your filter 🔍"
            />
          )}

          {isError && (
            <Heading
              info={false}
              error={true}
              top={false}
              bottom={false}
              title="Something went wrong...😐 We cannot show current rates!"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
