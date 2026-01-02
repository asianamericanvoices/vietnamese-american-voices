// Simple health check endpoint
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Event Videos API is running',
    endpoints: [
      '/api/event-videos',
      '/api/event-videos/test',
      '/api/event-videos/debug',
      '/api/event-videos/all',
      '/api/event-videos/health'
    ]
  });
}