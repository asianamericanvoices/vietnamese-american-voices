// 1. First, create lib/sharing.js (create this new file)
// File: lib/sharing.js

export const generateShareUrl = (platform, articleId, articleTitle) => {
  const baseUrl = `${window.location.origin}/article/${articleId}`;
  const utmParams = new URLSearchParams({
    utm_source: platform,
    utm_medium: 'social',
    utm_campaign: 'article_share',
    utm_content: articleId,
    utm_term: encodeURIComponent(articleTitle.substring(0, 50))
  });
  
  return `${baseUrl}?${utmParams.toString()}`;
};

// Track share event to both GA4 and Supabase
export const trackShare = async (platform, articleId, articleTitle, success = true) => {
  const shareData = {
    method: platform,
    content_type: 'article',
    item_id: articleId,
    content_title: articleTitle,
    share_url: generateShareUrl(platform, articleId, articleTitle),
    success: success
  };

  // Use our global tracking function
  if (typeof window.trackEvent === 'function') {
    await window.trackEvent('share', shareData);
  }
};

// WeChat sharing with native support
export const shareToWeChat = async (articleId, title, imageUrl = null) => {
  const shareUrl = generateShareUrl('wechat', articleId, title);
  
  try {
    // Track the share attempt
    await trackShare('wechat', articleId, title);
    
    // Check if we're in WeChat browser
    const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
    const isWeChatWork = /wxwork/i.test(navigator.userAgent);
    
    if (isWeChat && !isWeChatWork) {
      // Native WeChat sharing (requires WeChat JS-SDK setup)
      if (window.wx && window.wx.ready) {
        window.wx.ready(() => {
          // Share to timeline
          window.wx.onMenuShareTimeline({
            title: title,
            link: shareUrl,
            imgUrl: imageUrl || `${window.location.origin}/og-image.jpg`,
            success: () => trackShare('wechat_timeline', articleId, title, true),
            cancel: () => trackShare('wechat_timeline', articleId, title, false)
          });
          
          // Share to chat
          window.wx.onMenuShareAppMessage({
            title: title,
            desc: title.substring(0, 100),
            link: shareUrl,
            imgUrl: imageUrl || `${window.location.origin}/og-image.jpg`,
            success: () => trackShare('wechat_chat', articleId, title, true),
            cancel: () => trackShare('wechat_chat', articleId, title, false)
          });
        });
        
        alert('请点击右上角菜单分享到微信 (Please use the menu to share to WeChat)');
      } else {
        // Fallback: copy URL
        await navigator.clipboard.writeText(shareUrl);
        alert('链接已复制，请在微信中分享 (Link copied, please share in WeChat)');
      }
    } else {
      // Not in WeChat: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert('链接已复制，请在微信中分享 (Link copied, please share in WeChat)');
    }
    
    return true;
  } catch (error) {
    console.error('WeChat share error:', error);
    await trackShare('wechat', articleId, title, false);
    return false;
  }
};

// WhatsApp sharing
export const shareToWhatsApp = async (articleId, title) => {
  const shareUrl = generateShareUrl('whatsapp', articleId, title);
  const message = encodeURIComponent(`${title}\n\n${shareUrl}\n\n来自美华之声 (From Chinese American Voices)`);
  
  try {
    await trackShare('whatsapp', articleId, title);
    
    // Check if mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile: use WhatsApp app
      window.open(`whatsapp://send?text=${message}`, '_blank');
    } else {
      // Desktop: use WhatsApp Web
      window.open(`https://web.whatsapp.com/send?text=${message}`, '_blank');
    }
    
    return true;
  } catch (error) {
    console.error('WhatsApp share error:', error);
    await trackShare('whatsapp', articleId, title, false);
    return false;
  }
};

// Facebook sharing
export const shareToFacebook = async (articleId, title) => {
  const shareUrl = generateShareUrl('facebook', articleId, title);
  
  try {
    await trackShare('facebook', articleId, title);
    
    // Use Facebook Share Dialog
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`;
    
    // Open in popup
    const popup = window.open(
      facebookUrl,
      'facebook-share',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    );
    
    // Track if popup was blocked
    if (!popup) {
      await trackShare('facebook', articleId, title, false);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Facebook share error:', error);
    await trackShare('facebook', articleId, title, false);
    return false;
  }
};

// Twitter/X sharing
export const shareToTwitter = async (articleId, title) => {
  const shareUrl = generateShareUrl('twitter', articleId, title);
  const tweetText = encodeURIComponent(`${title.substring(0, 200)}... #ChineseAmerican #AAPI`);
  
  try {
    await trackShare('twitter', articleId, title);
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(shareUrl)}`;
    
    const popup = window.open(
      twitterUrl,
      'twitter-share',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    );
    
    if (!popup) {
      await trackShare('twitter', articleId, title, false);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Twitter share error:', error);
    await trackShare('twitter', articleId, title, false);
    return false;
  }
};

// Email sharing
export const shareToEmail = async (articleId, title, summary = '') => {
  const shareUrl = generateShareUrl('email', articleId, title);
  
  try {
    await trackShare('email', articleId, title);
    
    const subject = encodeURIComponent(`重要新闻: ${title}`);
    const body = encodeURIComponent(`我想与您分享这篇重要的新闻文章:\n\n${title}\n\n${summary.substring(0, 200)}...\n\n阅读全文: ${shareUrl}\n\n来自美华之声 (Chinese American Voices)`);
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    
    return true;
  } catch (error) {
    console.error('Email share error:', error);
    await trackShare('email', articleId, title, false);
    return false;
  }
};

// Copy link sharing
export const copyToClipboard = async (articleId, title) => {
  const shareUrl = generateShareUrl('copy', articleId, title);
  
  try {
    await navigator.clipboard.writeText(shareUrl);
    await trackShare('copy', articleId, title);
    
    // Show success message
    alert('链接已复制到剪贴板 (Link copied to clipboard)');
    
    return true;
  } catch (error) {
    console.error('Copy link error:', error);
    await trackShare('copy', articleId, title, false);
    
    // Fallback: select and copy
    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    alert('链接已复制到剪贴板 (Link copied to clipboard)');
    return true;
  }
};

// KakaoTalk sharing
export const shareToKakaoTalk = async (articleId, title, imageUrl = null) => {
  const shareUrl = generateShareUrl('kakaotalk', articleId, title);
  
  try {
    await trackShare('kakaotalk', articleId, title);
    
    // Check if we're in KakaoTalk browser
    const isKakaoTalk = /KAKAOTALK/i.test(navigator.userAgent);
    
    if (isKakaoTalk) {
      // Native KakaoTalk sharing (requires Kakao JS SDK setup)
      if (window.Kakao && window.Kakao.Link) {
        window.Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title: title,
            description: title.substring(0, 100),
            imageUrl: imageUrl || `${window.location.origin}/og-image.jpg`,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl
            }
          },
          buttons: [
            {
              title: '기사 읽기',
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
              }
            }
          ],
          success: () => trackShare('kakaotalk_native', articleId, title, true),
          fail: (error) => {
            console.error('KakaoTalk native share failed:', error);
            trackShare('kakaotalk_native', articleId, title, false);
          }
        });
      } else {
        // Fallback: copy URL for KakaoTalk
        await navigator.clipboard.writeText(shareUrl);
        alert('링크가 복사되었습니다. 카카오톡에서 공유해주세요 (Link copied, please share in KakaoTalk)');
      }
    } else {
      // Not in KakaoTalk: open KakaoTalk share URL
      const message = encodeURIComponent(`${title}\n\n${shareUrl}\n\n한미목소리에서`);
      const kakaoUrl = `kakaotalk://share?text=${message}`;
      
      // Try to open KakaoTalk app
      const userAgent = navigator.userAgent;
      if (/Android|iPhone|iPad|iPod/i.test(userAgent)) {
        // Mobile: try to open KakaoTalk app
        window.location.href = kakaoUrl;
        
        // Fallback: copy to clipboard after a delay
        setTimeout(async () => {
          try {
            await navigator.clipboard.writeText(shareUrl);
            alert('카카오톡 앱이 없다면 링크가 복사되었습니다 (Link copied if KakaoTalk app not available)');
          } catch (e) {
            console.error('Clipboard fallback failed:', e);
          }
        }, 1000);
      } else {
        // Desktop: copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert('링크가 복사되었습니다. 모바일 카카오톡에서 공유해주세요 (Link copied, please share on mobile KakaoTalk)');
      }
    }
    
    return true;
  } catch (error) {
    console.error('KakaoTalk share error:', error);
    await trackShare('kakaotalk', articleId, title, false);
    return false;
  }
};

// Native Web Share API (if available)
export const nativeShare = async (articleId, title, summary = '') => {
  if (!navigator.share) {
    return false;
  }
  
  const shareUrl = generateShareUrl('native', articleId, title);
  
  try {
    await trackShare('native', articleId, title);
    
    await navigator.share({
      title: title,
      text: summary.substring(0, 100),
      url: shareUrl
    });
    
    return true;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Native share error:', error);
      await trackShare('native', articleId, title, false);
    }
    return false;
  }
};
