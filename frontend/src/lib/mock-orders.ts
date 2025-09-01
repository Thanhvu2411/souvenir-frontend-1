import { Order } from '@/types/product';
import { mockProducts } from './mock-data';

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    userId: '1',
    items: [
      {
        product: mockProducts[0],
        quantity: 2,
        price: 150000
      },
      {
        product: mockProducts[1],
        quantity: 1,
        price: 450000
      }
    ],
    totalItems: 3,
    subtotal: 750000,
    shippingFee: 0,
    totalAmount: 750000,
    paymentMethod: 'Chuyển khoản ngân hàng',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    shippingInfo: {
      fullName: 'Admin User',
      phone: '0123456789',
      address: '123 Đường ABC',
      city: 'Hà Nội',
      district: 'Ba Đình',
      ward: 'Phúc Xá'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-18'),
    estimatedDelivery: new Date('2024-01-20'),
    trackingNumber: 'VN123456789'
  },
  {
    id: 'ORD002',
    userId: '1',
    items: [
      {
        product: mockProducts[2],
        quantity: 1,
        price: 250000
      }
    ],
    totalItems: 1,
    subtotal: 250000,
    shippingFee: 0,
    totalAmount: 250000,
    paymentMethod: 'Thanh toán khi nhận hàng',
    paymentStatus: 'paid',
    orderStatus: 'shipping',
    shippingInfo: {
      fullName: 'Admin User',
      phone: '0123456789',
      address: '123 Đường ABC',
      city: 'Hà Nội',
      district: 'Ba Đình',
      ward: 'Phúc Xá'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22'),
    estimatedDelivery: new Date('2024-01-25'),
    trackingNumber: 'VN987654321'
  },
  {
    id: 'ORD003',
    userId: '2',
    items: [
      {
        product: mockProducts[3],
        quantity: 3,
        price: 120000
      },
      {
        product: mockProducts[4],
        quantity: 1,
        price: 380000
      }
    ],
    totalItems: 4,
    subtotal: 740000,
    shippingFee: 0,
    totalAmount: 740000,
    paymentMethod: 'Thẻ tín dụng/ghi nợ',
    paymentStatus: 'paid',
    orderStatus: 'confirmed',
    shippingInfo: {
      fullName: 'Nguyễn Văn A',
      phone: '0987654321',
      address: '456 Đường XYZ',
      city: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Bến Nghé'
    },
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: 'ORD004',
    userId: '2',
    items: [
      {
        product: mockProducts[5],
        quantity: 2,
        price: 280000
      }
    ],
    totalItems: 2,
    subtotal: 560000,
    shippingFee: 0,
    totalAmount: 560000,
    paymentMethod: 'Chuyển khoản ngân hàng',
    paymentStatus: 'pending',
    orderStatus: 'pending',
    shippingInfo: {
      fullName: 'Nguyễn Văn A',
      phone: '0987654321',
      address: '456 Đường XYZ',
      city: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Bến Nghé'
    },
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23')
  },
  {
    id: 'ORD005',
    userId: '3',
    items: [
      {
        product: mockProducts[6],
        quantity: 1,
        price: 130000
      },
      {
        product: mockProducts[7],
        quantity: 1,
        price: 420000
      },
      {
        product: mockProducts[8],
        quantity: 1,
        price: 260000
      }
    ],
    totalItems: 3,
    subtotal: 810000,
    shippingFee: 0,
    totalAmount: 810000,
    paymentMethod: 'Thanh toán khi nhận hàng',
    paymentStatus: 'paid',
    orderStatus: 'cancelled',
    shippingInfo: {
      fullName: 'Trần Thị B',
      phone: '0369852147',
      address: '789 Đường DEF',
      city: 'Đà Nẵng',
      district: 'Hải Châu',
      ward: 'Thạch Thang'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12')
  }
];
