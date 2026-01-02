// Debug endpoint to check Korean site environment variables
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables (don't expose actual values for security)
    const envCheck = {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      RESEND_API_KEY_LENGTH: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0,
      RESEND_API_KEY_PREFIX: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 8) + '...' : 'NOT_FOUND',
      ALL_RESEND_KEYS: Object.keys(process.env).filter(key => key.includes('RESEND')),
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      deployment_time: new Date().toISOString()
    };

    // Test Supabase connection
    let supabaseStatus = 'not_configured';
    
    try {
      const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseKey) {
        // Try to create client
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Test a simple query
        const { data, error } = await supabase
          .from('analytics_events')
          .select('id', { count: 'exact', head: true });
        
        if (error) {
          supabaseStatus = `error: ${error.message}`;
        } else {
          supabaseStatus = 'connected';
        }
      } else {
        supabaseStatus = 'missing_credentials';
      }
    } catch (error) {
      supabaseStatus = `connection_error: ${error.message}`;
    }

    return NextResponse.json({
      status: 'Korean American Voices API Debug',
      timestamp: new Date().toISOString(),
      environment_variables: envCheck,
      supabase_status: supabaseStatus,
      deployment_info: {
        vercel: !!process.env.VERCEL,
        vercel_region: process.env.VERCEL_REGION || 'unknown'
      }
    });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}