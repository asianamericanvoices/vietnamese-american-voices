// app/api/newsletter/unsubscribe/route.js - Newsletter unsubscribe endpoint (Vietnamese)
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Supabase client setup
let supabase = null;
try {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.log('Supabase not available for unsubscribe', error);
  supabase = null;
}

// Generate unsubscribe token for an email
export function generateUnsubscribeToken(email) {
  const secret = process.env.NEWSLETTER_UNSUBSCRIBE_SECRET || 'default-newsletter-secret-change-me';
  return crypto.createHmac('sha256', secret).update(email.toLowerCase().trim()).digest('hex').substring(0, 32);
}

// Verify unsubscribe token
function verifyToken(email, token) {
  const expectedToken = generateUnsubscribeToken(email);
  return token === expectedToken;
}

export async function POST(request) {
  try {
    const { email, token } = await request.json();

    if (!email || !token) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc', errorEn: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Verify the token
    if (!verifyToken(email, token)) {
      return NextResponse.json(
        { error: 'Liên kết hủy đăng ký không hợp lệ', errorEn: 'Invalid unsubscribe link' },
        { status: 403 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Dịch vụ tạm thời không khả dụng', errorEn: 'Service temporarily unavailable' },
        { status: 500 }
      );
    }

    // Delete the subscriber
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('email', email.toLowerCase().trim());

    if (error) {
      console.error('Unsubscribe error:', error);
      return NextResponse.json(
        { error: 'Hủy đăng ký thất bại. Vui lòng thử lại sau', errorEn: 'Unsubscribe failed, please try again later' },
        { status: 500 }
      );
    }

    console.log(`✅ Unsubscribed: ${email} (Vietnamese site)`);

    return NextResponse.json({
      success: true,
      message: 'Đã hủy đăng ký nhận bản tin',
      messageEn: 'You have been successfully unsubscribed'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Hủy đăng ký thất bại', errorEn: 'Unsubscribe failed' },
      { status: 500 }
    );
  }
}

// GET handler for direct link unsubscribe
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    return NextResponse.redirect(new URL('/unsubscribe?error=missing', request.url));
  }

  // Verify the token
  if (!verifyToken(email, token)) {
    return NextResponse.redirect(new URL('/unsubscribe?error=invalid', request.url));
  }

  // Redirect to unsubscribe page with valid params
  return NextResponse.redirect(new URL(`/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`, request.url));
}
