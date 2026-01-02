'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function ArticleRequestForm() {
  const [formData, setFormData] = useState({
    articleUrl: '',
    name: '',
    email: '',
    zip: '',
    comment: ''
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);

  // Korean translations
  const translations = {
    title: "기사 번역 요청",
    urlLabel: "기사 링크",
    urlPlaceholder: "번역을 원하는 기사 링크를 붙여넣으세요",
    nameLabel: "이름",
    namePlaceholder: "귀하의 이름",
    emailLabel: "이메일",
    emailPlaceholder: "귀하의 이메일 주소",
    zipLabel: "우편번호 (선택사항)",
    zipPlaceholder: "귀하의 우편번호",
    commentLabel: "댓글 (선택사항)",
    commentPlaceholder: "이 기사를 번역했으면 하는 이유는 무엇인가요?",
    submitButton: "요청 제출",
    submittingButton: "제출 중...",
    successMessage: "추천해 주셔서 감사합니다! 편집팀이 귀하의 요청을 검토할 것입니다.",
    errorMessage: "제출 실패. 나중에 다시 시도해 주세요.",
    rateLimitMessage: "오늘 너무 많은 요청을 제출하셨습니다. 내일 다시 시도해 주세요.",
    characterCount: (count) => `${count}/500`
  };

  // Initialize reCAPTCHA when script loads
  const handleRecaptchaLoad = () => {
    console.log('reCAPTCHA script loaded, checking for grecaptcha.ready...');
    setRecaptchaLoaded(true);

    // Use grecaptcha.ready to ensure it's fully initialized
    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(() => {
        console.log('grecaptcha.ready called, rendering reCAPTCHA...');
        console.log('Site key:', process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
        if (recaptchaRef.current && !recaptchaRef.current.hasChildNodes()) {
          try {
            const widgetId = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              callback: (token) => {
                console.log('reCAPTCHA token received');
                setCaptchaToken(token);
              },
              'expired-callback': () => {
                console.log('reCAPTCHA token expired');
                setCaptchaToken(null);
              },
              'error-callback': () => {
                console.error('reCAPTCHA error occurred');
                setCaptchaToken(null);
              }
            });
            console.log('reCAPTCHA rendered with widget ID:', widgetId);
          } catch (e) {
            console.error('Error rendering reCAPTCHA:', e);
          }
        }
      });
    } else {
      console.error('grecaptcha.ready not available');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'comment') {
      if (value.length <= 500) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setCharacterCount(value.length);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    // Check required fields
    if (!formData.articleUrl || !formData.name || !formData.email) {
      setMessage({ type: 'error', text: '필수 항목을 모두 입력해주세요.' });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: '올바른 이메일 주소를 입력해주세요.' });
      return false;
    }

    // Validate URL format
    try {
      new URL(formData.articleUrl);
    } catch {
      setMessage({ type: 'error', text: '올바른 URL을 입력해주세요.' });
      return false;
    }

    // Check CAPTCHA
    if (!captchaToken) {
      setMessage({ type: 'error', text: 'reCAPTCHA를 완료해주세요.' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Use local proxy endpoint to avoid CORS issues
      console.log('Submitting article request...');

      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          siteSource: 'korean',
          captchaToken: captchaToken
        })
      });

      console.log('Response status:', response.status);

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse response:', jsonError);
        data = { error: 'Invalid response from server' };
      }

      if (response.ok) {
        setMessage({ type: 'success', text: translations.successMessage });
        // Reset form
        setFormData({
          articleUrl: '',
          name: '',
          email: '',
          zip: '',
          comment: ''
        });
        setCharacterCount(0);
        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
        setCaptchaToken(null);
      } else if (response.status === 429) {
        setMessage({ type: 'error', text: translations.rateLimitMessage });
      } else {
        console.error('Submission failed:', data);
        const errorMessage = data.details
          ? `${data.error || translations.errorMessage} (${data.details})`
          : data.error || data.message || translations.errorMessage;
        setMessage({ type: 'error', text: errorMessage });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ type: 'error', text: translations.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={handleRecaptchaLoad}
      />

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 font-korean">
          {translations.title}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Article URL */}
          <div>
            <label htmlFor="articleUrl" className="block text-sm font-medium text-gray-700 mb-1 font-korean">
              {translations.urlLabel}
            </label>
            <input
              type="url"
              id="articleUrl"
              name="articleUrl"
              value={formData.articleUrl}
              onChange={handleInputChange}
              placeholder={translations.urlPlaceholder}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-korean text-sm"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 font-korean">
              {translations.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={translations.namePlaceholder}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-korean text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-korean">
              {translations.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={translations.emailPlaceholder}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-korean text-sm"
            />
          </div>

          {/* Zip Code (Optional) */}
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1 font-korean">
              {translations.zipLabel}
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder={translations.zipPlaceholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-korean text-sm"
            />
          </div>

          {/* Comment (Optional) */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1 font-korean">
              {translations.commentLabel}
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder={translations.commentPlaceholder}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-korean text-sm resize-none"
            />
            <div className="text-right text-xs text-gray-500 mt-1 font-korean">
              {translations.characterCount(characterCount)}
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center my-4">
            <div ref={recaptchaRef}></div>
          </div>

          {!recaptchaLoaded && (
            <div className="text-center text-sm text-gray-500 font-korean">
              reCAPTCHA 로딩 중...
            </div>
          )}

          {/* Message */}
          {message && (
            <div className={`p-3 rounded-md text-sm font-korean ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !recaptchaLoaded}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-korean font-medium text-sm"
          >
            {isSubmitting ? translations.submittingButton : translations.submitButton}
          </button>
        </form>
      </div>
    </>
  );
}