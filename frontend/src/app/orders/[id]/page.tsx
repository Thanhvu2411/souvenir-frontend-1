'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { mockOrders } from '@/lib/mock-orders';
import { Order } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderDetailPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const loadOrder = () => {
      // Load from localStorage first, then mock data
      const localStorageOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const allOrders = [...mockOrders, ...localStorageOrders];
      const foundOrder = allOrders.find((o: Order) => o.id === orderId);
      
      if (foundOrder && foundOrder.userId === user?.id) {
        setOrder(foundOrder);
      } else {
        // Order not found or doesn't belong to user
        router.push('/orders');
        return;
      }
      
      setLoading(false);
    };

    loadOrder();
  }, [isAuthenticated, orderId, user?.id, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipping':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipping':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ thanh toán';
      case 'paid':
        return 'Đã thanh toán';
      case 'failed':
        return 'Thanh toán thất bại';
      default:
        return status;
    }
  };

  const handleCancelOrder = async () => {
    if (!order || order.orderStatus !== 'pending') return;

    const confirmed = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?');
    if (!confirmed) return;

    setCancelling(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update order status in localStorage
      const localStorageOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = localStorageOrders.map((o: Order) => {
        if (o.id === order.id) {
          return { ...o, orderStatus: 'cancelled' as const, updatedAt: new Date() };
        }
        return o;
      });
      localStorage.setItem('orders', JSON.stringify(updatedOrders));

      // Update local state
      setOrder(prev => prev ? { ...prev, orderStatus: 'cancelled', updatedAt: new Date() } : null);

      alert('Đã hủy đơn hàng thành công!');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy đơn hàng</h2>
          <Link
            href="/orders"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
              <p className="text-gray-600 mt-2">
                Đơn hàng #{order.id}
              </p>
            </div>
            <Link
              href="/orders"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              ← Quay lại
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái đơn hàng</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                    {getStatusText(order.orderStatus)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {getPaymentStatusText(order.paymentStatus)}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Đặt hàng lúc: {formatDate(order.createdAt)}</p>
                {order.updatedAt && (
                  <p>Cập nhật lúc: {formatDate(order.updatedAt)}</p>
                )}
                {order.estimatedDelivery && (
                  <p>Dự kiến giao hàng: {formatDate(order.estimatedDelivery)}</p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm đã đặt</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Số lượng: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Đơn giá: {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin giao hàng</h2>
              <div className="space-y-2">
                <p><strong>Người nhận:</strong> {order.shippingInfo.fullName}</p>
                <p><strong>Số điện thoại:</strong> {order.shippingInfo.phone}</p>
                <p><strong>Địa chỉ:</strong> {order.shippingInfo.address}</p>
                <p><strong>Phường/Xã:</strong> {order.shippingInfo.ward}</p>
                <p><strong>Quận/Huyện:</strong> {order.shippingInfo.district}</p>
                <p><strong>Tỉnh/Thành phố:</strong> {order.shippingInfo.city}</p>
                {order.shippingInfo.note && (
                  <p><strong>Ghi chú:</strong> {order.shippingInfo.note}</p>
                )}
              </div>
            </div>

            {/* Tracking Information */}
            {order.trackingNumber && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin vận chuyển</h2>
                <div className="space-y-2">
                  <p><strong>Mã vận chuyển:</strong> {order.trackingNumber}</p>
                  <p className="text-sm text-gray-600">
                    Bạn có thể theo dõi đơn hàng của mình bằng mã vận chuyển trên.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="text-sm">
                  <p><strong>Phương thức thanh toán:</strong></p>
                  <p className="text-gray-600">{order.paymentMethod}</p>
                </div>
                
                <div className="text-sm">
                  <p><strong>Tổng sản phẩm:</strong></p>
                  <p className="text-gray-600">{order.totalItems} sản phẩm</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {order.orderStatus === 'pending' && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelling ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto mb-2"></div>
                        Đang hủy...
                      </>
                    ) : (
                      'Hủy đơn hàng'
                    )}
                  </button>
                )}
                
                {order.orderStatus === 'delivered' && (
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Đánh giá sản phẩm
                  </button>
                )}

                <Link
                  href="/products"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors block text-center"
                >
                  Mua thêm sản phẩm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
