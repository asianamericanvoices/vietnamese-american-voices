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
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                <span className="text-white font-bold text-xs leading-none tracking-wide">Tiếng</span>
                <span className="text-white font-bold text-xs leading-none tracking-wide">Nói</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Tiếng Nói Việt Mỹ
                </h1>
                <p className="text-xs text-gray-500">Vietnamese American Voices</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <a
                href="mailto:contact@vietnameseamericanvoices.com"
                className="text-gray-700 hover:text-yellow-600 text-sm font-medium"
              >
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600 transition-colors">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-900">Sứ mệnh của chúng tôi</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </Link>
        </div>

        <article className="prose prose-lg max-w-none">
          {/* Page Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Sứ mệnh của chúng tôi
            </h1>
            <p className="text-xl text-gray-600">
              Truyền tải những câu chuyện quan trọng của cộng đồng người Mỹ gốc Việt
            </p>
          </header>

          {/* Mission Statement */}
          <div className="bg-yellow-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tuyên bố sứ mệnh</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Tiếng Nói Việt Mỹ cam kết cung cấp tin tức độc lập, chính xác và kịp thời cho cộng đồng người Mỹ gốc Việt. Chúng tôi tập trung vào các vấn đề quan trọng ảnh hưởng đến cộng đồng như chính trị, y tế và sức khỏe, giáo dục, nhập cư và chính sách kinh tế. Thông qua báo cáo chuyên nghiệp và phân tích chuyên sâu, chúng tôi nỗ lực nâng cao sự hiểu biết về trải nghiệm của người Mỹ gốc Việt trong và ngoài cộng đồng.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cộng đồng là trên hết</h3>
              <p className="text-gray-700">
                Chúng tôi luôn đặt nhu cầu và mối quan tâm của cộng đồng người Mỹ gốc Việt lên hàng đầu, đảm bảo nội dung đưa tin liên quan mật thiết đến cộng đồng.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Khách quan và công bằng</h3>
              <p className="text-gray-700">
                Chúng tôi tuân thủ các tiêu chuẩn chuyên nghiệp của báo chí, cung cấp tin tức cân bằng, chính xác và dựa trên sự thật, không bị ảnh hưởng bởi lợi ích chính trị hay thương mại.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Truyền thừa văn hóa</h3>
              <p className="text-gray-700">
                Chúng tôi tôn trọng và khuyến khích sự hòa quyện của văn hóa Việt Nam và các giá trị Mỹ, xây dựng đối thoại cộng đồng đa dạng và bao dung.
              </p>
            </div>
          </div>

          {/* What We Cover */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Trọng tâm đưa tin của chúng tôi</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chính trị và chính sách</h3>
                <p className="text-gray-700">
                  Chú trọng các thay đổi chính sách ảnh hưởng đến người Mỹ gốc Việt như luật nhập cư, chính sách giáo dục, cải cách y tế.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phát triển cộng đồng</h3>
                <p className="text-gray-700">
                  Đưa tin về thành tựu, thách thức và cơ hội phát triển của cộng đồng người Mỹ gốc Việt, khuyến khích giao tiếp và hợp tác trong cộng đồng.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Giáo dục và nghề nghiệp</h3>
                <p className="text-gray-700">
                  Đưa tin chuyên sâu về tài nguyên giáo dục, phát triển nghề nghiệp và cơ hội kinh tế, cung cấp thông tin thực tế cho các thành viên cộng đồng.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Văn hóa và đời sống</h3>
                <p className="text-gray-700">
                  Giới thiệu đời sống văn hóa phong phú và đa dạng cùng các hoạt động cộng đồng của người Mỹ gốc Việt, kế thừa và phát triển truyền thống tốt đẹp.
                </p>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cam kết của chúng tôi</h2>

            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Chính xác:</strong> Chúng tôi cam kết cung cấp thông tin chính xác và có thể xác minh, mọi bài đưa tin đều qua kiểm tra thực tế nghiêm ngặt.
              </p>

              <p>
                <strong>Độc lập:</strong> Chúng tôi duy trì tính độc lập biên tập, không bị ảnh hưởng bởi bất kỳ tổ chức chính trị, lợi ích thương mại hay áp lực bên ngoài nào.
              </p>

              <p>
                <strong>Minh bạch:</strong> Chúng tôi duy trì chính sách biên tập và quy trình sửa chữa công khai, minh bạch, đảm bảo tính chính xác và đáng tin cậy của tin tức.
              </p>

              <p>
                <strong>Lắng nghe:</strong> Chúng tôi tích cực lắng nghe tiếng nói của cộng đồng, hoan nghênh phản hồi từ độc giả và nỗ lực cải thiện tin tức và dịch vụ.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Liên hệ với chúng tôi</h2>
            <p className="text-lg text-gray-700 mb-6">
              Nếu bạn có tin tức, ý kiến, đề xuất hoặc muốn hợp tác, xin hãy liên hệ với chúng tôi bất cứ lúc nào.
            </p>

            <div className="space-y-2 text-gray-600">
              <p>Email: <a href="mailto:contact@vietnameseamericanvoices.com" className="text-yellow-600 hover:text-yellow-700">contact@vietnameseamericanvoices.com</a></p>
              <p>Gửi tin: <a href="mailto:tips@vietnameseamericanvoices.com" className="text-yellow-600 hover:text-yellow-700">tips@vietnameseamericanvoices.com</a></p>
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
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <span className="text-white font-bold text-xs leading-none tracking-wide">Tiếng</span>
                  <span className="text-white font-bold text-xs leading-none tracking-wide">Nói</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Tiếng Nói Việt Mỹ
                  </h3>
                  <p className="text-sm text-gray-400">Vietnamese American Voices</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Truyền tải những câu chuyện quan trọng của cộng đồng người Mỹ gốc Việt. Trang tin độc lập tập trung vào các vấn đề ảnh hưởng đến cộng đồng.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Giới thiệu</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Sứ mệnh của chúng tôi</Link></li>
                <li><a href="mailto:contact@vietnameseamericanvoices.com" className="text-gray-400 hover:text-white">Liên hệ</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Chính sách bảo mật</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Điều khoản sử dụng</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 Tiếng Nói Việt Mỹ. Bảo lưu mọi quyền.
              <span className="text-xs opacity-70 ml-2">Thuộc Asian American Voices Media, Inc.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
