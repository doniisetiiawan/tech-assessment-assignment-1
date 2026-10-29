'use client';
import Link from 'next/link';
import { ArrowRight, Check, CircleAlert } from 'lucide-react';

interface ResultDialogProps {
  status: 'success' | 'insufficient_balance';
  orderId?: string;
  productName: string;
  productPrice: number;
  balance: number;
}

export default function ResultDialog({ status, orderId, productName, productPrice, balance }: ResultDialogProps) {
  const success = status === 'success';
  return (
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="success-title" aria-describedby="success-description">
        <div className="success-icon">{success ? <Check size={32} /> : <CircleAlert size={32} />}</div>
        <div className="eyebrow">{success ? 'GOOD THINGS ARE ON THEIR WAY' : 'A LITTLE SHORT THIS TIME'}</div>
        <h2 id="success-title">{success ? 'It’s officially in your orbit.' : 'Insufficient balance'}</h2>
        <p id="success-description">
          {success ? (
            <>Your {productName} is one step closer to being your new everyday essential.</>
          ) : (
            <>Your wallet balance is ${balance.toLocaleString('en-US')} USD. You need ${(productPrice - balance).toLocaleString('en-US')} USD more to purchase this {productName}.</>
          )}
        </p>
        <div className="order-info">
          <span>{success ? 'Order reference' : 'Device price'}</span>
          <strong>{success ? orderId : '$' + productPrice.toLocaleString('en-US') + ' USD'}</strong>
        </div>
        <Link id="success-cta" className="primary-button" href="/">Back to dashboard <ArrowRight size={18} /></Link>
        <small>This is a simulated purchase. No charge was made.</small>
      </div>
    </div>
  );
}
