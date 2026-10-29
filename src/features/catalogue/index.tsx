'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setProducts, setError } from './store/catalogue-slice';
import { filterProducts, sortProducts } from './model/filters';
import { productsApi } from './api/products-api';
import { FilterTabs } from './components/FilterTabs';
import { ProductCard } from './components/ProductCard';

export function CataloguePage() {
    const dispatch = useAppDispatch();
    const { products, category, search, sort, loading, error } = useAppSelector(
        (state) => state.catalogue
    );

    useEffect(() => {
        productsApi()
            .then((data: any) => dispatch(setProducts(data)))
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

            <FilterTabs />

            {error ? (
                <p role="alert">{error}</p>
            ) : loading ? (
                <div className="loading">
                    Getting your next favorites ready<span>…</span>
                </div>
            ) : (
                <>
                    <div className="result-count">{list.length} devices, endless possibilities</div>
                    <section className="product-grid" aria-label="Product list">
                        {list.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </section>
                    {!list.length && (
                        <div className="loading">No devices found. Try another search.</div>
                    )}
                </>
            )}
        </>
    );
}
