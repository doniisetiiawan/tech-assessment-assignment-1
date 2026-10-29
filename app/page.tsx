'use client';

import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import Benefit from '@/shared/ui/Benefit';
import { UserBadge } from '@/features/session';
import { CataloguePage } from '@/features/catalogue';

export default function Dashboard() {
  return (
    <>
      <Header />
      <main>
        <UserBadge />
        <CataloguePage />
        <Benefit />
      </main>
      <Footer />
    </>
  );
}

