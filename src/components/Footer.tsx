import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">Giftie</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Chuyên cung cấp các sản phẩm lưu niệm đặc trưng từ các vùng miền Việt Nam. 
              Chất lượng cao, giá cả hợp lý, giao hàng toàn quốc.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="h-6 w-6 text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="h-6 w-6 text-xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="h-6 w-6 text-xl">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="h-5 w-5 text-gray-400 text-lg">📍</span>
                <span className="text-gray-300">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="h-5 w-5 text-gray-400 text-lg">📞</span>
                <span className="text-gray-300">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="h-5 w-5 text-gray-400 text-lg">✉️</span>
                <span className="text-gray-300">info@giftie.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Giftie. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 