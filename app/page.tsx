'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Search, Smartphone, Tablet, LayoutGrid, Package, ShieldCheck, Truck, Sparkles, CircleHelp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { setProducts, setSearch, setCategory, setSort } from '../shared/store/catalogue-slice';
import { UserBadge, fetchUser } from '../features/session/index';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const s = useAppSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    // Product catalogue API still lives here (moved to features/catalogue in Phase 3).
    const productsApi = () => new Promise<any[]>(resolve => setTimeout(() => resolve([
      { id: '1', name: 'iPhone 16 Pro', brand: 'Apple', type: 'Smartphones', price: 999, color: 'Desert Titanium', tone: 'sand', tag: 'POPULAR', storage: '128 GB', screen: '6.3-inch', chip: 'A18 Pro', camera: '48 MP', battery: 'Up to 27 hours', os: 'iOS 18' },
      { id: '2', name: 'Galaxy S25 Ultra', brand: 'Samsung', type: 'Smartphones', price: 1299, color: 'Titanium Gray', tone: 'gray', tag: 'NEW ARRIVAL', storage: '256 GB', screen: '6.9-inch', chip: 'Snapdragon 8 Elite', camera: '200 MP', battery: '5,000 mAh', os: 'Android 15' },
      { id: '3', name: 'iPad Air', brand: 'Apple', type: 'Tablets', price: 599, color: 'Sky Blue', tone: 'blue', tag: '', storage: '128 GB', screen: '11-inch', chip: 'Apple M3', camera: '12 MP', battery: 'Up to 10 hours', os: 'iPadOS 18' },
      { id: '4', name: 'Pixel 9 Pro', brand: 'Google', type: 'Smartphones', price: 999, color: 'Sage', tone: 'sage', tag: '', storage: '128 GB', screen: '6.3-inch', chip: 'Google Tensor G4', camera: '50 MP', battery: '4,700 mAh', os: 'Android 14' },
      { id: '5', name: 'Galaxy Tab S10+', brand: 'Samsung', type: 'Tablets', price: 999, color: 'Moonstone Gray', tone: 'purple', tag: '', storage: '256 GB', screen: '12.4-inch', chip: 'Dimensity 9300+', camera: '13 MP', battery: '10,090 mAh', os: 'Android 14' },
      { id: '6', name: 'iPhone 16', brand: 'Apple', type: 'Smartphones', price: 799, color: 'Ultramarine', tone: 'indigo', tag: 'GREAT VALUE', storage: '128 GB', screen: '6.1-inch', chip: 'A18', camera: '48 MP', battery: 'Up to 22 hours', os: 'iOS 18' }
    ]), 750));
    Promise.all([dispatch(fetchUser()), productsApi().then(p => { if (alive) dispatch(setProducts(p.map(x => ({ ...x, priceLabel: '$' + x.price.toLocaleString('en-US') })))); })]).catch(() => { if (alive) setError('Something went wrong. Please refresh to try again.'); }).finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [dispatch]);
  let list = s.catalogue.products.filter(p => (s.catalogue.category === 'All devices' || p.type === s.catalogue.category) && (p.name + p.brand).toLowerCase().includes(s.catalogue.search.toLowerCase()));
  if (s.catalogue.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (s.catalogue.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  return <><header><Link href="/" className="logo"><span className="orbit-mark">◉</span> orbit<span className="logo-dot">.</span></Link><nav><Link href="/" className="nav-active">Discover</Link></nav><div className="header-right"><span className="header-note">A little upgrade. A lot of possibility.</span><div className="avatar small">AM</div></div></header>
    <main>
      <UserBadge />
      <section className="collection-heading" id="devices"><div className="eyebrow">THE COLLECTION</div><h2>Your next everyday essential.</h2><p>Big ideas. Beautiful screens. Meet your next upgrade.</p></section>
      <div className="toolbar"><div className="tabs">{['All devices', 'Smartphones', 'Tablets'].map((c, i) => { const Icon = [LayoutGrid, Smartphone, Tablet][i]; return <button key={c} className={s.catalogue.category === c ? 'active' : ''} onClick={() => dispatch(setCategory(c))}><Icon size={15}/>{c}</button>; })}</div><div className="tools"><label className="search"><Search size={16}/><input aria-label="Search devices" placeholder="Search devices…" value={s.catalogue.search} onChange={e => dispatch(setSearch(e.target.value))}/></label><select aria-label="Sort devices" value={s.catalogue.sort} onChange={e => dispatch(setSort(e.target.value as 'featured' | 'low' | 'high'))}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div>
      {error ? <p role="alert">{error}</p> : loading ? <div className="loading">Getting your next favorites ready<span>…</span></div> : <><div className="result-count">{list.length} devices, endless possibilities</div><section className="product-grid" aria-label="Product list">{list.map((p: any) => <Link className="product-card" key={p.id} href={'/product/' + p.id}><div className={'product-art ' + p.tone}>{p.tag && <span className={'badge ' + (p.tag === 'NEW ARRIVAL' ? 'green' : '')}>{p.tag}</span>}<div className={'device ' + (p.type === 'Tablets' ? 'tablet' : '')}><div className="device-back"><div className={'cameras ' + (p.brand === 'Google' ? 'pixel' : '')}><i/><i/><i/></div><span className="device-brand">{p.brand === 'Apple' ? '●' : p.brand === 'Google' ? 'G' : 'SAMSUNG'}</span></div><div className="device-front"><div className="dynamic-island"/><div className="wallpaper"/></div></div><span className="art-caption">{p.color}</span></div><div className="product-copy"><span className="brand">{p.brand} <span> / {p.type === 'Tablets' ? 'Tablet' : 'Smartphone'}</span></span><h3>{p.name}</h3><p>{p.storage} <span>·</span> {p.color}</p><div className="product-bottom"><strong>{p.priceLabel}<small> USD</small></strong><span className="circle-arrow"><ArrowUpRight size={19}/></span></div></div></Link>)}</section>{!list.length && <div className="loading">No devices found. Try another search.</div>}</>}
      <section className="benefits"><div><Truck/><span><strong>On its way, on us.</strong><small>Free shipping on every device</small></span></div><div><ShieldCheck/><span><strong>Peace of mind included.</strong><small>1-year warranty on all devices</small></span></div><div><Package/><span><strong>Find your perfect fit.</strong><small>Easy returns within 14 days</small></span></div></section>
    </main><footer><Link href="/" className="logo">◉ orbit.</Link><span>A better everyday starts here.</span><span className="footer-end"><CircleHelp size={14}/> A demo store, made for learning. <ArrowRight size={14}/></span></footer></>;
}
