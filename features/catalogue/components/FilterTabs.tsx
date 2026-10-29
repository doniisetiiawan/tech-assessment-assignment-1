'use client';
import { LayoutGrid, Smartphone, Tablet } from 'lucide-react';
import { Icon } from '../../../shared/ui';

const TABS = [
  { label: 'All devices', icon: LayoutGrid },
  { label: 'Smartphones', icon: Smartphone },
  { label: 'Tablets', icon: Tablet },
];

interface FilterTabsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function FilterTabs({ categories, active, onChange }: FilterTabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="Device categories">
      {TABS.filter(t => categories.includes(t.label)).map(({ label, icon }) => (
        <button key={label} role="tab" aria-selected={active === label} className={active === label ? 'active' : ''} onClick={() => onChange(label)}>
          <Icon icon={icon} size={15} />
          {label}
        </button>
      ))}
    </div>
  );
}
