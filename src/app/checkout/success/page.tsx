'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      // Get order from localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: any) => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Đặt hàng thành công!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Cảm ơn bạn đã mua sắm tại Souvenir Store. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.
          </p>

          {/* Order Details */}
          {order && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Chi tiết đơn hàng
              </h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="font-medium">{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Đang xử lý
                  </span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Thông tin giao hàng</h3>
                <div className="text-sm text-gray-600">
                  <p><strong>{order.shippingInfo.fullName}</strong></p>
                  <p>{order.shippingInfo.phone}</p>
                  <p>{order.shippingInfo.address}</p>
                  <p>{order.shippingInfo.ward}, {order.shippingInfo.district}, {order.shippingInfo.city}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/orders"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Xem đơn hàng của tôi
            </Link>
            <div>
              <Link
                href="/products"
                className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-sm text-gray-500">
            <p>Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.</p>
            <p>Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
