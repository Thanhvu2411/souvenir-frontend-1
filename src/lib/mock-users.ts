import { User } from '@/types/auth';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@giftie.vn',
    name: 'Admin User',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'user@giftie.vn',
    name: 'Nguyễn Văn A',
    phone: '0987654321',
    address: 'TP. Hồ Chí Minh, Việt Nam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    email: 'customer@giftie.vn',
    name: 'Trần Thị B',
    phone: '0369852147',
    address: 'Đà Nẵng, Việt Nam',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

// Mock passwords for testing (in real app, these would be hashed)
export const mockPasswords: Record<string, string> = {
  'admin@giftie.vn': 'admin123',
  'user@giftie.vn': 'user123',
  'customer@giftie.vn': 'customer123'
};

