'use client';
import { ArrowRight } from 'lucide-react';
import { Button, Spinner } from '../../../shared/ui';

interface BuyButtonProps {
  price: number;
  busy: boolean;
  done: boolean;
  onBuy: () => void;
}

export default function BuyButton({ price, busy, done, onBuy }: BuyButtonProps) {
  return (
    <Button className="buy" disabled={busy || done} onClick={onBuy} aria-busy={busy}>
      {busy ? (
        <><Spinner size={18} /> Making it yours…</>
      ) : (
        <>Make it yours <span>${price.toLocaleString('en-US')} <ArrowRight size={18} /></span></>
      )}
    </Button>
  );
}
