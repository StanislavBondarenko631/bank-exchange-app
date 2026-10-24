// До внесения изменений

// 'use client';

// import { Wave } from 'react-animated-text';

// import Container from '@/components/Container/Container';
// import Section from '@/components/Section/Section';
// import Heading from '@/components/Heading/Heading';

// import css from './RatesPage.module.css';

// export default function RatesPage() {
//   const isError = false;

//   return (
//     <main className={css.main}>
//       <Section>
//         <Container>
//           <Heading
//             info
//             bottom
//             title={
//               <Wave
//                 text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
//                 effect="fadeOut"
//                 effectChange={4.0}
//               />
//             }
//           />

//           {isError && (
//             <Heading error title="Something went wrong...😐 We cannot show current rates!" />
//           )}
//         </Container>
//       </Section>
//     </main>
//   );
// }

// 6 шаг

'use client';

import { useEffect } from 'react';
import { Wave } from 'react-animated-text';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import RatesList from '@/components/RatesList/RatesList';
import Loader from '@/components/Loader/Loader';
import Heading from '@/components/Heading/Heading';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';

import css from './RatesPage.module.css';

export default function RatesPage() {
  // Забираем данные и экшены из Zustand-стора
  const rates = useCurrencyStore((state) => state.rates);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const isError = useCurrencyStore((state) => state.isError);
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const getLatestRatesAction = useCurrencyStore((state) => state.getLatestRatesAction);

  // Перезапрашиваем курсы при изменении базовой валюты
  useEffect(() => {
    getLatestRatesAction();
  }, [baseCurrency, getLatestRatesAction]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          {/* Сохраняем анимацию Wave внутри заголовка и передаем все пропсы явно */}
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

          {/* Во время загрузки показываем лоадер */}
          {isLoading && <Loader />}

          {/* После успешной загрузки рендерим список курсов */}
          {rates.length > 0 && <RatesList rates={rates} />}

          {/* Если произошла ошибка бэкенда */}
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
