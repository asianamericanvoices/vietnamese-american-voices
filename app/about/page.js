// app/about/page.js - Our Mission Page
'use client';

import React from 'react';
import { ArrowLeft, Users, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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
            <span className="text-gray-900">우리의 사명</span>
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
              우리의 사명
            </h1>
            <p className="text-xl text-gray-600 font-korean">
              한미 커뮤니티의 중요한 이야기를 전합니다
            </p>
          </header>

          {/* Mission Statement */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-korean">사명 선언</h2>
            <p className="text-lg text-gray-700 leading-relaxed font-korean">
              한미목소리는 한미 커뮤니티에 독립적이고 정확하며 신속한 뉴스 보도를 제공하는 데 전념하고 있습니다. 우리는 정치, 의료 및 건강, 교육, 이민 및 경제 정책 등 우리 커뮤니티에 영향을 미치는 중요한 문제에 집중합니다. 전문적인 뉴스 보도와 심층 분석을 통해 커뮤니티 내외에서 한미 경험에 대한 이해를 높이기 위해 노력하고 있습니다.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-korean">커뮤니티 우선</h3>
              <p className="text-gray-700 font-korean">
                우리는 항상 한미 커뮤니티의 요구와 관심사를 최우선으로 생각하여 보도 내용이 커뮤니티와 밀접한 관련이 있도록 합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-korean">객관성과 공정성</h3>
              <p className="text-gray-700 font-korean">
                우리는 저널리즘의 전문적 기준을 고수하며, 정치적 또는 상업적 이익에 영향받지 않는 균형 있고 정확하며 사실에 기반한 보도를 제공합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-korean">문화 전승</h3>
              <p className="text-gray-700 font-korean">
                우리는 한국 문화와 미국의 가치관이 융합되는 것을 존중하고 장려하며, 다양하고 포용적인 커뮤니티 대화를 구축합니다.
              </p>
            </div>
          </div>

          {/* What We Cover */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">우리의 보도 중점</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-korean">정치와 정책</h3>
                <p className="text-gray-700 font-korean">
                  이민법, 교육 정책, 의료 개혁 등 한미인에게 영향을 미치는 정책 변화에 주목합니다.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-korean">커뮤니티 발전</h3>
                <p className="text-gray-700 font-korean">
                  한미 커뮤니티의 성취, 도전, 발전 기회를 보도하고 커뮤니티 내 소통과 협력을 장려합니다.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-korean">교육과 직업</h3>
                <p className="text-gray-700 font-korean">
                  교육 자원, 직업 발전, 경제 기회를 심층적으로 보도하여 커뮤니티 구성원들에게 실용적인 정보를 제공합니다.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-korean">문화와 생활</h3>
                <p className="text-gray-700 font-korean">
                  한미인들의 풍부하고 다양한 문화 생활과 커뮤니티 활동을 소개하며 우수한 전통을 계승하고 발전시킵니다.
                </p>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">우리의 약속</h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="font-korean">
                <strong>정확성:</strong> 우리는 정확하고 검증 가능한 정보를 제공하는 데 전념하며, 모든 보도는 엄격한 사실 확인을 거칩니다.
              </p>
              
              <p className="font-korean">
                <strong>독립성:</strong> 우리는 편집의 독립성을 유지하며 어떤 정치 단체, 상업적 이익 또는 외부 압력의 영향을 받지 않습니다.
              </p>
              
              <p className="font-korean">
                <strong>투명성:</strong> 우리는 공개적이고 투명한 편집 정책과 수정 절차를 유지하여 뉴스 보도의 정확성과 신뢰성을 보장합니다.
              </p>
              
              <p className="font-korean">
                <strong>반응성:</strong> 우리는 커뮤니티의 목소리에 적극적으로 귀 기울이고 독자들의 피드백을 환영하며 보도와 서비스 개선을 위해 노력합니다.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">문의하기</h2>
            <p className="text-lg text-gray-700 mb-6 font-korean">
              뉴스 제보, 의견 및 제안, 또는 협력 희망이 있으시면 언제든지 연락해 주세요.
            </p>
            
            <div className="space-y-2 text-gray-600">
              <p className="font-korean">이메일: <a href="mailto:contact@hanmimogsoli.us" className="text-blue-600 hover:text-blue-700">contact@hanmimogsoli.us</a></p>
              <p className="font-korean">뉴스 제보: <a href="mailto:tips@hanmimogsoli.us" className="text-blue-600 hover:text-blue-700">tips@hanmimogsoli.us</a></p>
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