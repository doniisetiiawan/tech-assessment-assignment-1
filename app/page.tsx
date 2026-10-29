'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Search, Smartphone, Tablet, LayoutGrid, Package, ShieldCheck, Truck, CircleHelp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { UserBadge, fetchUser } from '../features/session/index';
import { fetchProducts, setSearch, setCategory, setSort, selectCatalogue, selectFilteredProducts } from '../features/catalogue/index';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { status, search, category, sort } = useAppSelector(selectCatalogue);
  const list = useAppSelector(selectFilteredProducts);
  const [error, setError] = useState('');
  const loading = status !== 'succeeded';
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchProducts()).catch(() => setError('Something went wrong. Please refresh to try again.'));
  }, [dispatch]);
  return <><header><Link href="/" className="logo"><span className="orbit-mark">◉</span> orbit<span className="logo-dot">.</span></Link><nav><Link href="/" className="nav-active">Discover</Link></nav><div className="header-right"><span className="header-note">A little upgrade. A lot of possibility.</span><div className="avatar small">AM</div></div></header>
    <main>
      <UserBadge />
      <section className="collection-heading" id="devices"><div className="eyebrow">THE COLLECTION</div><h2>Your next everyday essential.</h2><p>Big ideas. Beautiful screens. Meet your next upgrade.</p></section>
      <div className="toolbar"><div className="tabs">{['All devices', 'Smartphones', 'Tablets'].map((c, i) => { const Icon = [LayoutGrid, Smartphone, Tablet][i]; return <button key={c} className={category === c ? 'active' : ''} onClick={() => dispatch(setCategory(c))}><Icon size={15}/>{c}</button>; })}</div><div className="tools"><label className="search"><Search size={16}/><input aria-label="Search devices" placeholder="Search devices…" value={search} onChange={e => dispatch(setSearch(e.target.value))}/></label><select aria-label="Sort devices" value={sort} onChange={e => dispatch(setSort(e.target.value as 'featured' | 'low' | 'high'))}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div>
      {error ? <p role="alert">{error}</p> : loading ? <div className="loading">Getting your next favorites ready<span>…</span></div> : <><div className="result-count">{list.length} devices, endless possibilities</div><section className="product-grid" aria-label="Product list">{list.map(p => <Link className="product-card" key={p.id} href={'/product/' + p.id}><div className={'product-art ' + p.tone}>{p.tag && <span className={'badge ' + (p.tag === 'NEW ARRIVAL' ? 'green' : '')}>{p.tag}</span>}<div className={'device ' + (p.type === 'Tablets' ? 'tablet' : '')}><div className="device-back"><div className={'cameras ' + (p.brand === 'Google' ? 'pixel' : '')}><i/><i/><i/></div><span className="device-brand">{p.brand === 'Apple' ? '●' : p.brand === 'Google' ? 'G' : 'SAMSUNG'}</span></div><div className="device-front"><div className="dynamic-island"/><div className="wallpaper"/></div></div><span className="art-caption">{p.color}</span></div><div className="product-copy"><span className="brand">{p.brand} <span> / {p.type === 'Tablets' ? 'Tablet' : 'Smartphone'}</span></span><h3>{p.name}</h3><p>{p.storage} <span>·</span> {p.color}</p><div className="product-bottom"><strong>{p.priceLabel}<small> USD</small></strong><span className="circle-arrow"><ArrowUpRight size={19}/></span></div></div></Link>)}</section>{!list.length && <div className="loading">No devices found. Try another search.</div>}</>}
      <section className="benefits"><div><Truck/><span><strong>On its way, on us.</strong><small>Free shipping on every device</small></span></div><div><ShieldCheck/><span><strong>Peace of mind included.</strong><small>1-year warranty on all devices</small></span></div><div><Package/><span><strong>Find your perfect fit.</strong><small>Easy returns within 14 days</small></span></div></section>
    </main><footer><Link href="/" className="logo">◉ orbit.</Link><span>A better everyday starts here.</span><span className="footer-end"><CircleHelp size={14}/> A demo store, made for learning. <ArrowRight size={14}/></span></footer></>;
}
