'use client';
import { use, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Truck, CircleAlert } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { selectWalletBalance } from '../../session/index';
import { fetchProduct, buyProduct, selectPurchase } from '../application/purchase-slice';
import { EmptyState } from '../../../shared/ui/molecules';
import BuyButton from './BuyButton';
import SpecList from './SpecList';
import ResultDialog from './ResultDialog';

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  const { selected: p, order, status, error } = useAppSelector(selectPurchase);
  const balance = useAppSelector(selectWalletBalance);
  const loading = status === 'loading-detail' || status === 'idle';
  const busy = status === 'buying';
  const done = order?.status;

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  return <><header><Link href="/" className="logo"><span className="orbit-mark">◉</span> orbit<span className="logo-dot">.</span></Link><nav><Link href="/" className="nav-active">Discover</Link></nav><div className="header-right"><span className="header-note">A little upgrade. A lot of possibility.</span><div className="avatar small">AM</div></div></header><main className="detail-main"><Link className="back-link" href="/"><ArrowLeft size={16}/> Back to discover</Link>{loading ? <div className="loading">A closer look is on its way…</div> : !p ? <div className="empty"><h1>Device not found.</h1><p role="alert">{error}</p><Link className="primary-button" href="/">Back to dashboard <ArrowRight size={17}/></Link></div> : <div className="detail-grid"><div><div className={'detail-art product-art ' + p.tone}><span className="badge">THE EVERYDAY, REIMAGINED</span><div className={'device ' + (p.type === 'Tablets' ? 'tablet' : '')}><div className="device-back"><div className={'cameras ' + (p.brand === 'Google' ? 'pixel' : '')}><i/><i/><i/></div><span className="device-brand">{p.brand === 'Apple' ? '●' : p.brand === 'Google' ? 'G' : 'SAMSUNG'}</span></div><div className="device-front"><div className="dynamic-island"/><div className="wallpaper"/></div></div><span className="art-caption">Designed for your everyday.</span></div><p className="illustration-note">Illustrative device preview. Specifications are demo data.</p></div><div className="detail-copy"><div className="eyebrow">{p.brand} / {p.type}</div><h1>{p.name}</h1><p className="description">A little more possibility in your hands. Beautifully designed, effortlessly powerful, and ready for whatever your day brings.</p><div className="detail-price">${p.price.toLocaleString('en-US')} <span>USD · One-time payment</span></div><div className="divider"/><div className="option-label">COLOR <strong>{p.color}</strong></div><div className={'color-swatch ' + p.tone}><Check size={16}/></div><div className="option-label">STORAGE</div><div className="storage-option">{p.storage}<Check size={15}/></div><h2 className="spec-heading">Small details. Big difference.</h2><SpecList product={p} /><div className="in-stock"><span/> In stock. Ready for your next chapter.</div>{error && <p role="alert" className="error">{error}</p>}<BuyButton price={p.price} busy={busy} done={!!done} onBuy={() => dispatch(buyProduct())} /><p className="purchase-note">Demo purchase · No payment or personal details needed</p><div className="detail-perks"><span><Truck size={16}/> Free shipping</span><span><ShieldCheck size={16}/> 1-year warranty</span></div></div></div>}</main><footer><Link href="/" className="logo">◉ orbit.</Link><span>A better everyday starts here.</span><span className="footer-end">A demo store, made for learning.</span></footer>{order && p && order.status !== 'out_of_stock' && <ResultDialog status={order.status} orderId={order.status === 'success' ? order.order_id : undefined} productName={p.name} productPrice={p.price} balance={balance} />}</>;
}
