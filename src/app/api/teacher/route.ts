import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fteachcode = searchParams.get('fteachcode');

  if (!fteachcode) {
    return NextResponse.json({ error: 'Missing fteachcode' }, { status: 400 });
  }

  try {
    // Bypass SSL verification for internal/unstable university server
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    const url = `https://dvs1.pgi-intraconnect.in/tdvs-php/app.php?a=getteachperinfo&univcode=064&fteachcode=${encodeURIComponent(fteachcode)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Using cache: 'no-store' to ensure we always get fresh data
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Upstream returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error or Upstream Unavailable' },
      { status: 500 }
    );
  }
}
