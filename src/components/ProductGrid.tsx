import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3"
      style={{ gap: 0 }}
    >
      {products.map((product) => (
        <div
          key={product.link}
          style={{ paddingLeft: '20px', paddingBottom: '40px' }}
        >
          <Link href={`/products/${product.link}`} className="group block">
            {/* Image container */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '1 / 1.3' }}
            >
              <Image
                src={product.imgSrc}
                alt={product.imgAlt ?? product.title}
                fill
                className="object-cover object-center"
              />
              {product.secondaryImgSrc && (
                <Image
                  src={product.secondaryImgSrc}
                  alt={product.imgAlt ?? product.title}
                  fill
                  className={cn(
                    'absolute inset-0 object-cover object-center',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  )}
                />
              )}
            </div>

            {/* Product meta */}
            <div style={{ marginTop: '12px' }}>
              <p
                style={{
                  fontSize: '14px',
                  fontFamily: 'var(--font-courier)',
                  color: '#171717',
                }}
              >
                {product.title}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontFamily: 'var(--font-courier)',
                  color: '#171717',
                  marginTop: '4px',
                }}
              >
                {product.price}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
