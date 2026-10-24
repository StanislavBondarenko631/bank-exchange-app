// до внесения изменений

// 'use client';

// import Section from '@/components/Section/Section';
// import Container from '@/components/Container/Container';
// import Heading from '@/components/Heading/Heading';

// import css from './page.module.css';

// export default function Home() {
//   const isError = false;

//   return (
//     <main className={css.main}>
//       <Section>
//         <Container>
//           <Heading info title="What currencies do you want to exchange?🙂" />

//           {isError && (
//             <Heading
//               error
//               title="Something went wrong...😐 Check the data validity and try again!"
//             />
//           )}
//         </Container>
//       </Section>
//     </main>
//   );
// }

// 5 шаг

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
        {/* Передаем все обязательные пропсы компонента Heading */}
        <Heading title="Currency Converter" info={true} error={false} top={false} bottom={false} />

        {/* Наша форма ввода */}
        <ExchangeForm />

        {/* Во время запроса показываем лоадер */}
        {isLoading && <Loader />}

        {/* После успешного ответа показываем результат конвертации */}
        {exchangeInfo && (
          <ExchangeInfo
            amount={exchangeInfo.amount}
            from={exchangeInfo.from}
            to={exchangeInfo.to}
            rate={exchangeInfo.rate}
            result={exchangeInfo.result}
          />
        )}

        {/* Если возникла ошибка — информируем пользователя */}
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
