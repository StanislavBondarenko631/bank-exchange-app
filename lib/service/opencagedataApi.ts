import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

interface GetUserInfoArgs {
  latitude: number;
  longitude: number;
}

export const getUserInfo = async ({ latitude, longitude }: GetUserInfoArgs) => {
  const urlPosition = `https://opencagedata.com${latitude}+${longitude}`;

  const { data } = await axios.get(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
