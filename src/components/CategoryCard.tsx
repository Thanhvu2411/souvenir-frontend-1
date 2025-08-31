import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types/product';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.id}`}>
      <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Category Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
        </div>

        {/* Category Info */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-1">
              {category.name}
            </h3>
            <p className="text-sm opacity-90 mb-2 line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded text-black">
                {category.productCount} sản phẩm
              </span>
              <span className="text-xs font-medium">
                Xem tất cả →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 