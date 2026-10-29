'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Package, ShieldCheck, Truck, CircleHelp } from 'lucide-react';
import { useAppDispatch } from '../shared/store/hooks';
import { UserBadge, fetchUser } from '../features/session/index';
import { CataloguePage } from '../features/catalogue/index';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return <><header><Link href="/" className="logo"><span className="orbit-mark">◉</span> orbit<span className="logo-dot">.</span></Link><nav><Link href="/" className="nav-active">Discover</Link></nav><div className="header-right"><span className="header-note">A little upgrade. A lot of possibility.</span><div className="avatar small">AM</div></div></header>
    <main>
      <UserBadge />
      <CataloguePage />
      <section className="benefits"><div><Truck/><span><strong>On its way, on us.</strong><small>Free shipping on every device</small></span></div><div><ShieldCheck/><span><strong>Peace of mind included.</strong><small>1-year warranty on all devices</small></span></div><div><Package/><span><strong>Find your perfect fit.</strong><small>Easy returns within 14 days</small></span></div></section>
    </main><footer><Link href="/" className="logo">◉ orbit.</Link><span>A better everyday starts here.</span><span className="footer-end"><CircleHelp size={14}/> A demo store, made for learning. <ArrowRight size={14}/></span></footer></>;
}
