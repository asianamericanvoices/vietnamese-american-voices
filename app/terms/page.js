// app/terms/page.js - Terms of Use Page
'use client';

import React from 'react';
import { ArrowLeft, FileText, AlertCircle, Scale, Users } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <span className="text-gray-900">이용약관</span>
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
              이용약관
            </h1>
            <p className="text-xl text-gray-600 font-korean">
              한미목소리 웹사이트 이용 약관 및 조건
            </p>
            <p className="text-sm text-gray-500 mt-4">
              최종 업데이트: 2025년 1월
            </p>
          </header>

          {/* Introduction */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 font-korean">약관 동의</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed font-korean">
              한미목소리(Korean American Voices) 웹사이트를 이용해 주셔서 감사합니다. 본 웹사이트에 접속하고 이용함으로써 다음 이용약관을 준수하는 데 동의하게 됩니다. 이 약관에 동의하지 않으시면 본 웹사이트를 이용하지 마십시오. 저희는 언제든지 이 약관을 수정할 권리를 보유합니다.
            </p>
          </div>

          {/* Acceptable Use */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              허용 가능한 사용
            </h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">허용되는 사용</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="font-korean">• 개인적, 비상업적 목적으로 콘텐츠 읽기 및 공유</li>
                  <li className="font-korean">• 소셜미디어에서 기사 링크 공유 (출처 표기 필수)</li>
                  <li className="font-korean">• 학술 연구를 위한 기사 내용 인용 (출처 표기 필수)</li>
                  <li className="font-korean">• 뉴스레터 구독</li>
                  <li className="font-korean">• 문의 양식을 통한 연락</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">금지된 사용</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="font-korean">• 무단 콘텐츠 복사, 배포 또는 수정</li>
                  <li className="font-korean">• 상업적 목적으로 콘텐츠 사용 (서면 허가 필요)</li>
                  <li className="font-korean">• 자동화 도구로 대량 웹사이트 콘텐츠 수집</li>
                  <li className="font-korean">• 허위, 명예훼손, 혐오 발언 또는 불법 콘텐츠 게시</li>
                  <li className="font-korean">• 웹사이트 보안 파괴 또는 정상 운영 방해 시도</li>
                  <li className="font-korean">• 한미목소리 또는 직원 사칭</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean flex items-center">
              <Scale className="w-8 h-8 text-purple-600 mr-3" />
              지적재산권
            </h2>
            
            <div className="bg-purple-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p className="font-korean">
                  <strong>저작권 보호:</strong> 본 웹사이트의 모든 콘텐츠(기사, 이미지, 로고, 디자인 등)는 저작권법에 의해 보호됩니다. 법이 허용하는 공정 사용을 제외하고는 서면 허가 없이 복사나 배포할 수 없습니다.
                </p>
                
                <p className="font-korean">
                  <strong>상표권:</strong> "한미목소리", "Korean American Voices" 및 관련 로고는 저희의 등록 상표입니다. 무단 사용을 금지합니다.
                </p>
                
                <p className="font-korean">
                  <strong>제3자 콘텐츠:</strong> 저희는 타인의 지적재산권을 존중합니다. 저희 콘텐츠가 귀하의 권리를 침해한다고 생각하시면 즉시 연락해 주세요.
                </p>
                
                <p className="font-korean">
                  <strong>사용자 콘텐츠:</strong> 귀하가 저희에게 제공하는 콘텐츠(댓글, 뉴스 제보 등)의 소유권은 귀하에게 있지만, 저희에게 사용, 수정 및 게시 권한을 부여하시게 됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Content and Accuracy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">콘텐츠 정확성</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">저희의 노력</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="font-korean">• 정보의 정확성과 시의성 확보에 노력</li>
                  <li className="font-korean">• 모든 기사는 편집진의 검토 과정을 거침</li>
                  <li className="font-korean">• 발견된 오류는 신속히 수정</li>
                  <li className="font-korean">• 언론 전문 기준과 윤리 준칙 준수</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">면책 사항</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="font-korean">• 정보에 오류나 구식 내용이 포함될 수 있음</li>
                  <li className="font-korean">• 전문적 조언(법률, 의료, 재정 등)을 구성하지 않음</li>
                  <li className="font-korean">• 외부 링크 내용은 저희 견해를 대변하지 않음</li>
                  <li className="font-korean">• 사용자는 중요 정보를 독립적으로 검증해야 함</li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Conduct */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">사용자 행동 준칙</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">타인 존중</h3>
                <p className="text-gray-700 font-korean">
                  저희와 소통할 때는 예의와 존중을 지켜주십시오. 어떤 형태의 괴롭힘, 차별, 혐오 발언도 용납하지 않습니다.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">정확한 정보</h3>
                <p className="text-gray-700 font-korean">
                  뉴스 제보나 연락 정보를 제공할 때는 정확성을 확인해 주십시오. 의도적으로 허위 정보를 제공하면 법적 결과를 초래할 수 있습니다.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">법률 준수</h3>
                <p className="text-gray-700 font-korean">
                  저희 서비스를 이용할 때는 적용되는 모든 지역, 주, 연방 및 국제 법률과 규정을 준수해야 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy and Data */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">개인정보 및 데이터</h2>
            
            <div className="bg-blue-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4 font-korean">
                저희는 귀하의 개인정보 보호에 전념하고 있습니다. 저희의 데이터 수집 및 사용 관행은 <Link href="/privacy" className="text-blue-600 hover:text-blue-700">개인정보처리방침</Link>에 자세히 설명되어 있습니다.
              </p>
              
              <p className="text-gray-700 font-korean">
                본 웹사이트를 이용하시면 개인정보처리방침에 따라 정보를 수집하고 사용하는 데 동의하시게 됩니다.
              </p>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean flex items-center">
              <AlertCircle className="w-8 h-8 text-yellow-600 mr-3" />
              면책 사항
            </h2>
            
            <div className="bg-yellow-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p className="font-korean">
                  <strong>"있는 그대로" 제공:</strong> 본 웹사이트와 모든 콘텐츠는 "있는 그대로" 제공되며, 명시적이거나 묵시적인 어떠한 보증도 제공하지 않습니다.
                </p>
                
                <p className="font-korean">
                  <strong>무보증:</strong> 웹사이트가 중단 없이 작동하거나 오류나 바이러스가 없다는 보증은 하지 않습니다.
                </p>
                
                <p className="font-korean">
                  <strong>제3자 링크:</strong> 저희 웹사이트에는 제3자 웹사이트로의 링크가 포함될 수 있습니다. 이러한 웹사이트의 콘텐츠나 개인정보 보호 관행에 대해서는 책임지지 않습니다.
                </p>
                
                <p className="font-korean">
                  <strong>기술적 문제:</strong> 기술적 결함이나 유지보수로 인해 웹사이트에 일시적으로 접속할 수 없을 수 있습니다. 이러한 중단을 최소화하도록 노력하겠습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">책임의 제한</h2>
            
            <div className="bg-red-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4 font-korean">
                법이 허용하는 최대 범위에서 한미목소리 및 그 직원, 파트너는 다음 상황에 대해 책임지지 않습니다:
              </p>
              
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="font-korean">• 본 웹사이트 사용 또는 사용 불가로 인한 직접적, 간접적, 특수한 또는 결과적 손해</li>
                <li className="font-korean">• 정보 오류나 누락으로 인한 손실</li>
                <li className="font-korean">• 제3자 콘텐츠나 서비스로 인한 문제</li>
                <li className="font-korean">• 데이터 손실이나 시스템 오류</li>
                <li className="font-korean">• 네트워크 공격이나 기술적 문제로 인한 손실</li>
              </ul>
              
              <p className="text-sm text-gray-600 font-korean">
                일부 관할권에서는 책임 제한을 허용하지 않으므로, 위 제한이 귀하에게 적용되지 않을 수 있습니다.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">서비스 종료</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">저희의 권리</h3>
                <p className="text-gray-700 text-sm font-korean">
                  저희는 사전 통지 없이 언제든지 웹사이트 이용을 종료하거나 중단시킬 권리를 보유합니다. 특히 이 약관을 위반한 경우에는 더욱 그러합니다.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-korean">귀하의 권리</h3>
                <p className="text-gray-700 text-sm font-korean">
                  언제든지 저희 웹사이트 이용을 중단할 수 있습니다. 서비스를 구독하셨다면 언제든지 구독을 취소할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">준거법</h2>
            
            <div className="bg-blue-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4 font-korean">
                본 이용약관은 콜로라도주 법률에 의해 규율되며, 법률 충돌 원칙은 고려하지 않습니다. 모든 분쟁은 콜로라도주 법원에서 해결됩니다.
              </p>
              
              <p className="text-gray-700 font-korean">
                본 약관의 어느 부분이 무효하거나 시행 불가능하다고 판단되더라도, 나머지 부분은 완전히 유효하게 유지됩니다.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">약관 변경</h2>
            
            <div className="bg-green-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4 font-korean">
                저희는 때때로 이 이용약관을 업데이트할 수 있습니다. 중대한 변경사항은 웹사이트의 눈에 띄는 위치에 공지하고, 구독 사용자에게는 이메일로 알려드립니다.
              </p>
              
              <p className="text-gray-700 mb-4 font-korean">
                변경사항은 게시 후 즉시 효력이 발생합니다. 웹사이트를 계속 이용하시면 수정된 약관에 동의하시는 것으로 간주됩니다.
              </p>
              
              <p className="text-sm text-gray-600 font-korean">
                변경사항을 파악하기 위해 정기적으로 이 페이지를 확인하시기 바랍니다.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-korean">문의하기</h2>
            <p className="text-lg text-gray-700 mb-6 font-korean">
              이 이용약관에 대해 질문이 있으시면 연락해 주세요:
            </p>
            
            <div className="space-y-2 text-gray-600">
              <p className="font-korean">법무 담당: <a href="mailto:legal@hanmimogsoli.us" className="text-blue-600 hover:text-blue-700">legal@hanmimogsoli.us</a></p>
              <p className="font-korean">일반 문의: <a href="mailto:contact@hanmimogsoli.us" className="text-blue-600 hover:text-blue-700">contact@hanmimogsoli.us</a></p>
            </div>
            
            <p className="text-sm text-gray-500 mt-6 font-korean">
              한미목소리를 선택해 주셔서 감사합니다. 한미 커뮤니티에 양질의 뉴스 서비스를 제공하기 위해 노력하겠습니다.
            </p>
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