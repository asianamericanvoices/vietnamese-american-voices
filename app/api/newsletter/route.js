// app/api/newsletter/route.js - Newsletter subscription endpoint
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Supabase client setup
let supabase = null;
try {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseKey) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase connected for newsletter signup');
  } else {
    console.log('❌ Missing Supabase credentials for newsletter signup');
    console.log('SUPABASE_URL:', !!process.env.SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('SUPABASE_ANON_KEY:', !!process.env.SUPABASE_ANON_KEY);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }
} catch (error) {
  console.log('❌ Supabase not available for newsletter signup', error);
  supabase = null;
}


// Verify reCAPTCHA token
async function verifyCaptcha(token) {
  if (!token) return false;

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.warn('RECAPTCHA_SECRET_KEY not configured');
      return true; // Allow in development if not configured
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요' },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error('❌ Supabase not available');
      return NextResponse.json(
        { error: '서비스를 일시적으로 사용할 수 없습니다. 나중에 다시 시도해주세요' },
        { status: 500 }
      );
    }

    // Get client info for tracking
    const userAgent = request.headers.get('user-agent') || '';
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const ipAddress = forwarded ? forwarded.split(',')[0] : realIP;

    // Try to insert the subscriber
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        site_source: 'korean',
        user_agent: userAgent,
        ip_address: ipAddress,
        confirmed: false // You can add email confirmation later
      })
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505' || error.message.includes('duplicate key')) {
        return NextResponse.json(
          { error: '이미 한미목소리 뉴스레터를 구독하고 계십니다' },
          { status: 409 }
        );
      }

      console.error('❌ Newsletter signup error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', JSON.stringify(error, null, 2));

      return NextResponse.json(
        { error: '구독에 실패했습니다. 나중에 다시 시도해주세요', debug: error.message },
        { status: 500 }
      );
    }

    console.log(`✅ New newsletter subscriber: ${email} (Korean site)`);

    // Send confirmation email
    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: '한미목소리 <newsletter@hanmimogsoli.us>',
          to: email,
          subject: '구독 확인 - 한미목소리 Newsletter Confirmation',
          html: `
            <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://hanmimogsoli.us/Korean-Icon-v3.png" alt="한미목소리" style="width: 60px; height: 60px; border-radius: 12px; margin-bottom: 16px;" />
                <h1 style="color: #111827; margin: 0; font-size: 24px;">한미목소리</h1>
                <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 14px;">Korean American Voices</p>
              </div>

              <div style="background-color: #f0f9ff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 20px;">구독 확인</h2>
                <p style="color: #374151; margin: 0 0 16px 0; line-height: 1.6;">
                  한미목소리 뉴스레터를 구독해 주셔서 감사합니다! 이제 미국 내 한인 커뮤니티에 영향을 미치는 최신 뉴스와 중요한 소식을 받아보실 수 있습니다.
                </p>
                <p style="color: #374151; margin: 0; line-height: 1.6;">
                  정확하고 신속한 뉴스를 제공하여 정치, 교육, 의료, 이민 등 한인 사회와 밀접한 관련이 있는 주제들을 다루겠습니다.
                </p>
              </div>

              <div style="background-color: #dbeafe; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h3 style="color: #1e40af; margin: 0 0 16px 0; font-size: 18px;">Newsletter Confirmation</h3>
                <p style="color: #1e3a8a; margin: 0 0 16px 0; line-height: 1.6;">
                  Thank you for subscribing to Korean American Voices! You have successfully joined our mailing list and will receive the latest news and important updates affecting the Korean American community.
                </p>
                <p style="color: #1e3a8a; margin: 0; line-height: 1.6;">
                  We are committed to providing you with accurate and timely news coverage on politics, education, healthcare, immigration, and other topics closely related to the Korean American community.
                </p>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://hanmimogsoli.us" style="display: inline-block; background-color: #1e40af; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500;">
                  웹사이트 방문 Visit Website
                </a>
              </div>

              <div style="border-top: 1px solid #e5e7eb; margin-top: 32px; padding-top: 24px; text-align: center;">
                <p style="color: #6b7280; margin: 0; font-size: 14px;">
                  © 2025 한미목소리 Korean American Voices. 모든 권리 보유 All rights reserved.
                </p>
                <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 12px;">
                  contact@hanmimogsoli.us
                </p>
              </div>
            </div>
          `
        });
        console.log(`📧 Confirmation email sent to: ${email}`);
      } else {
        console.log('⚠️ RESEND_API_KEY not configured - confirmation email not sent');
      }
    } catch (emailError) {
      console.error('❌ Failed to send confirmation email:', emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      success: true,
      message: '구독이 완료되었습니다! 확인 이메일을 확인해 주세요.'
    });

  } catch (error) {
    console.error('❌ Newsletter signup error:', error);
    return NextResponse.json(
      { error: '구독에 실패했습니다. 나중에 다시 시도해주세요' },
      { status: 500 }
    );
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}