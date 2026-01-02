// app/api/published-articles/route.js - Vietnamese American Voices
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Optional Supabase integration - connects to your existing dashboard database
let supabase = null;
try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    console.log('✅ Supabase connected to Vietnamese American Voices');
  } else {
    console.log('📁 No Supabase credentials - using mock data');
  }
} catch (error) {
  console.log('📁 Supabase not available, using mock data');
  supabase = null;
}

export async function GET(request) {
  const url = new URL(request.url);
  const language = url.searchParams.get('language') || 'vietnamese';
  const category = url.searchParams.get('category') || 'all';
  const limit = parseInt(url.searchParams.get('limit')) || 25;
  const offset = parseInt(url.searchParams.get('offset')) || 0;
  const targetedEvent = url.searchParams.get('targeted_event') || null;

  try {
    let articles = [];

    if (supabase) {
      // Fetch from your actual dashboard database
      console.log('📊 Fetching published articles from Supabase...');

      let query = supabase
        .from('articles')
        .select(`
          id,
          original_title,
          ai_title,
          display_title,
          ai_summary,
          translations,
          translated_titles,
          social_caption,
          source,
          author,
          scraped_date,
          published_date,
          topic,
          priority,
          relevance_score,
          image_url,
          image_source,
          image_attribution,
          original_url,
          status,
          is_hero,
          is_vietnamese_hero,
          targeted_event,
          is_event_hero,
          event_hero_for,
          additional_sources,
          vietnamese_audio_url,
          vietnamese_audio_duration,
          vietnamese_audio_generated_at
        `)
        .eq('status', 'published');

      // Apply category filter BEFORE pagination
      if (category !== 'all') {
        query = query.eq('topic', category);
      }

      // Filter by targeted event if specified
      if (targetedEvent) {
        query = query.eq('targeted_event', targetedEvent);
      } else {
        // VAV SPECIFIC: Filter out International News, Vietnam-US Relations, and Event Explainers categories
        // These categories are hidden from the VAV site per content strategy
        // Event Explainers are only shown when pinned as event heroes
        // Only apply this filter when NOT filtering by event (event pages show all event content)
        query = query.not('topic', 'in', '("International News","China-US Relations","Vietnam-US Relations","Event Explainers")');
      }

      // Apply ordering after filtering - prioritize Vietnamese hero, then fallback to general hero, then chronological
      query = query
        .order('is_vietnamese_hero', { ascending: false })
        .order('is_hero', { ascending: false })
        .order('scraped_date', { ascending: false });

      // Apply pagination limits LAST
      if (offset > 0) {
        query = query.range(offset, offset + limit - 1);
      } else {
        query = query.range(0, limit - 1);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      // Transform to frontend format
      articles = data.map(article => ({
        id: article.id,
        originalTitle: article.original_title,
        aiTitle: article.ai_title,
        displayTitle: article.display_title,
        aiSummary: article.ai_summary,
        translations: parseJsonField(article.translations) || { chinese: null, korean: null, vietnamese: null },
        translatedTitles: parseJsonField(article.translated_titles) || { chinese: null, korean: null, vietnamese: null },
        socialCaptions: parseJsonField(article.social_caption) || { chinese: null, korean: null, vietnamese: null },
        source: article.source,
        author: article.author,
        publishedDate: article.scraped_date, // Use scraped_date for authentic news chronology
        internalPublishedDate: article.published_date, // Keep internal date for reference
        topic: article.topic,
        priority: article.priority,
        relevanceScore: article.relevance_score,
        imageUrl: article.image_url,
        imageSource: article.image_source,
        imageAttribution: article.image_attribution,
        originalUrl: article.original_url,
        isHero: article.is_hero || false,
        isVietnameseHero: article.is_vietnamese_hero || false,
        additionalSources: parseJsonField(article.additional_sources) || [],
        isEventHero: article.is_event_hero || false,
        eventHeroFor: article.event_hero_for,
        targetedEvent: article.targeted_event,
        audioUrl: article.vietnamese_audio_url,
        audioDuration: article.vietnamese_audio_duration,
        audioGeneratedAt: article.vietnamese_audio_generated_at,
        slug: generateSlug(article.original_title, article.id)
      }));

      console.log(`✅ Fetched ${articles.length} published articles from Supabase`);

      // Debug: Log ALL article dates to check for 2-day cutoff issue
      if (articles.length > 0) {
        console.log('🔍 DEBUG - All article dates:');
        articles.forEach((article, index) => {
          const daysDiff = Math.floor((new Date() - new Date(article.publishedDate || article.scrapedDate)) / (1000 * 60 * 60 * 24));
          console.log(`  ${index + 1}. ${article.originalTitle?.substring(0, 30)}... - ${article.publishedDate || article.scrapedDate} (${daysDiff} days ago) - Topic: ${article.topic}`);
        });
        console.log('Current server time:', new Date().toISOString());
      }
    } else {
      // Mock data for demo/development
      console.log('📋 Using mock data for development');
      articles = getMockArticles();
    }

    // Filter articles that have at least some translation content in the requested language
    const filteredArticles = articles.filter(article => {
      if (language === 'chinese') {
        // Require at least Chinese title OR summary translation (not both)
        const hasTranslations = article.translations?.chinese || article.translatedTitles?.chinese;
        return hasTranslations;
      } else if (language === 'korean') {
        // Require at least Korean title OR summary translation (not both)
        const hasTranslations = article.translations?.korean || article.translatedTitles?.korean;
        return hasTranslations;
      } else if (language === 'vietnamese') {
        // Require at least Vietnamese title OR summary translation (not both)
        const hasTranslations = article.translations?.vietnamese || article.translatedTitles?.vietnamese;
        return hasTranslations;
      }
      return true; // For English or no language preference
    });

    // Debug: Log what articles we're returning and their dates
    console.log(`🔍 DEBUG - Returning ${filteredArticles.length} articles for ${language}:`);
    filteredArticles.slice(0, 10).forEach(article => {
      console.log(`  - ${article.originalTitle?.substring(0, 40)}... (${article.publishedDate || article.scrapedDate})`);
    });

    const response = NextResponse.json({
      articles: filteredArticles,
      total: filteredArticles.length,
      language,
      category,
      timestamp: new Date().toISOString()
    });

    // Prevent caching to ensure fresh data from Supabase
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;

  } catch (error) {
    console.error('❌ Error fetching published articles:', error);

    // Fallback to mock data on error
    const mockArticles = getMockArticles();

    return NextResponse.json({
      articles: mockArticles,
      total: mockArticles.length,
      language,
      category,
      error: 'Using fallback data',
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to parse JSON fields from database
function parseJsonField(field) {
  if (!field) return null;
  if (typeof field === 'object') return field;
  try {
    return JSON.parse(field);
  } catch (e) {
    console.warn('Failed to parse JSON field:', field);
    return null;
  }
}

// Helper function to generate URL slugs
function generateSlug(title, id) {
  if (!title) return `article-${id}`;

  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .substring(0, 50)         // Limit length
    .replace(/-+$/, '');      // Remove trailing hyphens
}

function getMockArticles() {
  return [
    {
      id: 1,
      originalTitle: "Trump calls for U.S. census to exclude for the first time people with no legal status",
      displayTitle: "Trump kêu gọi điều tra dân số Mỹ loại trừ người không có giấy tờ",
      aiTitle: "Trump Proposes Historic Change to Census Counting",
      aiSummary: "President Trump announced plans for a 'new' census that would exclude people without legal status, renewing controversial efforts from his first administration. The 14th Amendment requires counting the 'whole number of persons in each state' for congressional representation, making this proposal constitutionally challenging.",
      translations: {
        chinese: "特朗普总统宣布了一项\"新\"人口普查计划，该计划将排除没有合法身份的人员，重新启动了他第一届政府的争议性努力。第十四修正案要求对\"每个州的全部人数\"进行计算，以确定国会代表权，这使得该提案在宪法上面临挑战。",
        korean: "트럼프 대통령은 합법적 신분이 없는 사람들을 제외하는 '새로운' 인구조사 계획을 발표했습니다.",
        vietnamese: "Tổng thống Trump đã công bố kế hoạch điều tra dân số \"mới\" sẽ loại trừ những người không có tình trạng pháp lý, khởi động lại nỗ lực gây tranh cãi từ nhiệm kỳ đầu tiên của ông. Tu chính án thứ 14 yêu cầu đếm \"toàn bộ số người\" trong mỗi tiểu bang để xác định đại diện Quốc hội."
      },
      translatedTitles: {
        chinese: "特朗普呼吁美国人口普查首次排除无合法身份人员",
        korean: "트럼프, 미국 인구조사에서 불법 체류자 첫 제외 요구",
        vietnamese: "Trump kêu gọi điều tra dân số Mỹ lần đầu tiên loại trừ người không có giấy tờ hợp pháp"
      },
      source: "NPR",
      author: "NPR Staff",
      publishedDate: "2025-08-07",
      topic: "Immigration",
      priority: "high",
      relevanceScore: 8.5,
      imageUrl: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=400&fit=crop",
      originalUrl: "https://www.npr.org/2025/08/07/nx-s1-5265650/new-census-trump-immigrants-counted",
      slug: "trump-calls-for-us-census-to-exclude-for-the-first-time"
    },
    {
      id: 2,
      originalTitle: "Immigrants who are crime victims and waiting for visas now face deportation",
      displayTitle: "Nạn nhân tội phạm nhập cư chờ visa đối mặt trục xuất",
      aiTitle: "Crime Victims With Pending Visas Targeted for Deportation",
      aiSummary: "Some immigrants who've applied for U visas as crime victims are being detained as part of the Trump administration's mass deportation campaign. The U visa program was designed to help victims of crimes cooperate with law enforcement, but new policies no longer protect applicants from removal proceedings.",
      translations: {
        chinese: "一些申请U签证的犯罪受害者移民正在被拘留，这是特朗普政府大规模驱逐行动的一部分。U签证项目旨在帮助犯罪受害者与执法部门合作，但新政策不再保护申请人免于驱逐程序。",
        korean: "트럼프 대통령은 합법적 신분이 없는 사람들을 제외하는 '새로운' 인구조사 계획을 발표했습니다.",
        vietnamese: "Một số nạn nhân tội phạm nhập cư đang nộp đơn xin visa U đang bị giam giữ, như một phần của chiến dịch trục xuất hàng loạt của chính quyền Trump. Chương trình visa U được thiết kế để giúp nạn nhân tội phạm hợp tác với cơ quan thực thi pháp luật, nhưng chính sách mới không còn bảo vệ người nộp đơn khỏi thủ tục trục xuất."
      },
      translatedTitles: {
        chinese: "等待签证的犯罪受害者移民现在面临驱逐",
        korean: "범죄 피해자이면서 비자를 기다리는 이민자들, 이제 추방 위기에 직면",
        vietnamese: "Nạn nhân tội phạm nhập cư đang chờ visa hiện đối mặt với trục xuất"
      },
      source: "NBC News",
      author: "NBC News Staff",
      publishedDate: "2025-08-07",
      topic: "Immigration",
      priority: "high",
      relevanceScore: 9.0,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      originalUrl: "https://www.nbcnews.com/news/latino/immigrants-u-visas-deportation-new-trump-rules-ice-rcna223480",
      slug: "immigrants-who-are-crime-victims-and-waiting-for-visas"
    },
    {
      id: 3,
      originalTitle: "Trump administration freezes $108M at Duke amid inquiry into alleged racial preferences",
      displayTitle: "Chính quyền Trump đóng băng 108 triệu đô la tại Duke",
      aiTitle: "Federal Funding Frozen at Duke Over Discrimination Claims",
      aiSummary: "The Trump administration froze $108 million in research funding to Duke University, accusing the school of racial discrimination through affirmative action policies. This follows similar actions against Harvard, Columbia, and Cornell as part of a broader campaign against diversity, equity and inclusion programs.",
      translations: {
        chinese: "特朗普政府冻结了杜克大学1.08亿美元的研究资金，指控该校通过平权行动政策进行种族歧视。这是继对哈佛、哥伦比亚和康奈尔采取类似行动之后，作为反对多元化、公平和包容项目的更广泛运动的一部分。",
        korean: "트럼프 대통령은 합법적 신분이 없는 사람들을 제외하는 '새로운' 인구조사 계획을 발표했습니다.",
        vietnamese: "Chính quyền Trump đã đóng băng 108 triệu đô la tài trợ nghiên cứu của Đại học Duke, cáo buộc trường phân biệt chủng tộc thông qua chính sách ưu đãi. Đây là động thái tiếp theo sau các hành động tương tự đối với Harvard, Columbia và Cornell, như một phần của chiến dịch rộng hơn chống lại các chương trình đa dạng, công bằng và hòa nhập."
      },
      translatedTitles: {
        chinese: "特朗普政府因调查涉嫌种族偏好冻结杜克大学1.08亿美元资金",
        korean: "트럼프 대통령은 합법적 신분이 없는 사람들을 제외하는 '새로운' 인구조사 계획을 발표했습니다.",
        vietnamese: "Chính quyền Trump đóng băng 108 triệu đô la tại Duke giữa cuộc điều tra về ưu đãi chủng tộc"
      },
      source: "AP News",
      author: "AP Staff",
      publishedDate: "2025-08-07",
      topic: "Education",
      priority: "medium",
      relevanceScore: 7.5,
      imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=400&fit=crop",
      originalUrl: "https://apnews.com/article/duke-university-funding-freeze-trump-dei-23a70359ee44a21fdc55bef6dfe52413",
      slug: "trump-administration-freezes-108m-at-duke-amid-inquiry"
    }
  ];
}
