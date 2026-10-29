import { LoaderCircle } from 'lucide-react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({ size = 18, className }: SpinnerProps) {
  return <LoaderCircle className={'spin' + (className ? ' ' + className : '')} size={size} aria-hidden="true" />;
}
