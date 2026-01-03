// app/api/newsletter/route.js - Newsletter subscription endpoint for Vietnamese American Voices
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';

// Generate unsubscribe token for an email
function generateUnsubscribeToken(email) {
  const secret = process.env.NEWSLETTER_UNSUBSCRIBE_SECRET || 'default-newsletter-secret-change-me';
  return crypto.createHmac('sha256', secret).update(email.toLowerCase().trim()).digest('hex').substring(0, 32);
}

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
        { error: 'Vui lòng nhập địa chỉ email hợp lệ' },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error('❌ Supabase not available');
      return NextResponse.json(
        { error: 'Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau' },
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
        site_source: 'vietnamese',
        user_agent: userAgent,
        ip_address: ipAddress,
        confirmed: true
      })
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505' || error.message.includes('duplicate key')) {
        return NextResponse.json(
          { error: 'Bạn đã đăng ký nhận bản tin Tiếng Nói Người Mỹ Gốc Việt rồi' },
          { status: 409 }
        );
      }

      console.error('❌ Newsletter signup error:', error);
      return NextResponse.json(
        { error: 'Đăng ký thất bại. Vui lòng thử lại sau', debug: error.message },
        { status: 500 }
      );
    }

    console.log(`✅ New newsletter subscriber: ${email} (Vietnamese site)`);

    // Send confirmation email
    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const unsubscribeToken = generateUnsubscribeToken(email);
        const unsubscribeUrl = `https://tiengnoinguoimygocviet.us/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`;

        await resend.emails.send({
          from: 'Tiếng Nói Người Mỹ Gốc Việt <newsletter@tiengnoinguoimygocviet.us>',
          to: email,
          subject: 'Xác nhận đăng ký - Tiếng Nói Người Mỹ Gốc Việt Newsletter',
          html: `
            <div style="font-family: 'Noto Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 60px; background-color: #eab308; border-radius: 12px; margin: 0 auto 16px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <span style="color: white; font-weight: bold; font-size: 7px; line-height: 1;">Tiếng Nói</span>
                  <span style="color: white; font-weight: bold; font-size: 7px; line-height: 1;">Người Mỹ</span>
                  <span style="color: white; font-weight: bold; font-size: 7px; line-height: 1;">Gốc Việt</span>
                </div>
                <h1 style="color: #111827; margin: 0; font-size: 24px;">Tiếng Nói Người Mỹ Gốc Việt</h1>
                <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 14px;">Vietnamese American Voices</p>
              </div>

              <div style="background-color: #fefce8; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #fde047;">
                <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 20px;">Xác nhận đăng ký</h2>
                <p style="color: #374151; margin: 0 0 16px 0; line-height: 1.6;">
                  Cảm ơn bạn đã đăng ký nhận bản tin Tiếng Nói Người Mỹ Gốc Việt! Bạn sẽ nhận được những tin tức mới nhất và thông tin quan trọng ảnh hưởng đến cộng đồng người Mỹ gốc Việt.
                </p>
                <p style="color: #374151; margin: 0; line-height: 1.6;">
                  Chúng tôi cam kết cung cấp tin tức chính xác và kịp thời về chính trị, giáo dục, y tế, nhập cư và các chủ đề liên quan đến cộng đồng người Mỹ gốc Việt.
                </p>
              </div>

              <div style="background-color: #fef3c7; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h3 style="color: #92400e; margin: 0 0 16px 0; font-size: 18px;">Newsletter Confirmation</h3>
                <p style="color: #78350f; margin: 0 0 16px 0; line-height: 1.6;">
                  Thank you for subscribing to Vietnamese American Voices! You have successfully joined our mailing list and will receive the latest news and important updates affecting the Vietnamese American community.
                </p>
                <p style="color: #78350f; margin: 0; line-height: 1.6;">
                  We are committed to providing you with accurate and timely news coverage on politics, education, healthcare, immigration, and other topics closely related to the Vietnamese American community.
                </p>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://tiengnoinguoimygocviet.us" style="display: inline-block; background-color: #eab308; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500;">
                  Truy cập website Visit Website
                </a>
              </div>

              <div style="border-top: 1px solid #e5e7eb; margin-top: 32px; padding-top: 24px; text-align: center;">
                <p style="color: #6b7280; margin: 0; font-size: 14px;">
                  © 2025 Tiếng Nói Người Mỹ Gốc Việt Vietnamese American Voices. Bảo lưu mọi quyền.
                </p>
                <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 12px;">
                  contact@tiengnoinguoimygocviet.us
                </p>
                <p style="color: #9ca3af; margin: 16px 0 0 0; font-size: 11px;">
                  <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">
                    Hủy đăng ký Unsubscribe
                  </a>
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
      message: 'Đăng ký thành công! Vui lòng kiểm tra email xác nhận.'
    });

  } catch (error) {
    console.error('❌ Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Đăng ký thất bại. Vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
