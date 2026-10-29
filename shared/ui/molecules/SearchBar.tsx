import { Search } from 'lucide-react';
import Icon from '../atoms/Icon';

interface SearchBarProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ label = 'Search', placeholder = 'Search…', value, onChange }: SearchBarProps) {
  return (
    <label className="search">
      <Icon icon={Search} size={16} />
      <input aria-label={label} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </label>
  );
}
