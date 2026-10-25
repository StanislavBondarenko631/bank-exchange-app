import axios from 'axios';

// Создаем инстанс, который смотрит на наши внутренние Route Handlers
const instance = axios.create({
  baseURL: '/api',
});

interface ExchangeCredentials {
  to: string;
  from: string;
  amount: number;
}

export const exchangeCurrency = async (credentials: ExchangeCredentials) => {
  // Запрос уйдет на /api/convert
  const { data } = await instance.get('/convert', {
    params: credentials,
  });

  return {
    to: data.query.to,
    from: data.query.from,
    amount: data.query.amount,
    rate: data.info.rate,
    result: data.result,
  };
};

export const latestRates = async (baseCurrency: string) => {
  // Запрос уйдет на /api/latest
  const { data } = await instance.get('/latest', {
    params: { base: baseCurrency },
  });

  return Object.entries(data.rates);
};
