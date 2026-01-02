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
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex flex-col items-center justify-center">
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
                href="mailto:contact@tiengnoivietmy.us"
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
            <span className="text-gray-900">Điều khoản sử dụng</span>
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
              Điều Khoản Sử Dụng
            </h1>
            <p className="text-xl text-gray-600">
              Điều khoản và điều kiện sử dụng website Tiếng Nói Người Mỹ Gốc Việt
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Cập nhật lần cuối: Tháng 1, 2025
            </p>
          </header>

          {/* Introduction */}
          <div className="bg-yellow-50 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Chấp nhận điều khoản</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cảm ơn bạn đã sử dụng website Tiếng Nói Người Mỹ Gốc Việt (Vietnamese American Voices). Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều khoản sử dụng sau đây. Nếu bạn không đồng ý với các điều khoản này, vui lòng không sử dụng website. Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào.
            </p>
          </div>

          {/* Acceptable Use */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-8 h-8 text-yellow-600 mr-3" />
              Sử dụng được phép
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Các hành vi được phép</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Đọc và chia sẻ nội dung cho mục đích cá nhân, phi thương mại</li>
                  <li>• Chia sẻ liên kết bài viết trên mạng xã hội (phải ghi nguồn)</li>
                  <li>• Trích dẫn nội dung bài viết cho nghiên cứu học thuật (phải ghi nguồn)</li>
                  <li>• Đăng ký nhận bản tin</li>
                  <li>• Liên hệ qua biểu mẫu liên hệ</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Các hành vi bị cấm</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Sao chép, phân phối hoặc chỉnh sửa nội dung trái phép</li>
                  <li>• Sử dụng nội dung cho mục đích thương mại (cần có sự cho phép bằng văn bản)</li>
                  <li>• Thu thập nội dung website hàng loạt bằng công cụ tự động</li>
                  <li>• Đăng tải nội dung sai sự thật, phỉ báng, ngôn từ thù hận hoặc bất hợp pháp</li>
                  <li>• Cố gắng phá hoại bảo mật website hoặc can thiệp vào hoạt động bình thường</li>
                  <li>• Mạo danh Tiếng Nói Người Mỹ Gốc Việt hoặc nhân viên</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Scale className="w-8 h-8 text-purple-600 mr-3" />
              Quyền sở hữu trí tuệ
            </h2>

            <div className="bg-purple-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Bảo vệ bản quyền:</strong> Tất cả nội dung trên website này (bài viết, hình ảnh, logo, thiết kế, v.v.) được bảo vệ bởi luật bản quyền. Không được sao chép hoặc phân phối mà không có sự cho phép bằng văn bản, ngoại trừ việc sử dụng hợp lý theo quy định pháp luật.
                </p>

                <p>
                  <strong>Nhãn hiệu:</strong> "Tiếng Nói Người Mỹ Gốc Việt", "Vietnamese American Voices" và các logo liên quan là nhãn hiệu đã đăng ký của chúng tôi. Cấm sử dụng trái phép.
                </p>

                <p>
                  <strong>Nội dung bên thứ ba:</strong> Chúng tôi tôn trọng quyền sở hữu trí tuệ của người khác. Nếu bạn cho rằng nội dung của chúng tôi vi phạm quyền của bạn, vui lòng liên hệ ngay.
                </p>

                <p>
                  <strong>Nội dung người dùng:</strong> Nội dung bạn cung cấp cho chúng tôi (bình luận, đóng góp tin tức, v.v.) vẫn thuộc quyền sở hữu của bạn, nhưng bạn cấp cho chúng tôi quyền sử dụng, chỉnh sửa và xuất bản.
                </p>
              </div>
            </div>
          </div>

          {/* Content and Accuracy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Độ chính xác nội dung</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Nỗ lực của chúng tôi</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Nỗ lực đảm bảo thông tin chính xác và kịp thời</li>
                  <li>• Tất cả bài viết đều qua quá trình biên tập kiểm tra</li>
                  <li>• Sửa chữa nhanh chóng các lỗi được phát hiện</li>
                  <li>• Tuân thủ tiêu chuẩn chuyên môn và đạo đức báo chí</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tuyên bố miễn trừ</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Thông tin có thể chứa lỗi hoặc nội dung lỗi thời</li>
                  <li>• Không cấu thành tư vấn chuyên môn (pháp lý, y tế, tài chính, v.v.)</li>
                  <li>• Nội dung liên kết ngoài không đại diện cho quan điểm của chúng tôi</li>
                  <li>• Người dùng nên tự xác minh thông tin quan trọng</li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Conduct */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quy tắc ứng xử người dùng</h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tôn trọng người khác</h3>
                <p className="text-gray-700">
                  Vui lòng giữ thái độ lịch sự và tôn trọng khi giao tiếp với chúng tôi. Chúng tôi không chấp nhận bất kỳ hình thức quấy rối, phân biệt đối xử hoặc ngôn từ thù hận nào.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Thông tin chính xác</h3>
                <p className="text-gray-700">
                  Vui lòng xác minh tính chính xác khi cung cấp tin tức hoặc thông tin liên lạc. Cung cấp thông tin sai lệch cố ý có thể dẫn đến hậu quả pháp lý.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tuân thủ pháp luật</h3>
                <p className="text-gray-700">
                  Khi sử dụng dịch vụ của chúng tôi, bạn phải tuân thủ tất cả các luật và quy định địa phương, tiểu bang, liên bang và quốc tế hiện hành.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy and Data */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quyền riêng tư và dữ liệu</h2>

            <div className="bg-yellow-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Các thực hành thu thập và sử dụng dữ liệu của chúng tôi được mô tả chi tiết trong <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700">Chính sách Bảo mật</Link>.
              </p>

              <p className="text-gray-700">
                Bằng việc sử dụng website này, bạn đồng ý với việc thu thập và sử dụng thông tin theo Chính sách Bảo mật.
              </p>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertCircle className="w-8 h-8 text-yellow-600 mr-3" />
              Tuyên bố miễn trừ trách nhiệm
            </h2>

            <div className="bg-red-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Cung cấp "như hiện trạng":</strong> Website và tất cả nội dung được cung cấp "như hiện trạng", không có bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý.
                </p>

                <p>
                  <strong>Không bảo đảm:</strong> Chúng tôi không đảm bảo website sẽ hoạt động không gián đoạn hoặc không có lỗi hay virus.
                </p>

                <p>
                  <strong>Liên kết bên thứ ba:</strong> Website của chúng tôi có thể chứa liên kết đến các website bên thứ ba. Chúng tôi không chịu trách nhiệm về nội dung hoặc thực hành bảo mật của các website đó.
                </p>

                <p>
                  <strong>Sự cố kỹ thuật:</strong> Website có thể tạm thời không truy cập được do lỗi kỹ thuật hoặc bảo trì. Chúng tôi sẽ cố gắng giảm thiểu các gián đoạn này.
                </p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Giới hạn trách nhiệm</h2>

            <div className="bg-gray-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Trong phạm vi tối đa được pháp luật cho phép, Tiếng Nói Người Mỹ Gốc Việt và nhân viên, đối tác không chịu trách nhiệm cho:
              </p>

              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Thiệt hại trực tiếp, gián tiếp, đặc biệt hoặc hậu quả do việc sử dụng hoặc không thể sử dụng website</li>
                <li>• Tổn thất do lỗi hoặc thiếu sót trong thông tin</li>
                <li>• Vấn đề do nội dung hoặc dịch vụ bên thứ ba</li>
                <li>• Mất dữ liệu hoặc lỗi hệ thống</li>
                <li>• Tổn thất do tấn công mạng hoặc sự cố kỹ thuật</li>
              </ul>

              <p className="text-sm text-gray-600">
                Một số khu vực pháp lý không cho phép giới hạn trách nhiệm, vì vậy các giới hạn trên có thể không áp dụng cho bạn.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Chấm dứt dịch vụ</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quyền của chúng tôi</h3>
                <p className="text-gray-700 text-sm">
                  Chúng tôi có quyền chấm dứt hoặc đình chỉ quyền sử dụng website của bạn bất cứ lúc nào mà không cần thông báo trước, đặc biệt trong trường hợp vi phạm các điều khoản này.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quyền của bạn</h3>
                <p className="text-gray-700 text-sm">
                  Bạn có thể ngừng sử dụng website của chúng tôi bất cứ lúc nào. Nếu bạn đã đăng ký dịch vụ, bạn có thể hủy đăng ký bất cứ lúc nào.
                </p>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Luật áp dụng</h2>

            <div className="bg-yellow-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Các Điều khoản Sử dụng này được điều chỉnh bởi luật pháp của Tiểu bang Colorado, không áp dụng nguyên tắc xung đột pháp luật. Tất cả các tranh chấp sẽ được giải quyết tại các tòa án ở Colorado.
              </p>

              <p className="text-gray-700">
                Nếu bất kỳ phần nào của các điều khoản này bị coi là vô hiệu hoặc không thể thi hành, các phần còn lại vẫn có hiệu lực đầy đủ.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Thay đổi điều khoản</h2>

            <div className="bg-green-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Chúng tôi có thể cập nhật các Điều khoản Sử dụng này theo thời gian. Các thay đổi quan trọng sẽ được thông báo tại vị trí dễ thấy trên website và qua email cho người đăng ký.
              </p>

              <p className="text-gray-700 mb-4">
                Các thay đổi có hiệu lực ngay sau khi đăng tải. Việc tiếp tục sử dụng website được coi là đồng ý với các điều khoản đã sửa đổi.
              </p>

              <p className="text-sm text-gray-600">
                Vui lòng kiểm tra trang này định kỳ để nắm bắt các thay đổi.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Liên hệ với chúng tôi</h2>
            <p className="text-lg text-gray-700 mb-6">
              Nếu bạn có câu hỏi về các Điều khoản Sử dụng này, vui lòng liên hệ:
            </p>

            <div className="space-y-2 text-gray-600">
              <p>Phụ trách pháp lý: <a href="mailto:legal@tiengnoivietmy.us" className="text-yellow-600 hover:text-yellow-700">legal@tiengnoivietmy.us</a></p>
              <p>Liên hệ chung: <a href="mailto:contact@tiengnoivietmy.us" className="text-yellow-600 hover:text-yellow-700">contact@tiengnoivietmy.us</a></p>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Cảm ơn bạn đã chọn Tiếng Nói Người Mỹ Gốc Việt. Chúng tôi cam kết mang đến dịch vụ tin tức chất lượng cho cộng đồng Người Mỹ gốc Việt.
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
                <li><a href="mailto:contact@tiengnoivietmy.us" className="text-gray-400 hover:text-white">Liên hệ</a></li>
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
