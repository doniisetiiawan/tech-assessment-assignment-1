import type { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export default function Icon({ icon: Lucide, size = 16, className }: IconProps) {
  return <Lucide size={size} className={className} aria-hidden="true" />;
}
