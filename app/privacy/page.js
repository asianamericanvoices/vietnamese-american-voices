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
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                <span className="text-white font-bold text-[7px] leading-none">Tiếng Nói</span>
                <span className="text-white font-bold text-[7px] leading-none">Người Mỹ</span>
                <span className="text-white font-bold text-[7px] leading-none">Gốc Việt</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Tiếng Nói Người Mỹ Gốc Việt
                </h1>
                <p className="text-xs text-gray-500">Vietnamese American Voices</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <a
                href="mailto:contact@tiengnoinguoimygocviet.us"
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
            <span className="text-gray-900">Chính sách bảo mật</span>
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
              Chính Sách Bảo Mật
            </h1>
            <p className="text-xl text-gray-600">
              Bảo vệ quyền riêng tư của bạn là trách nhiệm hàng đầu của chúng tôi
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Cập nhật lần cuối: Tháng 1, 2025
            </p>
          </header>

          {/* Privacy Commitment */}
          <div className="bg-yellow-50 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Cam kết bảo mật của chúng tôi</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Tiếng Nói Người Mỹ Gốc Việt (Vietnamese American Voices) cam kết bảo vệ quyền riêng tư của người dùng. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân. Chúng tôi tuân thủ nghiêm ngặt các luật bảo mật liên quan như Đạo luật Bảo mật Người tiêu dùng California (CCPA), Đạo luật Bảo mật Colorado (CPA), và Quy định Bảo vệ Dữ liệu Chung (GDPR).
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-8 h-8 text-yellow-600 mr-3" />
              Thông tin chúng tôi thu thập
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Thông tin thu thập tự động</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Dữ liệu truy cập:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành, thời gian truy cập</li>
                  <li>• <strong>Sử dụng website:</strong> Các trang đã truy cập, thời gian lưu lại, hành vi nhấp chuột, độ sâu cuộn trang</li>
                  <li>• <strong>Thông tin thiết bị:</strong> Loại thiết bị, độ phân giải màn hình, cài đặt ngôn ngữ</li>
                  <li>• <strong>Nguồn tham chiếu:</strong> Liên kết và nền tảng mạng xã hội dẫn đến website của chúng tôi</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Thông tin bạn cung cấp trực tiếp</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Đăng ký bản tin:</strong> Địa chỉ email (khi bạn chọn đăng ký)</li>
                  <li>• <strong>Biểu mẫu liên hệ:</strong> Tên, email, nội dung tin nhắn</li>
                  <li>• <strong>Đóng góp tin tức:</strong> Thông tin tin tức và thông tin liên lạc bạn cung cấp</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Tương tác mạng xã hội</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Hành vi chia sẻ:</strong> Thống kê ẩn danh về việc chia sẻ bài viết lên các nền tảng như Zalo, Facebook, WhatsApp</li>
                  <li>• <strong>Nhận dạng nền tảng:</strong> Phát hiện nguồn truy cập (trình duyệt Zalo, liên kết mạng xã hội, v.v.)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="w-8 h-8 text-yellow-600 mr-3" />
              Mục đích sử dụng thông tin
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cải thiện website</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Tối ưu hóa nội dung và trải nghiệm người dùng thông qua phân tích hành vi</li>
                  <li>• Cung cấp tin tức phù hợp bằng cách hiểu sở thích của độc giả</li>
                  <li>• Khắc phục sự cố kỹ thuật và tối ưu hóa hiệu suất website</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cá nhân hóa nội dung</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Đề xuất bài viết liên quan dựa trên lịch sử đọc</li>
                  <li>• Tối ưu hóa trải nghiệm di động và máy tính</li>
                  <li>• Hỗ trợ đa ngôn ngữ và nội dung địa phương hóa</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dịch vụ bản tin</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Gửi bản tóm tắt tin tức và cập nhật quan trọng (chỉ cho người đăng ký)</li>
                  <li>• Phản hồi câu hỏi và đóng góp tin tức của người dùng</li>
                  <li>• Thông báo quan trọng và cập nhật chính sách website</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Bảo vệ an ninh</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Ngăn chặn tấn công độc hại và spam</li>
                  <li>• Tuân thủ yêu cầu pháp luật và quy định</li>
                  <li>• Bảo vệ an ninh website và người dùng</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="w-8 h-8 text-green-600 mr-3" />
              Bảo mật dữ liệu
            </h2>

            <div className="bg-green-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Truyền tải mã hóa:</strong> Chúng tôi sử dụng công nghệ mã hóa SSL/TLS để bảo vệ an ninh truyền tải dữ liệu.
                </p>

                <p>
                  <strong>Lưu trữ an toàn:</strong> Dữ liệu được lưu trữ trên máy chủ bảo mật tuân thủ tiêu chuẩn ngành với tường lửa và hệ thống phát hiện xâm nhập.
                </p>

                <p>
                  <strong>Kiểm soát truy cập:</strong> Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu người dùng và mọi truy cập đều được ghi nhận chi tiết.
                </p>

                <p>
                  <strong>Kiểm tra định kỳ:</strong> Chúng tôi thực hiện kiểm tra bảo mật và đánh giá lỗ hổng định kỳ để đảm bảo các biện pháp bảo vệ dữ liệu có hiệu quả.
                </p>

                <p>
                  <strong>Tối thiểu hóa dữ liệu:</strong> Chúng tôi chỉ thu thập thông tin cần thiết và xóa dữ liệu không cần thiết định kỳ.
                </p>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dịch vụ bên thứ ba</h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Google Analytics</h3>
                <p className="text-gray-700 mb-3">
                  Chúng tôi sử dụng Google Analytics để phân tích lưu lượng website và hành vi người dùng. Google có thể thu thập dữ liệu sử dụng ẩn danh.
                </p>
                <p className="text-sm text-gray-600">
                  Bạn có thể cài đặt <a href="https://tools.google.com/dlpage/gaoptout" className="text-yellow-600 hover:text-yellow-700" target="_blank" rel="noopener noreferrer">tiện ích chặn Google Analytics</a> để vô hiệu hóa việc thu thập dữ liệu.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Supabase</h3>
                <p className="text-gray-700">
                  Chúng tôi sử dụng Supabase làm nhà cung cấp dịch vụ cơ sở dữ liệu để lưu trữ nội dung bài viết và dữ liệu phân tích. Supabase tuân thủ tiêu chuẩn SOC 2 Type II.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Vercel</h3>
                <p className="text-gray-700">
                  Website được lưu trữ trên nền tảng Vercel, có thể thu thập nhật ký truy cập và dữ liệu hiệu suất để vận hành website.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quyền của bạn</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quyền truy cập</h3>
                <p className="text-gray-700 text-sm">
                  Bạn có quyền biết thông tin chúng tôi đã thu thập về bạn.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quyền chỉnh sửa</h3>
                <p className="text-gray-700 text-sm">
                  Bạn có thể yêu cầu sửa chữa thông tin cá nhân không chính xác.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quyền xóa</h3>
                <p className="text-gray-700 text-sm">
                  Bạn có thể yêu cầu xóa thông tin cá nhân trong phạm vi pháp luật cho phép.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quyền từ chối</h3>
                <p className="text-gray-700 text-sm">
                  Bạn có thể từ chối một số loại xử lý dữ liệu như thông tin tiếp thị.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Chính sách Cookie</h2>

            <div className="bg-yellow-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Chúng tôi sử dụng cookie và các công nghệ tương tự để cải thiện trải nghiệm duyệt web của bạn. Cookie được sử dụng cho các mục đích sau:
              </p>

              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Cung cấp chức năng website cơ bản</li>
                <li>• Ghi nhớ cài đặt của người dùng</li>
                <li>• Thu thập thống kê sử dụng ẩn danh</li>
                <li>• Cải thiện hiệu suất website</li>
              </ul>

              <p className="text-sm text-gray-600">
                Bạn có thể kiểm soát việc sử dụng cookie thông qua cài đặt trình duyệt. Vô hiệu hóa cookie có thể ảnh hưởng đến một số chức năng của website.
              </p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cập nhật chính sách</h2>
            <p className="text-gray-700 mb-4">
              Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Các thay đổi quan trọng sẽ được thông báo tại vị trí dễ thấy trên website và qua email cho người đăng ký.
            </p>
            <p className="text-gray-700">
              Việc tiếp tục sử dụng website được coi là đồng ý với Chính sách Bảo mật cập nhật.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Liên hệ với chúng tôi</h2>
            <p className="text-lg text-gray-700 mb-6">
              Nếu bạn có câu hỏi về Chính sách Bảo mật này hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:
            </p>

            <div className="space-y-2 text-gray-600">
              <p>Câu hỏi bảo mật: <a href="mailto:privacy@tiengnoinguoimygocviet.us" className="text-yellow-600 hover:text-yellow-700">privacy@tiengnoinguoimygocviet.us</a></p>
              <p>Liên hệ chung: <a href="mailto:contact@tiengnoinguoimygocviet.us" className="text-yellow-600 hover:text-yellow-700">contact@tiengnoinguoimygocviet.us</a></p>
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
                    Tiếng Nói Người Mỹ Gốc Việt
                  </h3>
                  <p className="text-sm text-gray-400">Vietnamese American Voices</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Truyền tải những câu chuyện quan trọng của cộng đồng Người Mỹ gốc Việt. Trang tin tức độc lập tập trung vào các vấn đề ảnh hưởng đến cộng đồng chúng ta.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Giới thiệu</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Sứ mệnh của chúng tôi</Link></li>
                <li><a href="mailto:contact@tiengnoinguoimygocviet.us" className="text-gray-400 hover:text-white">Liên hệ</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Chính sách bảo mật</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Điều khoản sử dụng</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 Tiếng Nói Người Mỹ Gốc Việt. Bảo lưu mọi quyền.
              <span className="text-xs opacity-70 ml-2">Thuộc Asian American Voices Media, Inc.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
