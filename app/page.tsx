'use client';

import { useCurrencyStore } from '@/lib/stores/currencyStore';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import Loader from '@/components/Loader/Loader';
import Heading from '@/components/Heading/Heading';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';

export default function Home() {
  const exchangeInfo = useCurrencyStore((state) => state.exchangeInfo);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const isError = useCurrencyStore((state) => state.isError);

  return (
    <Section>
      <Container>
        <Heading title="Currency Converter" info={true} error={false} top={false} bottom={false} />

        <ExchangeForm />

        {isLoading && <Loader />}

        {exchangeInfo && (
          <ExchangeInfo
            amount={exchangeInfo.amount}
            from={exchangeInfo.from}
            to={exchangeInfo.to}
            rate={exchangeInfo.rate}
            result={exchangeInfo.result}
          />
        )}

        {isError && (
          <Heading
            title="Something went wrong...Check the data validity and try again!"
            info={false}
            error={true}
            top={false}
            bottom={false}
          />
        )}
      </Container>
    </Section>
  );
}
