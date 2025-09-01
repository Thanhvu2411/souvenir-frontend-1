export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Về chúng tôi</h1>
          <p className="text-xl text-gray-600">
            Giftie - Nơi lưu giữ những kỷ niệm đẹp của Việt Nam
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh của chúng tôi</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Giftie được thành lập với sứ mệnh mang đến cho du khách và người dân Việt Nam 
            những sản phẩm lưu niệm chất lượng cao, thể hiện văn hóa và bản sắc dân tộc Việt Nam. 
            Chúng tôi tin rằng mỗi sản phẩm không chỉ là một món quà, mà còn là cầu nối văn hóa 
            giữa các vùng miền và quốc gia.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🌿</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chất lượng</h3>
            <p className="text-gray-600">
              Cam kết cung cấp sản phẩm chất lượng cao, được làm thủ công tinh xảo với nguyên liệu tốt nhất.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🏺</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Văn hóa</h3>
            <p className="text-gray-600">
              Bảo tồn và phát huy giá trị văn hóa truyền thống Việt Nam thông qua các sản phẩm độc đáo.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🤝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Uy tín</h3>
            <p className="text-gray-600">
              Xây dựng niềm tin với khách hàng thông qua dịch vụ chăm sóc tận tâm và sản phẩm đáng tin cậy.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Câu chuyện của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Giftie được thành lập vào năm 2020, bắt nguồn từ tình yêu sâu sắc với văn hóa 
                và con người Việt Nam. Chúng tôi nhận thấy rằng du khách quốc tế và người dân Việt Nam 
                đang tìm kiếm những sản phẩm lưu niệm có ý nghĩa, thể hiện được bản sắc văn hóa độc đáo 
                của từng vùng miền.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Từ những sản phẩm thủ công mỹ nghệ truyền thống đến những thiết kế hiện đại lấy cảm hứng 
                từ văn hóa Việt Nam, chúng tôi đã và đang nỗ lực mang đến cho khách hàng những trải nghiệm 
                mua sắm tuyệt vời nhất.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Thống kê ấn tượng</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Khách hàng hài lòng</span>
                  <span className="font-bold">10,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Sản phẩm đa dạng</span>
                  <span className="font-bold">500+</span>
                </div>
                <div className="flex justify-between">
                  <span>Vùng miền phủ sóng</span>
                  <span className="font-bold">63 tỉnh thành</span>
                </div>
                <div className="flex justify-between">
                  <span>Năm kinh nghiệm</span>
                  <span className="font-bold">4+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Đội ngũ của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nguyễn Văn A</h3>
              <p className="text-gray-600 mb-2">Giám đốc điều hành</p>
              <p className="text-sm text-gray-500">
                Chuyên gia về văn hóa Việt Nam với 15 năm kinh nghiệm trong lĩnh vực thương mại.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trần Thị B</h3>
              <p className="text-gray-600 mb-2">Trưởng phòng thiết kế</p>
              <p className="text-sm text-gray-500">
                Nghệ nhân thủ công với tài năng sáng tạo và đam mê bảo tồn văn hóa truyền thống.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lê Văn C</h3>
              <p className="text-gray-600 mb-2">Trưởng phòng công nghệ</p>
              <p className="text-sm text-gray-500">
                Chuyên gia công nghệ với kinh nghiệm xây dựng nền tảng thương mại điện tử hiện đại.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Liên hệ với chúng tôi</h2>
          <p className="text-lg mb-6">
            Bạn có câu hỏi hoặc muốn tìm hiểu thêm về Giftie? 
            Hãy liên hệ với chúng tôi ngay hôm nay!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Liên hệ ngay
            </a>
            <a
              href="/products"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Khám phá sản phẩm
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
