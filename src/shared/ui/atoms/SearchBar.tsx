import { Search } from 'lucide-react';

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <label className="search">
            <Search size={16} />
            <input
                aria-label="Search devices"
                placeholder="Search devices…"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
}
