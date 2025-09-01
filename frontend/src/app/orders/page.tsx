'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { mockOrders } from '@/lib/mock-orders';
import { Order } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Load orders from localStorage and mock data
    const loadOrders = () => {
      const localStorageOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = [...mockOrders, ...localStorageOrders].filter(
        (order: Order) => order.userId === user?.id
      );
      
      // Sort by creation date (newest first)
      userOrders.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setOrders(userOrders);
      setLoading(false);
    };

    loadOrders();
  }, [isAuthenticated, user?.id, router]);

  const handleCancelOrder = async (orderId: string) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?');
    if (!confirmed) return;

    setCancellingOrderId(orderId);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update order status in localStorage
      const localStorageOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = localStorageOrders.map((o: Order) => {
        if (o.id === orderId) {
          return { ...o, orderStatus: 'cancelled' as const, updatedAt: new Date() };
        }
        return o;
      });
      localStorage.setItem('orders', JSON.stringify(updatedOrders));

      // Update local state
      setOrders(prev => prev.map(o => 
        o.id === orderId 
          ? { ...o, orderStatus: 'cancelled', updatedAt: new Date() }
          : o
      ));

      alert('Đã hủy đơn hàng thành công!');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.');
    } finally {
      setCancellingOrderId(null);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Đơn hàng của tôi</h1>
          <p className="text-gray-600 mt-2">
            Quản lý và theo dõi đơn hàng của bạn
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bạn chưa có đơn hàng nào
            </h2>
            <p className="text-gray-600 mb-8">
              Hãy bắt đầu mua sắm để tạo đơn hàng đầu tiên của bạn
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Đơn hàng #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Đặt hàng lúc {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {getStatusText(order.orderStatus)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {getPaymentStatusText(order.paymentStatus)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.product.id}`}>
                            <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                              {item.product.name}
                            </h4>
                          </Link>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          Tổng cộng: <span className="font-medium text-gray-900">{order.totalItems} sản phẩm</span>
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(order.totalAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Phương thức: {order.paymentMethod}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-600">
                            Mã vận chuyển: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin giao hàng</h4>
                    <div className="text-sm text-gray-600">
                      <p><strong>{order.shippingInfo.fullName}</strong></p>
                      <p>{order.shippingInfo.phone}</p>
                      <p>{order.shippingInfo.address}</p>
                      <p>{order.shippingInfo.ward}, {order.shippingInfo.district}, {order.shippingInfo.city}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                    >
                      Xem chi tiết
                    </Link>
                    {order.orderStatus === 'delivered' && (
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Đánh giá sản phẩm
                      </button>
                    )}
                    {order.orderStatus === 'pending' && (
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingOrderId === order.id}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cancellingOrderId === order.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto mb-1"></div>
                            Đang hủy...
                          </>
                        ) : (
                          'Hủy đơn hàng'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
