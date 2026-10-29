'use client';
import { DetailPage } from '../../../features/purchase/index';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <DetailPage params={params} />;
}
