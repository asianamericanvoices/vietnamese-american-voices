'use client';

import React, { useState, useEffect } from 'react';
import { X, MapPin, Vote, Calendar, FileText, ExternalLink, Info } from 'lucide-react';

// Track popup interactions
const trackPopupEvent = async (eventType, metadata) => {
  try {
    // Send to GA4 if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventType, {
        event_category: 'Popup',
        ...metadata
      });
    }

    // Send to internal analytics
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        metadata: {
          ...metadata,
          date: new Date().toISOString().split('T')[0],
          timestamp: new Date().toISOString()
        }
      })
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

export default function ManualVotingInfoPopup({ state, eventType, isOpen, onClose }) {
  const [votingStatus, setVotingStatus] = useState(null);

  // Get popup content based on state
  const getPopupContent = () => {
    const content = {
      'NJ': {
        title: '뉴저지 유권자 여러분께',
        subtitle: '2025년 뉴저지 주지사 선거 정보',
        resources: [
          {
            icon: Vote,
            title: '유권자 등록 확인',
            description: '귀하의 등록 상태를 확인하세요',
            link: 'https://voter.svrs.nj.gov/registration-check',
            linkText: 'NJ Voter Registration 방문'
          },
          {
            icon: FileText,
            title: '우편 투표 신청',
            description: 'Vote-by-Mail 투표를 신청하세요',
            link: 'https://www.nj.gov/state/elections/vote-by-mail.shtml',
            linkText: '우편 투표 신청서'
          },
          {
            icon: MapPin,
            title: '투표소 찾기',
            description: '가까운 투표소를 찾아보세요',
            link: 'https://voter.svrs.nj.gov/polling-place-search',
            linkText: '투표소 위치 확인'
          },
          {
            icon: Info,
            title: '후보자 정보',
            description: '주지사 후보자들에 대해 알아보세요',
            link: 'https://www.nj.gov/state/elections/',
            linkText: '선거 정보 센터'
          },
          {
            icon: Calendar,
            title: '중요 일정',
            description: '선거일: 2025년 11월 4일',
            dates: [
              '유권자 등록 마감: 2025년 10월 14일',
              '우편 투표 신청 마감: 2025년 10월 28일',
              '조기 투표: 2025년 10월 25일 - 11월 2일',
              '우편 투표 반송 마감: 2025년 11월 4일 오후 8시'
            ]
          }
        ],
        footerMessage: '뉴저지 주지사는 주 정책과 예산을 결정하는 중요한 직책입니다. 한인 커뮤니티의 목소리를 내주세요.'
      },
      'PA': {
        title: '펜실베이니아 유권자 여러분께',
        subtitle: '펜실베이니아 대법원 재임용 선거 정보',
        resources: [
          {
            icon: Vote,
            title: '유권자 등록 확인',
            description: '귀하의 등록 상태를 확인하세요',
            link: 'https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx',
            linkText: 'PA Voter Services 방문'
          },
          {
            icon: FileText,
            title: '우편 투표 신청',
            description: '우편 투표를 신청하세요',
            link: 'https://www.pavoterservices.pa.gov/OnlineAbsenteeApplication/',
            linkText: '우편 투표 신청서'
          },
          {
            icon: MapPin,
            title: '투표소 찾기',
            description: '가까운 투표소를 찾아보세요',
            link: 'https://www.pavoterservices.pa.gov/pages/pollingplaceinfo.aspx',
            linkText: '투표소 위치 확인'
          },
          {
            icon: Calendar,
            title: '중요 일정',
            description: '선거일: 2025년 11월 4일',
            dates: [
              '유권자 등록 마감: 2025년 10월 14일',
              '우편 투표 신청 마감: 2025년 10월 28일',
              '우편 투표 반송 마감: 2025년 11월 4일 오후 8시'
            ]
          }
        ],
        footerMessage: '펜실베이니아 대법원 판사 재임용은 사법부의 독립성과 공정성을 유지하는 중요한 결정입니다.'
      },
      'GA': {
        title: '조지아 유권자 여러분께',
        subtitle: '조지아주 공공서비스위원회 선거 정보',
        resources: [
          {
            icon: Vote,
            title: '유권자 등록 확인',
            description: '귀하의 등록 상태를 확인하세요',
            link: 'https://www.mvp.sos.ga.gov/MVP/mvp.do',
            linkText: 'My Voter Page 방문'
          },
          {
            icon: FileText,
            title: '부재자 투표 신청',
            description: '우편 투표를 신청하세요',
            link: 'https://ballotrequest.sos.ga.gov/',
            linkText: '부재자 투표 신청서'
          },
          {
            icon: MapPin,
            title: '투표소 찾기',
            description: '가까운 투표소를 찾아보세요',
            link: 'https://www.mvp.sos.ga.gov/MVP/mvp.do',
            linkText: '투표소 위치 확인'
          },
          {
            icon: Calendar,
            title: '중요 일정',
            description: '선거일: 2025년 11월 4일',
            dates: [
              '유권자 등록 마감: 2025년 10월 6일',
              '조기 투표: 2025년 10월 13일 - 10월 31일',
              '부재자 투표 신청 마감: 2025년 10월 24일'
            ]
          }
        ],
        footerMessage: '조지아주 공공서비스위원회는 전기, 가스, 전화 서비스 요금을 규제합니다. 여러분의 투표가 공공요금에 직접적인 영향을 미칩니다.'
      },
      'CA': {
        title: '캘리포니아 유권자 여러분께',
        subtitle: '제50호 발의안 - 선거구 재조정 정보',
        resources: [
          {
            icon: Vote,
            title: '유권자 등록 확인',
            description: '귀하의 등록 상태를 확인하세요',
            link: 'https://voterstatus.sos.ca.gov/',
            linkText: 'CA Voter Status 방문'
          },
          {
            icon: FileText,
            title: '투표용지 추적',
            description: '우편 투표용지를 추적하세요',
            link: 'https://california.ballottrax.net/voter/',
            linkText: 'Where\'s My Ballot?'
          },
          {
            icon: Info,
            title: '제50호 발의안 정보',
            description: '선거구 재조정 발의안 상세 정보',
            link: 'https://voterguide.sos.ca.gov/quick-reference-guide/50.htm',
            linkText: '공식 유권자 안내서'
          },
          {
            icon: MapPin,
            title: '투표소 찾기',
            description: '가까운 투표소를 찾아보세요',
            link: 'https://www.sos.ca.gov/elections/polling-place',
            linkText: '투표소 위치 확인'
          },
          {
            icon: Calendar,
            title: '중요 일정',
            description: '선거일: 2025년 11월 4일',
            dates: [
              '유권자 등록 마감: 2025년 10월 20일',
              '우편 투표 시작: 2025년 10월 6일',
              '우편 투표 반송 마감: 2025년 11월 4일 오후 8시'
            ]
          }
        ],
        footerMessage: '선거구 재조정은 공정한 대표성을 보장하는 민주주의의 핵심입니다.'
      },
      'TN': {
        title: '테네시 유권자 여러분께',
        subtitle: '테네시 제7선거구 국회 특별선거 정보',
        resources: [
          {
            icon: Vote,
            title: '유권자 등록 확인',
            description: '귀하의 등록 상태를 확인하세요',
            link: 'https://tnmap.tn.gov/voterlookup/',
            linkText: 'TN Voter Lookup 방문'
          },
          {
            icon: FileText,
            title: '부재자 투표 신청',
            description: '우편 투표 신청',
            link: 'https://sos.tn.gov/elections/services/absentee-voting',
            linkText: '부재자 투표 신청 정보'
          },
          {
            icon: MapPin,
            title: '투표소 찾기',
            description: '가까운 투표소를 찾아보세요',
            link: 'https://tnmap.tn.gov/voterlookup/',
            linkText: '투표소 위치 확인'
          },
          {
            icon: Info,
            title: '특별선거 정보',
            description: '제7선거구 특별선거 상세 정보',
            link: 'https://sos.tn.gov/elections/services/special-election-information',
            linkText: '특별선거 공식 정보'
          },
          {
            icon: Calendar,
            title: '중요 일정',
            description: '선거일: 2025년 12월 2일',
            dates: [
              '유권자 등록 마감: 2025년 11월 3일',
              '조기 투표: 2025년 11월 12일 - 11월 26일',
              '부재자 투표 신청 마감: 2025년 11월 25일'
            ]
          }
        ],
        footerMessage: '테네시 제7선거구 국회 특별선거는 워싱턴에서 우리를 대표할 의원을 결정합니다.'
      }
    };

    return content[state] || null;
  };

  useEffect(() => {
    if (isOpen) {
      // Track that popup was shown via manual button
      trackPopupEvent('popup_shown', {
        user_state: state,
        event_type: eventType,
        auto_shown: false,
        manual_trigger: true,
        trigger_source: 'voting_info_button'
      });
    }
  }, [isOpen, state, eventType]);

  const handleDismiss = (dismissType = 'unknown') => {
    // Track dismissal
    trackPopupEvent('popup_dismissed', {
      user_state: state,
      event_type: eventType,
      dismiss_type: dismissType,
      manual_trigger: true
    });

    // Call onClose callback
    onClose();
  };

  const handleLinkClick = (linkType, linkUrl, linkText) => {
    // Create English labels for dashboard display
    const englishLabels = {
      '유권자 등록 확인': 'Voter Registration Check',
      '우편 투표 신청': 'Mail Ballot Application',
      '투표소 찾기': 'Polling Place Finder',
      '후보자 정보': 'Candidate Information',
      '중요 일정': 'Important Dates'
    };

    // Include state prefix in the type for differentiation
    const stateSpecificType = `${state}_${englishLabels[linkType] || linkType}`;

    trackPopupEvent('popup_link_click', {
      user_state: state,
      event_type: eventType,
      link_type: stateSpecificType,
      link_type_korean: linkType,
      link_url: linkUrl,
      link_text: linkText,
      link_text_english: `${state} - ${englishLabels[linkType] || linkType}`,
      manual_trigger: true,
      trigger_source: 'voting_info_button'
    });
  };

  const handleVotingStatus = async (status) => {
    setVotingStatus(status);

    // Track the voting status response
    await trackPopupEvent('voting_status_response', {
      user_state: state,
      event_type: eventType,
      voting_status: status,
      response_time: new Date().toISOString(),
      manual_trigger: true,
      trigger_source: 'voting_info_button'
    });

    // Save to database via API
    try {
      const surveyPayload = {
        event_slug: eventType,
        state: state,
        response: status,
        timestamp: new Date().toISOString()
      };

      console.log('Sending voter survey:', surveyPayload);

      const response = await fetch('/api/analytics/voter-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyPayload)
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Survey API error:', result);
      } else {
        console.log('Survey saved successfully:', result);
      }
    } catch (error) {
      console.error('Failed to save voting status:', error);
    }
  };

  if (!isOpen) return null;

  const content = getPopupContent();
  if (!content) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={() => handleDismiss('backdrop')}
      />

      {/* Popup - Centered with height constraints */}
      <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] md:inset-x-auto md:left-[50%] md:translate-x-[-50%] max-w-3xl z-[100]">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp max-h-[70vh] md:max-h-[75vh] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 relative">
            <button
              onClick={() => handleDismiss('x_button')}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-8 h-8" />
              <h2 className="text-2xl font-bold">{content.title}</h2>
            </div>
            <p className="text-lg opacity-95">{content.subtitle}</p>
          </div>

          {/* Content - Scrollable if needed */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {content.resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-start space-x-3">
                    <Icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{resource.description}</p>

                      {resource.link && (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                          onClick={() => handleLinkClick(resource.title, resource.link, resource.linkText)}
                        >
                          <span>{resource.linkText}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {resource.dates && (
                        <ul className="mt-2 space-y-1">
                          {resource.dates.map((date, i) => (
                            <li key={i} className="text-sm text-gray-600">• {date}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Voting Status Survey */}
            <div className="mx-6 mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                간단한 설문: 투표 계획이 어떻게 되시나요?
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleVotingStatus('already_voted')}
                  className={`px-3 py-2 text-sm rounded-md border transition-all ${
                    votingStatus === 'already_voted'
                      ? 'bg-green-100 border-green-400 text-green-800'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ✓ 이미 투표했어요
                </button>
                <button
                  onClick={() => handleVotingStatus('will_vote')}
                  className={`px-3 py-2 text-sm rounded-md border transition-all ${
                    votingStatus === 'will_vote'
                      ? 'bg-blue-100 border-blue-400 text-blue-800'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  📅 투표할 예정이에요
                </button>
                <button
                  onClick={() => handleVotingStatus('need_info')}
                  className={`px-3 py-2 text-sm rounded-md border transition-all ${
                    votingStatus === 'need_info'
                      ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ❓ 정보가 필요해요
                </button>
                <button
                  onClick={() => handleVotingStatus('skip')}
                  className={`px-3 py-2 text-sm rounded-md border transition-all ${
                    votingStatus === 'skip'
                      ? 'bg-gray-100 border-gray-400 text-gray-600'
                      : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  건너뛰기
                </button>
              </div>
              {votingStatus && votingStatus !== 'skip' && (
                <p className="text-xs text-green-600 mt-2 text-center">
                  ✓ 응답해 주셔서 감사합니다!
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-600 italic">{content.footerMessage}</p>
          </div>

          {/* Action Buttons */}
          <div className="bg-white px-6 pb-6 flex justify-end space-x-3">
            <button
              onClick={() => handleDismiss('later_button')}
              className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              나중에
            </button>
            <button
              onClick={() => handleDismiss('confirm_button')}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-lg"
            >
              확인했습니다
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}