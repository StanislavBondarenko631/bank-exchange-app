import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const baseCurrency = searchParams.get('base');

  try {
    const response = await axios.get('https://api.apilayer.com/exchangerates_data/latest', {
      params: {
        symbols: '',
        base: baseCurrency,
      },
      headers: {
        apikey: process.env.API_LAYER_API_KEY ?? '',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
// https://api.apilayer.com/exchangerates_data/latest
