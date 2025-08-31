'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const banners = [
  {
    id: 1,
    title: 'Sản phẩm lưu niệm đặc trưng Việt Nam',
    subtitle: 'Khám phá văn hóa qua những món quà ý nghĩa',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop',
    cta: 'Mua ngay',
    link: '/products'
  },
  {
    id: 2,
    title: 'Giảm giá lên đến 50%',
    subtitle: 'Chương trình khuyến mãi đặc biệt cho mùa du lịch',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    cta: 'Xem ngay',
    link: '/products'
  },
  {
    id: 3,
    title: 'Giao hàng miễn phí toàn quốc',
    subtitle: 'Đơn hàng từ 500k được giao hàng miễn phí',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=400&fit=crop',
    cta: 'Tìm hiểu thêm',
    link: '/about'
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  {banner.subtitle}
                </p>
                <Link
                  href={banner.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  {banner.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
      >
        <span className="h-6 w-6 text-gray-800 text-xl">‹</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
      >
        <span className="h-6 w-6 text-gray-800 text-xl">›</span>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 