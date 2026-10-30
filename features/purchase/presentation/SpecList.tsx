import { Monitor, Cpu, Camera, Battery, HardDrive, Smartphone } from 'lucide-react';
import { Icon } from '../../../shared/ui';
import type { LucideIcon } from 'lucide-react';
import type { ProductDetail } from '../domain/product';

interface SpecRow {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function SpecList({ product }: { product: ProductDetail }) {
  const rows: SpecRow[] = [
    { icon: Monitor, label: 'Display', value: product.screen },
    { icon: Cpu, label: 'Processor', value: product.chip },
    { icon: Camera, label: 'Camera', value: product.camera },
    { icon: Battery, label: 'Battery', value: product.battery },
    { icon: HardDrive, label: 'Storage', value: product.storage },
    { icon: Smartphone, label: 'Operating system', value: product.os },
  ];
  return (
    <div className="specs">
      {rows.map(({ icon, label, value }) => (
        <div key={label}>
          <Icon icon={icon} size={17} />
          <span>
            <small>{label}</small>
            <strong>{value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}
