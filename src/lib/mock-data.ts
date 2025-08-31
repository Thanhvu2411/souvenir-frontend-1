import { Product, Category, PaymentMethod } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Móc khóa Hà Nội',
    description: 'Móc khóa đẹp với hình ảnh Hồ Hoàn Kiếm, chất liệu cao cấp',
    price: 150000,
    originalPrice: 200000,
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop'
    ],
    category: 'moc-khoa',
    tags: ['Hà Nội', 'Móc khóa', 'Quà tặng'],
    inStock: true,
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: '2',
    name: 'Túi xách Sapa',
    description: 'Túi xách thổ cẩm Sapa, thủ công mỹ nghệ',
    price: 450000,
    originalPrice: 600000,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop'
    ],
    category: 'tui-xach',
    tags: ['Sapa', 'Thổ cẩm', 'Túi xách'],
    inStock: true,
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'Áo thun Đà Nẵng',
    description: 'Áo thun với hình ảnh biển Đà Nẵng, chất liệu cotton 100%',
    price: 250000,
    originalPrice: 350000,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
    ],
    category: 'ao-thun',
    tags: ['Đà Nẵng', 'Áo thun', 'Biển'],
    inStock: true,
    rating: 4.3,
    reviewCount: 156
  },
  {
    id: '4',
    name: 'Móc khóa Hội An',
    description: 'Móc khóa với hình ảnh phố cổ Hội An về đêm',
    price: 120000,
    originalPrice: 180000,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    category: 'moc-khoa',
    tags: ['Hội An', 'Phố cổ', 'Móc khóa'],
    inStock: true,
    rating: 4.7,
    reviewCount: 203
  },
  {
    id: '5',
    name: 'Túi xách Huế',
    description: 'Túi xách với họa tiết hoa sen Huế, chất liệu vải lụa',
    price: 380000,
    originalPrice: 500000,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop'
    ],
    category: 'tui-xach',
    tags: ['Huế', 'Hoa sen', 'Lụa'],
    inStock: true,
    rating: 4.6,
    reviewCount: 67
  },
  {
    id: '6',
    name: 'Áo thun Sài Gòn',
    description: 'Áo thun với hình ảnh Landmark 81, chất liệu cotton cao cấp',
    price: 280000,
    originalPrice: 400000,
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop'
    ],
    category: 'ao-thun',
    tags: ['Sài Gòn', 'Landmark 81', 'Áo thun'],
    inStock: true,
    rating: 4.4,
    reviewCount: 134
  },
  {
    id: '7',
    name: 'Móc khóa Nha Trang',
    description: 'Móc khóa với hình ảnh biển Nha Trang xanh ngắt',
    price: 130000,
    originalPrice: 190000,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop'
    ],
    category: 'moc-khoa',
    tags: ['Nha Trang', 'Biển', 'Móc khóa'],
    inStock: true,
    rating: 4.2,
    reviewCount: 98
  },
  {
    id: '8',
    name: 'Túi xách Đà Lạt',
    description: 'Túi xách với họa tiết hoa dã quỳ Đà Lạt',
    price: 420000,
    originalPrice: 580000,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop'
    ],
    category: 'tui-xach',
    tags: ['Đà Lạt', 'Hoa dã quỳ', 'Túi xách'],
    inStock: true,
    rating: 4.9,
    reviewCount: 76
  },
  {
    id: '9',
    name: 'Áo thun Phú Quốc',
    description: 'Áo thun với hình ảnh biển Phú Quốc hoàng hôn',
    price: 260000,
    originalPrice: 380000,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    ],
    category: 'ao-thun',
    tags: ['Phú Quốc', 'Hoàng hôn', 'Áo thun'],
    inStock: true,
    rating: 4.5,
    reviewCount: 112
  },
  {
    id: '10',
    name: 'Móc khóa Cần Thơ',
    description: 'Móc khóa với hình ảnh chợ nổi Cái Răng',
    price: 110000,
    originalPrice: 170000,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    category: 'moc-khoa',
    tags: ['Cần Thơ', 'Chợ nổi', 'Móc khóa'],
    inStock: true,
    rating: 4.3,
    reviewCount: 87
  },
  {
    id: '11',
    name: 'Túi xách Côn Đảo',
    description: 'Túi xách với họa tiết biển Côn Đảo hoang dã',
    price: 480000,
    originalPrice: 650000,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop'
    ],
    category: 'tui-xach',
    tags: ['Côn Đảo', 'Biển', 'Túi xách'],
    inStock: true,
    rating: 4.7,
    reviewCount: 45
  },
  {
    id: '12',
    name: 'Áo thun Mũi Né',
    description: 'Áo thun với hình ảnh đồi cát Mũi Né',
    price: 240000,
    originalPrice: 360000,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    ],
    category: 'ao-thun',
    tags: ['Mũi Né', 'Đồi cát', 'Áo thun'],
    inStock: true,
    rating: 4.4,
    reviewCount: 93
  },
  {
    id: '13',
    name: 'Móc khóa Vũng Tàu',
    description: 'Móc khóa với hình ảnh tượng Chúa Kitô Vũng Tàu',
    price: 140000,
    originalPrice: 200000,
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop'
    ],
    category: 'moc-khoa',
    tags: ['Vũng Tàu', 'Tượng Chúa', 'Móc khóa'],
    inStock: true,
    rating: 4.1,
    reviewCount: 156
  },
  {
    id: '14',
    name: 'Túi xách Bà Rịa',
    description: 'Túi xách với họa tiết hoa sen Bà Rịa',
    price: 390000,
    originalPrice: 520000,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop'
    ],
    category: 'tui-xach',
    tags: ['Bà Rịa', 'Hoa sen', 'Túi xách'],
    inStock: true,
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: '15',
    name: 'Áo thun Long An',
    description: 'Áo thun với hình ảnh đồng lúa Long An',
    price: 220000,
    originalPrice: 320000,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
    ],
    category: 'ao-thun',
    tags: ['Long An', 'Đồng lúa', 'Áo thun'],
    inStock: true,
    rating: 4.3,
    reviewCount: 67
  },
  {
    id: '16',
    name: 'Móc khóa Tiền Giang',
    description: 'Móc khóa với hình ảnh cầu Rạch Miễu',
    price: 125000,
    originalPrice: 185000,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    category: 'moc-khoa',
    tags: ['Tiền Giang', 'Cầu Rạch Miễu', 'Móc khóa'],
    inStock: true,
    rating: 4.0,
    reviewCount: 89
  },
  {
    id: '17',
    name: 'Túi xách Bến Tre',
    description: 'Túi xách với họa tiết dừa Bến Tre',
    price: 410000,
    originalPrice: 550000,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop'
    ],
    category: 'tui-xach',
    tags: ['Bến Tre', 'Dừa', 'Túi xách'],
    inStock: true,
    rating: 4.5,
    reviewCount: 54
  },
  {
    id: '18',
    name: 'Áo thun Trà Vinh',
    description: 'Áo thun với hình ảnh chùa Vàm Ray',
    price: 230000,
    originalPrice: 340000,
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop'
    ],
    category: 'ao-thun',
    tags: ['Trà Vinh', 'Chùa Vàm Ray', 'Áo thun'],
    inStock: true,
    rating: 4.2,
    reviewCount: 43
  }
];

export const mockCategories: Category[] = [
  {
    id: 'moc-khoa',
    name: 'Móc khóa',
    description: 'Móc khóa đẹp từ các vùng miền Việt Nam',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=200&fit=crop',
    productCount: 3
  },
  {
    id: 'tui-xach',
    name: 'Túi xách',
    description: 'Túi xách thổ cẩm và thủ công mỹ nghệ',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=200&fit=crop',
    productCount: 3
  },
  {
    id: 'ao-thun',
    name: 'Áo thun',
    description: 'Áo thun với hình ảnh đặc trưng các vùng miền',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop',
    productCount: 3
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng',
    type: 'cod',
    icon: '💰',
    description: 'Thanh toán bằng tiền mặt khi nhận hàng'
  },
  {
    id: 'bank',
    name: 'Chuyển khoản ngân hàng',
    type: 'bank',
    icon: '🏦',
    description: 'Chuyển khoản qua tài khoản ngân hàng'
  },
  {
    id: 'card',
    name: 'Thẻ tín dụng/ghi nợ',
    type: 'card',
    icon: '💳',
    description: 'Thanh toán bằng thẻ Visa, Mastercard'
  }
]; 