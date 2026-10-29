'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge, Price, Icon } from '../../../shared/ui';
import type { CatalogueProduct } from '../model/filters';

export default function ProductCard({ product }: { product: CatalogueProduct }) {
  const p = product;
  return (
    <Link className="product-card" href={'/product/' + p.id}>
      <div className={'product-art ' + p.tone}>
        {p.tag && <Badge variant={p.tag === 'NEW ARRIVAL' ? 'green' : 'default'}>{p.tag}</Badge>}
        <div className={'device ' + (p.type === 'Tablets' ? 'tablet' : '')}>
          <div className="device-back">
            <div className={'cameras ' + (p.brand === 'Google' ? 'pixel' : '')}>
              <i /><i /><i />
            </div>
            <span className="device-brand">{p.brand === 'Apple' ? '●' : p.brand === 'Google' ? 'G' : 'SAMSUNG'}</span>
          </div>
          <div className="device-front">
            <div className="dynamic-island" />
            <div className="wallpaper" />
          </div>
        </div>
        <span className="art-caption">{p.color}</span>
      </div>
      <div className="product-copy">
        <span className="brand">{p.brand} <span> / {p.type === 'Tablets' ? 'Tablet' : 'Smartphone'}</span></span>
        <h3>{p.name}</h3>
        <p>{p.storage} <span>·</span> {p.color}</p>
        <div className="product-bottom">
          <Price amount={p.priceLabel} />
          <span className="circle-arrow"><Icon icon={ArrowUpRight} size={19} /></span>
        </div>
      </div>
    </Link>
  );
}
