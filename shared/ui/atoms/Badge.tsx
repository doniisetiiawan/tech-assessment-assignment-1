interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={'badge' + (variant === 'green' ? ' green' : '')}>{children}</span>;
}
