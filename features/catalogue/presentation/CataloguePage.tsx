'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { SearchBar } from '../../../shared/ui/molecules';
import { fetchProducts, setSearch, setCategory, setSort, selectCatalogue, selectFilteredProducts, type SortOption } from '../index';
import FilterTabs from './FilterTabs';
import ProductGrid from './ProductGrid';

export default function CataloguePage() {
  const dispatch = useAppDispatch();
  const { status, search, category, sort } = useAppSelector(selectCatalogue);
  const list = useAppSelector(selectFilteredProducts);
  const [error, setError] = useState('');
  const loading = status !== 'succeeded';
  useEffect(() => {
    dispatch(fetchProducts()).catch(() => setError('Something went wrong. Please refresh to try again.'));
  }, [dispatch]);
  return (
    <>
      <section className="collection-heading" id="devices">
        <div className="eyebrow">THE COLLECTION</div>
        <h2>Your next everyday essential.</h2>
        <p>Big ideas. Beautiful screens. Meet your next upgrade.</p>
      </section>
      <div className="toolbar">
        <FilterTabs categories={['All devices', 'Smartphones', 'Tablets']} active={category} onChange={c => dispatch(setCategory(c))} />
        <div className="tools">
          <SearchBar label="Search devices" placeholder="Search devices…" value={search} onChange={v => dispatch(setSearch(v))} />
          <select aria-label="Sort devices" value={sort} onChange={e => dispatch(setSort(e.target.value as SortOption))}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>
      {error ? (
        <p role="alert">{error}</p>
      ) : loading ? (
        <div className="loading">Getting your next favorites ready<span>…</span></div>
      ) : (
        <>
          <div className="result-count">{list.length} devices, endless possibilities</div>
          <ProductGrid products={list} />
          {!list.length && <div className="loading">No devices found. Try another search.</div>}
        </>
      )}
    </>
  );
}
