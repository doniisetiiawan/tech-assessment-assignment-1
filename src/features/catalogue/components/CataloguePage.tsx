import { useEffect } from 'react';
import Link from 'next/link';
import { Search, LayoutGrid, Smartphone, Tablet, ArrowUpRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/data/hooks';
import { setCategory, setSearch, setSort, setProducts, setError } from '../store/catalogue-slice';
import { filterProducts, sortProducts } from '../model/filters';
import { productsApi } from '../api/products-api';

export function CataloguePage() {
    const dispatch = useAppDispatch();
    const { products, category, search, sort, loading, error } = useAppSelector(
        (state) => state.catalogue
    );

    useEffect(() => {
        productsApi()
            .then((data) => dispatch(setProducts(data)))
            .catch(() => dispatch(setError('Something went wrong. Please refresh to try again.')));
    }, [dispatch]);

    let list = filterProducts(products, category, search);
    list = sortProducts(list, sort);

    return (
        <>
            <section className="collection-heading" id="devices">
                <div className="eyebrow">THE COLLECTION</div>
                <h2>Your next everyday essential.</h2>
                <p>Big ideas. Beautiful screens. Meet your next upgrade.</p>
            </section>

            {/* TOOLBAR */}
            <div className="toolbar">
                <div className="tabs">
                    {(['All devices', 'Smartphones', 'Tablets'] as const).map((c, i) => {
                        const Icon = [LayoutGrid, Smartphone, Tablet][i];
                        return (
                            <button
                                key={c}
                                className={category === c ? 'active' : ''}
                                onClick={() => dispatch(setCategory(c))}
                            >
                                <Icon size={15} />
                                {c}
                            </button>
                        );
                    })}
                </div>
                <div className="tools">
                    <label className="search">
                        <Search size={16} />
                        <input
                            aria-label="Search devices"
                            placeholder="Search devices…"
                            value={search}
                            onChange={(e) => dispatch(setSearch(e.target.value))}
                        />
                    </label>
                    <select
                        aria-label="Sort devices"
                        value={sort}
                        onChange={(e) => dispatch(setSort(e.target.value as any))}
                    >
                        <option value="featured">Featured</option>
                        <option value="low">Price: low to high</option>
                        <option value="high">Price: high to low</option>
                    </select>
                </div>
            </div>

            {/* PRODUCT LIST / ERROR / LOADING */}
            {error ? (
                <p role="alert">{error}</p>
            ) : loading ? (
                <div className="loading">Getting your next favorites ready<span>…</span></div>
            ) : (
                <>
                    <div className="result-count">{list.length} devices, endless possibilities</div>
                    <section className="product-grid" aria-label="Product list">
                        {list.map((p: any) => (
                            <Link className="product-card" key={p.id} href={'/product/' + p.id}>
                                {/* Visual Card */}
                                <div className={'product-art ' + p.tone}>
                                    {p.tag && <span className={'badge ' + (p.tag === 'NEW ARRIVAL' ? 'green' : '')}>{p.tag}</span>}
                                    <div className={'device ' + (p.type === 'Tablets' ? 'tablet' : '')}>
                                        <div className="device-back">
                                            <div className={'cameras ' + (p.brand === 'Google' ? 'pixel' : '')}><i /><i /><i /></div>
                                            <span className="device-brand">{p.brand === 'Apple' ? '●' : p.brand === 'Google' ? 'G' : 'SAMSUNG'}</span>
                                        </div>
                                        <div className="device-front"><div className="dynamic-island" /><div className="wallpaper" /></div>
                                    </div>
                                    <span className="art-caption">{p.color}</span>
                                </div>
                                <div className="product-copy">
                                    <span className="brand">{p.brand} <span> / {p.type === 'Tablets' ? 'Tablet' : 'Smartphone'}</span></span>
                                    <h3>{p.name}</h3>
                                    <p>{p.storage} <span>·</span> {p.color}</p>
                                    <div className="product-bottom">
                                        <strong>{p.priceLabel}<small> USD</small></strong>
                                        <span className="circle-arrow"><ArrowUpRight size={19} /></span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>
                    {!list.length && <div className="loading">No devices found. Try another search.</div>}
                </>
            )}
        </>
    );
}
