'use client';

import { use } from 'react';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import { ProductDetailPage } from '@/features/purchase';

export default function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <>
      <Header />
      <ProductDetailPage id={id} />
      <Footer />
    </>
  );
}
