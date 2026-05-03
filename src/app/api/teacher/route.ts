import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'getteachperinfo';
  
  // Build the upstream URL dynamically
  const upstreamUrl = new URL('https://dvs1.pgi-intraconnect.in/tdvs-php/app.php');
  upstreamUrl.searchParams.set('a', action);
  upstreamUrl.searchParams.set('univcode', '064');

  // Forward all other search params
  searchParams.forEach((value, key) => {
    if (key !== 'action') {
      upstreamUrl.searchParams.set(key, value);
    }
  });

  try {
    // Bypass SSL verification for internal/unstable university server
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    const response = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Upstream returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Audit Proxy Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error or Upstream Unavailable', details: String(error) },
      { status: 500 }
    );
  }
}
