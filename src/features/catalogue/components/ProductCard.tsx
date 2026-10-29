import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DeviceArt } from './DeviceArt';
import { Price } from '@/shared/ui/atoms/Price';

export function ProductCard({ product: p }: { product: any }) {
    return (
        <Link className="product-card" href={'/product/' + p.id}>
            <DeviceArt p={p} />
            <div className="product-copy">
                <span className="brand">
                    {p.brand} <span> / {p.type === 'Tablets' ? 'Tablet' : 'Smartphone'}</span>
                </span>
                <h3>{p.name}</h3>
                <p>{p.storage} <span>·</span> {p.color}</p>
                <div className="product-bottom">
                    <Price amount={p.priceLabel} />
                    <span className="circle-arrow"><ArrowUpRight size={19} /></span>
                </div>
            </div>
        </Link>
    );
}
