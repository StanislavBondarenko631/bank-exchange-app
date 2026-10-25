import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get('to');
  const from = searchParams.get('from');
  const amount = searchParams.get('amount');

  try {
    const response = await axios.get('https://api.apilayer.com/exchangerates_data/convert', {
      params: { to, from, amount },
      headers: { apikey: process.env.API_LAYER_API_KEY ?? '' },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
// https://api.apilayer.com/exchangerates_data/convert
