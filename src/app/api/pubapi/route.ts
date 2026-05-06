import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Build the upstream URL dynamically for the pubapi endpoint
  const upstreamUrl = new URL('https://coe.pgi-intraconnect.in/pubapi/app.php');
  
  // Forward all search params (a, univcode, regno, etc.)
  searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.set(key, value);
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
    console.error('PubAPI Proxy Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error or Upstream Unavailable', details: String(error) },
      { status: 500 }
    );
  }
}
