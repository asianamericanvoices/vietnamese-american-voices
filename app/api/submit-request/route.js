// Proxy endpoint to forward article requests to dashboard API
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('Proxy: Received request body:', {
      ...body,
      captchaToken: body.captchaToken ? 'Token present' : 'No token'
    });

    // Forward the request to the dashboard API
    console.log('Proxy: Forwarding to dashboard API...');

    const dashboardResponse = await fetch('https://aavm-dashboard.vercel.app/api/article-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    console.log('Proxy: Dashboard response status:', dashboardResponse.status);

    // Try to parse response
    let data;
    try {
      const responseText = await dashboardResponse.text();
      console.log('Proxy: Dashboard response text:', responseText.substring(0, 200));
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Proxy: Failed to parse dashboard response:', parseError);
      data = {
        success: false,
        error: 'Dashboard API returned invalid response',
        details: parseError.message
      };
    }

    console.log('Proxy: Returning response with status:', dashboardResponse.status);

    // Return the dashboard response with the same status
    return NextResponse.json(data, {
      status: dashboardResponse.status
    });

  } catch (error) {
    console.error('Proxy: Error forwarding request:', error);
    console.error('Proxy: Error stack:', error.stack);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit request',
        details: error.message
      },
      { status: 500 }
    );
  }
}