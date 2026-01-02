// app/privacy/page.js - Privacy Policy Page
'use client';

import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex flex-col items-center justify-center gap-0.5">
                <span className="text-white font-bold text-xs leading-none tracking-wide">한미</span>
                <span className="text-white font-bold text-xs leading-none tracking-wide">목소리</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  한미목소리
                </h1>
                <p className="text-xs text-gray-500">Korean American Voices</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:contact@hanmimogsoli.us" 
                className="text-gray-700 hover:text-blue-600 text-sm font-medium"
              >
                문의하기
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <span>›</span>
            <span className="text-gray-900">개인정보처리방침</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>

        <article className="prose prose-lg max-w-none">
          {/* Page Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 font-korean">
              개인정보처리방침
            </h1>
            <p className="text-xl text-gray-600 font-korean">
              개인정보 보호는 우리의 최우선 책임입니다
            </p>
            <p className="text-sm text-gray-500 mt-4">
              최종 업데이트: 2025년 1월
            </p>
          </header>

          {/* Privacy Commitment */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 font-korean">우리의 개인정보 보호 약속</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed font-korean">
한미목소리(Korean American Voices)는 사용자 개인정보 보호에 전념하고 있습니다. 본 개인정보처리방침은 우리가 개인정보를 어떻게 수집, 사용, 저장 및 보호하는지 설명합니다. 우리는 캘리포니아 소비자 개인정보보호법(CCPA), 콜로라도 개인정보보호법(CPA), 일반데이터보호규정(GDPR) 등 관련 개인정보 보호 법륙을 엄격히 준수합니다.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean flex items-center">
              <Database className="w-8 h-8 text-blue-600 mr-3" />
              수집하는 정보
            </h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">1. 자동 수집 정보</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="font-korean">• <strong>접속 데이터:</strong> IP주소, 브라우저 유형, 운영체제, 방문 시간</li>
                  <li className="font-korean">• <strong>웹사이트 사용:</strong> 방문 페이지, 체류 시간, 클릭 행동, 스크롤 깊이</li>
                  <li className="font-korean">• <strong>기기 정보:</strong> 기기 유형, 화면 해상도, 언어 설정</li>
                  <li className="font-korean">• <strong>참조 출처:</strong> 우리 웹사이트 방문 링크 및 소셜미디어 플랫폼</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">2. 직접 제공 정보</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="font-korean">• <strong>뉴스레터 구독:</strong> 이메일 주소 (구독 선택 시)</li>
                  <li className="font-korean">• <strong>문의 양식:</strong> 이름, 이메일, 메시지 내용</li>
                  <li className="font-korean">• <strong>뉴스 제보:</strong> 사용자가 제공하는 뉴스 정보 및 연락처</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">3. 소셜미디어 상호작용</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="font-korean">• <strong>공유 행동:</strong> 기사를 카카오톡, WhatsApp, Facebook 등 플랫폼에 공유하는 익명 통계</li>
                  <li className="font-korean">• <strong>플랫폼 식별:</strong> 방문 출처 감지 (카카오톡 브라우저, 소셜미디어 링크 등)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean flex items-center">
              <Eye className="w-8 h-8 text-blue-600 mr-3" />
              정보 사용 목적
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">웹사이트 개선</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="font-korean">• 사용자 행동 분석을 통한 콘텐츠 및 사용자 경험 최적화</li>
                  <li className="font-korean">• 독자 선호도 파악으로 관련성 높은 뉴스 제공</li>
                  <li className="font-korean">• 기술 문제 해결 및 웹사이트 성능 최적화</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">콘텐츠 개인화</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="font-korean">• 읽기 기록에 따른 관련 기사 추천</li>
                  <li className="font-korean">• 모바일 및 데스크톱 경험 최적화</li>
                  <li className="font-korean">• 다국어 지원 및 현지화 콘텐츠 제공</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">뉴스레터 서비스</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="font-korean">• 뉴스 요약 및 중요 업데이트 발송 (구독자 한정)</li>
                  <li className="font-korean">• 사용자 문의 및 뉴스 제보에 대한 응답</li>
                  <li className="font-korean">• 웹사이트 중요 공지사항 및 정책 업데이트</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">보안 보호</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="font-korean">• 악성 공격 및 스팸 방지</li>
                  <li className="font-korean">• 법률 및 규정 요구사항 준수</li>
                  <li className="font-korean">• 웹사이트 및 사용자 보안 보호</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean flex items-center">
              <Lock className="w-8 h-8 text-green-600 mr-3" />
              데이터 보안
            </h2>
            
            <div className="bg-green-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p className="font-korean">
                  <strong>암호화 전송:</strong> SSL/TLS 암호화 기술을 사용하여 데이터 전송 보안을 보호합니다.
                </p>
                
                <p className="font-korean">
                  <strong>안전한 저장:</strong> 데이터는 업계 표준을 준수하는 보안 서버에 저장되며 방화벽과 침입 탐지 시스템을 갖추고 있습니다.
                </p>
                
                <p className="font-korean">
                  <strong>접근 제어:</strong> 승인된 직원만 사용자 데이터에 접근할 수 있으며 모든 접근은 상세히 기록됩니다.
                </p>
                
                <p className="font-korean">
                  <strong>정기 감사:</strong> 정기적인 보안 감사 및 취약점 평가를 실시하여 데이터 보호 조치가 효과적인지 확인합니다.
                </p>
                
                <p className="font-korean">
                  <strong>데이터 최소화:</strong> 필요한 정보만 수집하며 불필요한 데이터는 정기적으로 삭제합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">제3자 서비스</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">Google Analytics</h3>
                <p className="text-gray-700 mb-3 font-korean">
                  웹사이트 트래픽과 사용자 행동 분석을 위해 Google Analytics를 사용합니다. Google은 익명화된 사용 데이터를 수집할 수 있습니다.
                </p>
                <p className="text-sm text-gray-600 font-korean">
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Google Analytics 차단 플러그인</a>을 설치하여 데이터 수집을 비활성화할 수 있습니다.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">Supabase</h3>
                <p className="text-gray-700 font-korean">
                  기사 콘텐츠와 분석 데이터 저장을 위해 Supabase를 데이터베이스 서비스 제공업체로 사용합니다. Supabase는 SOC 2 Type II 표준을 준수합니다.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">Vercel</h3>
                <p className="text-gray-700 font-korean">
                  웹사이트는 Vercel 플랫폼에서 호스팅되며, 웹사이트 운영을 위해 접속 로그와 성능 데이터를 수집할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">귀하의 권리</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-korean">접근권</h3>
                <p className="text-gray-700 text-sm font-korean">
                  우리가 수집한 귀하에 관한 정보를 알 권리가 있습니다.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-korean">정정권</h3>
                <p className="text-gray-700 text-sm font-korean">
                  부정확한 개인정보의 수정을 요청할 수 있습니다.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-korean">삭제권</h3>
                <p className="text-gray-700 text-sm font-korean">
                  법률이 허용하는 범위 내에서 개인정보 삭제를 요청할 수 있습니다.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-korean">거부권</h3>
                <p className="text-gray-700 text-sm font-korean">
                  마케팅 통신과 같은 특정 유형의 데이터 처리를 거부할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">쿠키 정책</h2>
            
            <div className="bg-yellow-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4 font-korean">
                귀하의 브라우징 경험을 개선하기 위해 쿠키 및 유사한 기술을 사용합니다. 쿠키는 다음 목적으로 사용됩니다:
              </p>
              
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="font-korean">• 기본 웹사이트 기능 제공</li>
                <li className="font-korean">• 사용자 설정 기억</li>
                <li className="font-korean">• 익명 사용 통계 수집</li>
                <li className="font-korean">• 웹사이트 성능 개선</li>
              </ul>
              
              <p className="text-sm text-gray-600 font-korean">
                브라우저 설정을 통해 쿠키 사용을 제어할 수 있습니다. 쿠키를 비활성화하면 웹사이트의 일부 기능이 영향을 받을 수 있습니다.
              </p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">정책 업데이트</h2>
            <p className="text-gray-700 mb-4 font-korean">
              우리는 때때로 본 개인정보처리방침을 업데이트할 수 있습니다. 중대한 변경사항은 웹사이트의 눈에 띠는 위치에 공지하고, 구독 사용자에게는 이메일로 알려드립니다.
            </p>
            <p className="text-gray-700 font-korean">
              웹사이트를 계속 사용하시면 업데이트된 개인정보처리방침에 동의하는 것으로 간주됩니다.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">문의하기</h2>
            <p className="text-lg text-gray-700 mb-6 font-korean">
              본 개인정보처리방침에 대한 질문이 있거나 권리를 행사하려면 연락해 주세요:
            </p>
            
            <div className="space-y-2 text-gray-600">
              <p className="font-korean">개인정보 문의: <a href="mailto:privacy@hanmimogsoli.us" className="text-blue-600 hover:text-blue-700">privacy@hanmimogsoli.us</a></p>
              <p className="font-korean">일반 문의: <a href="mailto:contact@hanmimogsoli.us" className="text-blue-600 hover:text-blue-700">contact@hanmimogsoli.us</a></p>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <span className="text-white font-bold text-xs leading-none tracking-wide">한미</span>
                  <span className="text-white font-bold text-xs leading-none tracking-wide">목소리</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-korean">
                    한미목소리
                  </h3>
                  <p className="text-sm text-gray-400">Korean American Voices</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-korean">
                한미 커뮤니티의 중요한 이야기를 전합니다. 우리 커뮤니티에 영향을 미치는 문제에 집중하는 독립 뉴스 매체입니다.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-korean">소개</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white font-korean">우리의 사명</Link></li>
                <li><a href="mailto:contact@hanmimogsoli.us" className="text-gray-400 hover:text-white font-korean">문의하기</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white font-korean">개인정보처리방침</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white font-korean">이용약관</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="font-korean">
              &copy; 2025 한미목소리. 모든 권리 보유.
              <span className="text-xs opacity-70 ml-2">Asian American Voices Media, Inc. 소속</span>
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .font-korean {
          font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
        }
      `}</style>
    </div>
  );
}