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

export default function LocationPopup({ state, eventType }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userState, setUserState] = useState(null);
  const [votingStatus, setVotingStatus] = useState(null);

  // Get popup content based on state
  const getPopupContent = (detectedState) => {
    const content = {
      'GA': {
        title: 'Cử tri Georgia thân mến',
        subtitle: 'Thông tin Bầu cử Ủy ban Dịch vụ Công Georgia',
        resources: [
          {
            icon: Vote,
            title: 'Kiểm tra đăng ký cử tri',
            description: 'Kiểm tra tình trạng đăng ký của bạn',
            link: 'https://www.mvp.sos.ga.gov/MVP/mvp.do',
            linkText: 'Truy cập My Voter Page'
          },
          {
            icon: FileText,
            title: 'Đăng ký bỏ phiếu vắng mặt',
            description: 'Đăng ký bỏ phiếu qua bưu điện',
            link: 'https://ballotrequest.sos.ga.gov/',
            linkText: 'Đơn bỏ phiếu vắng mặt'
          },
          {
            icon: MapPin,
            title: 'Tìm điểm bỏ phiếu',
            description: 'Tìm điểm bỏ phiếu gần bạn',
            link: 'https://www.mvp.sos.ga.gov/MVP/mvp.do',
            linkText: 'Xem vị trí điểm bỏ phiếu'
          },
          {
            icon: Calendar,
            title: 'Ngày quan trọng',
            description: 'Ngày bầu cử: 4 tháng 11, 2025',
            dates: [
              'Hạn chót đăng ký cử tri: 6 tháng 10, 2025',
              'Bỏ phiếu sớm: 13 tháng 10 - 31 tháng 10, 2025',
              'Hạn chót đăng ký bỏ phiếu vắng mặt: 24 tháng 10, 2025'
            ]
          }
        ],
        footerMessage: 'Ủy ban Dịch vụ Công Georgia quản lý giá điện, gas và điện thoại. Lá phiếu của bạn ảnh hưởng trực tiếp đến chi phí dịch vụ công.'
      },
      'PA': {
        title: 'Cử tri Pennsylvania thân mến',
        subtitle: 'Thông tin Bầu cử Tái bổ nhiệm Tòa án Tối cao Pennsylvania',
        resources: [
          {
            icon: Vote,
            title: 'Kiểm tra đăng ký cử tri',
            description: 'Kiểm tra tình trạng đăng ký của bạn',
            link: 'https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx',
            linkText: 'Truy cập PA Voter Services'
          },
          {
            icon: FileText,
            title: 'Đăng ký bỏ phiếu qua bưu điện',
            description: 'Đăng ký bỏ phiếu qua bưu điện',
            link: 'https://www.pavoterservices.pa.gov/OnlineAbsenteeApplication/',
            linkText: 'Đơn bỏ phiếu qua bưu điện'
          },
          {
            icon: MapPin,
            title: 'Tìm điểm bỏ phiếu',
            description: 'Tìm điểm bỏ phiếu gần bạn',
            link: 'https://www.pavoterservices.pa.gov/pages/pollingplaceinfo.aspx',
            linkText: 'Xem vị trí điểm bỏ phiếu'
          },
          {
            icon: Calendar,
            title: 'Ngày quan trọng',
            description: 'Ngày bầu cử: 4 tháng 11, 2025',
            dates: [
              'Hạn chót đăng ký cử tri: 14 tháng 10, 2025',
              'Hạn chót đăng ký bỏ phiếu qua bưu điện: 28 tháng 10, 2025',
              'Hạn chót nộp phiếu qua bưu điện: 4 tháng 11, 2025 lúc 8 giờ tối'
            ]
          }
        ],
        footerMessage: 'Việc tái bổ nhiệm thẩm phán Tòa án Tối cao Pennsylvania là quyết định quan trọng để duy trì tính độc lập và công bằng của tư pháp.'
      },
      'CA': {
        title: 'Cử tri California thân mến',
        subtitle: 'Đề xuất số 50 - Thông tin Tái phân chia khu vực bầu cử',
        resources: [
          {
            icon: Vote,
            title: 'Kiểm tra đăng ký cử tri',
            description: 'Kiểm tra tình trạng đăng ký của bạn',
            link: 'https://voterstatus.sos.ca.gov/',
            linkText: 'Truy cập CA Voter Status'
          },
          {
            icon: FileText,
            title: 'Theo dõi phiếu bầu',
            description: 'Theo dõi phiếu bầu qua bưu điện của bạn',
            link: 'https://california.ballottrax.net/voter/',
            linkText: 'Where\'s My Ballot?'
          },
          {
            icon: Info,
            title: 'Thông tin Đề xuất số 50',
            description: 'Chi tiết về đề xuất tái phân chia khu vực bầu cử',
            link: 'https://voterguide.sos.ca.gov/quick-reference-guide/50.htm',
            linkText: 'Hướng dẫn cử tri chính thức'
          },
          {
            icon: MapPin,
            title: 'Tìm điểm bỏ phiếu',
            description: 'Tìm điểm bỏ phiếu gần bạn',
            link: 'https://www.sos.ca.gov/elections/polling-place',
            linkText: 'Xem vị trí điểm bỏ phiếu'
          },
          {
            icon: Calendar,
            title: 'Ngày quan trọng',
            description: 'Ngày bầu cử: 4 tháng 11, 2025',
            dates: [
              'Hạn chót đăng ký cử tri: 20 tháng 10, 2025',
              'Bắt đầu bỏ phiếu qua bưu điện: 6 tháng 10, 2025',
              'Hạn chót nộp phiếu qua bưu điện: 4 tháng 11, 2025 lúc 8 giờ tối'
            ]
          }
        ],
        footerMessage: 'Tái phân chia khu vực bầu cử là nền tảng của dân chủ, đảm bảo quyền đại diện công bằng.'
      },
      'NJ': {
        title: 'Cử tri New Jersey thân mến',
        subtitle: 'Thông tin Bầu cử Thống đốc New Jersey 2025',
        resources: [
          {
            icon: Vote,
            title: 'Kiểm tra đăng ký cử tri',
            description: 'Kiểm tra tình trạng đăng ký của bạn',
            link: 'https://voter.svrs.nj.gov/registration-check',
            linkText: 'Truy cập NJ Voter Registration'
          },
          {
            icon: FileText,
            title: 'Đăng ký bỏ phiếu qua bưu điện',
            description: 'Đăng ký Vote-by-Mail',
            link: 'https://www.nj.gov/state/elections/vote-by-mail.shtml',
            linkText: 'Đơn bỏ phiếu qua bưu điện'
          },
          {
            icon: MapPin,
            title: 'Tìm điểm bỏ phiếu',
            description: 'Tìm điểm bỏ phiếu gần bạn',
            link: 'https://voter.svrs.nj.gov/polling-place-search',
            linkText: 'Xem vị trí điểm bỏ phiếu'
          },
          {
            icon: Info,
            title: 'Thông tin ứng cử viên',
            description: 'Tìm hiểu về các ứng cử viên thống đốc',
            link: 'https://www.nj.gov/state/elections/',
            linkText: 'Trung tâm thông tin bầu cử'
          },
          {
            icon: Calendar,
            title: 'Ngày quan trọng',
            description: 'Ngày bầu cử: 4 tháng 11, 2025',
            dates: [
              'Hạn chót đăng ký cử tri: 14 tháng 10, 2025',
              'Hạn chót đăng ký bỏ phiếu qua bưu điện: 28 tháng 10, 2025',
              'Bỏ phiếu sớm: 25 tháng 10 - 2 tháng 11, 2025',
              'Hạn chót nộp phiếu qua bưu điện: 4 tháng 11, 2025 lúc 8 giờ tối'
            ]
          }
        ],
        footerMessage: 'Thống đốc New Jersey quyết định chính sách và ngân sách của tiểu bang. Hãy lên tiếng cho cộng đồng người Mỹ gốc Việt.'
      }
    };

    return content[detectedState] || null;
  };

  useEffect(() => {
    // Check for test mode FIRST
    const isTestMode = typeof window !== 'undefined' && window.location.search.includes('test=popup');

    // Check if popup was already dismissed (skip this check in test mode)
    const dismissedKey = `popup_dismissed_${state}_${eventType}`;
    const wasDismissed = localStorage.getItem(dismissedKey);

    if (wasDismissed && !isTestMode) {
      setIsLoading(false);
      return;
    }

    // Detect user location using IP geolocation
    const detectLocation = async () => {
      // Test mode - force show popup immediately
      if (isTestMode) {
        setUserState(state);
        setTimeout(() => {
          setIsVisible(true);
          trackPopupEvent('popup_shown', {
            user_state: state,
            event_type: eventType,
            auto_shown: false,
            test_mode: true
          });
        }, 1000);
        setIsLoading(false);
        return;
      }

      try {
        // Using ipapi.co free tier (no API key required, 1000 requests/day)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data && data.region_code) {
          setUserState(data.region_code);

          // Show popup if user is in the target state
          if (data.region_code === state) {
            setTimeout(() => {
              setIsVisible(true);
              trackPopupEvent('popup_shown', {
                user_state: state,
                event_type: eventType,
                auto_shown: true
              });
            }, 6000); // Show after 6 seconds
          }
        }
      } catch (error) {
        console.error('Error detecting location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, [state, eventType]);

  const handleDismiss = (dismissType = 'unknown') => {
    setIsVisible(false);
    // Remember dismissal in localStorage
    const dismissedKey = `popup_dismissed_${state}_${eventType}`;
    localStorage.setItem(dismissedKey, 'true');

    // Track dismissal
    trackPopupEvent('popup_dismissed', {
      user_state: state,
      event_type: eventType,
      dismiss_type: dismissType
    });
  };

  const handleLinkClick = (linkType, linkUrl, linkText) => {
    // Create English labels for dashboard display
    const englishLabels = {
      '유권자 등록 확인': 'Voter Registration Check',
      '부재자 투표 신청': 'Absentee Ballot Application',
      '우편 투표 신청': 'Mail Ballot Application',
      '투표소 찾기': 'Polling Place Finder',
      '투표용지 추적': 'Ballot Tracking',
      '제50호 발의안 정보': 'Proposition 50 Information',
      '발의안 정보': 'Proposition Information',
      '중요 일정': 'Important Dates'
    };

    // Include state prefix in the type for differentiation
    const stateSpecificType = `${state}_${englishLabels[linkType] || linkType}`;

    trackPopupEvent('popup_link_click', {
      user_state: state,
      event_type: eventType,
      link_type: stateSpecificType,
      link_type_vietnamese: linkType,
      link_url: linkUrl,
      link_text: linkText,
      link_text_english: `${state} - ${englishLabels[linkType] || linkType}`
    });
  };

  const handleVotingStatus = async (status) => {
    setVotingStatus(status);

    // Track the voting status response
    await trackPopupEvent('voting_status_response', {
      user_state: state,
      event_type: eventType,
      voting_status: status,
      response_time: new Date().toISOString()
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

  if (!isVisible || isLoading) return null;

  const content = getPopupContent(userState);
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