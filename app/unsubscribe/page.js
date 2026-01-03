'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('pending'); // pending, loading, success, error
  const [message, setMessage] = useState('');

  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === 'missing') {
      setStatus('error');
      setMessage('Liên kết hủy đăng ký không hợp lệ hoặc đã hết hạn');
    } else if (error === 'invalid') {
      setStatus('error');
      setMessage('Liên kết hủy đăng ký không hợp lệ');
    }
  }, [error]);

  const handleUnsubscribe = async () => {
    if (!email || !token) {
      setStatus('error');
      setMessage('Liên kết hủy đăng ký không hợp lệ');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Đã hủy đăng ký nhận bản tin');
      } else {
        setStatus('error');
        setMessage(data.error || 'Hủy đăng ký thất bại. Vui lòng thử lại sau');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Hủy đăng ký thất bại. Vui lòng thử lại sau');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-500 rounded-xl mx-auto mb-4 flex flex-col items-center justify-center gap-0.5">
            <span className="text-white font-bold text-[7px] leading-none">Tiếng Nói</span>
            <span className="text-white font-bold text-[7px] leading-none">Người Mỹ</span>
            <span className="text-white font-bold text-[7px] leading-none">Gốc Việt</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Tiếng Nói Người Mỹ Gốc Việt</h1>
          <p className="text-gray-500 text-sm">Vietnamese American Voices</p>
        </div>

        {/* Content based on status */}
        {status === 'pending' && email && token && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hủy đăng ký bản tin</h2>
            <p className="text-gray-600 mb-2">Unsubscribe from Newsletter</p>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn hủy đăng ký bản tin cho <span className="font-medium">{email}</span>?
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to unsubscribe {email}?
            </p>
            <button
              onClick={handleUnsubscribe}
              className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Xác nhận hủy đăng ký Confirm Unsubscribe
            </button>
            <Link
              href="/"
              className="block mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Hủy Cancel
            </Link>
          </div>
        )}

        {status === 'loading' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang xử lý... Processing...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Hủy đăng ký thành công</h2>
            <p className="text-gray-500 mb-2">Successfully Unsubscribed</p>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-gray-500 text-sm mb-6">
              Bạn sẽ không nhận được email bản tin từ chúng tôi nữa.
            </p>
            <Link
              href="/"
              className="inline-block bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Về trang chủ Return Home
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Hủy đăng ký thất bại</h2>
            <p className="text-gray-500 mb-2">Unsubscribe Failed</p>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-gray-500 text-sm mb-6">
              Vui lòng thử lại hoặc liên hệ contact@tiengnoinguoimygocviet.us
            </p>
            <Link
              href="/"
              className="inline-block bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Về trang chủ Return Home
            </Link>
          </div>
        )}

        {status === 'pending' && (!email || !token) && !error && (
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Liên kết không hợp lệ</h2>
            <p className="text-gray-500 mb-2">Invalid Link</p>
            <p className="text-gray-600 mb-6">
              Liên kết hủy đăng ký này không hợp lệ hoặc đã hết hạn. Vui lòng sử dụng liên kết trong email của bạn.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              This unsubscribe link is invalid or expired. Please use the link from your email.
            </p>
            <Link
              href="/"
              className="inline-block bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Về trang chủ Return Home
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs">
            © 2025 Tiếng Nói Người Mỹ Gốc Việt Vietnamese American Voices
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
