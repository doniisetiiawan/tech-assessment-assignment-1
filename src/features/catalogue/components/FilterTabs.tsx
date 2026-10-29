import { LayoutGrid, Smartphone, Tablet } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setCategory, setSearch, setSort } from '../store/catalogue-slice';
import { SearchBar } from '@/shared/ui/atoms/SearchBar';

export function FilterTabs() {
    const dispatch = useAppDispatch();
    const { category, search, sort } = useAppSelector((state) => state.catalogue);

    return (
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
                <SearchBar value={search} onChange={(val) => dispatch(setSearch(val))} />
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
    );
}
