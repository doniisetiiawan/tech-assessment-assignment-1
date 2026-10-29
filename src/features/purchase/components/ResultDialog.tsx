import { useEffect } from 'react';
import Link from 'next/link';
import { Check, CircleAlert, ArrowRight } from 'lucide-react';

export function ResultDialog({ done, p, balance }: { done: any; p: any; balance: number }) {
    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        const link = document.getElementById('success-cta');
        link?.focus();
        const trap = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                link?.focus();
            }
        };
        document.addEventListener('keydown', trap);
        return () => {
            document.removeEventListener('keydown', trap);
            previous?.focus();
        };
    }, []);

    const isSuccess = done.status === 'success';

    return (
        <div className="modal-overlay">
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="success-title" aria-describedby="success-description">
                <div className="success-icon">{isSuccess ? <Check size={32} /> : <CircleAlert size={32} />}</div>
                <div className="eyebrow">{isSuccess ? 'GOOD THINGS ARE ON THEIR WAY' : 'A LITTLE SHORT THIS TIME'}</div>
                <h2 id="success-title">{isSuccess ? 'It’s officially in your orbit.' : 'Insufficient balance'}</h2>
                <p id="success-description">
                    {isSuccess ? (
                        <>Your {p.name} is one step closer to being your new everyday essential.</>
                    ) : (
                        <>Your wallet balance is ${balance.toLocaleString('en-US')} USD. You need ${(p.price - balance).toLocaleString('en-US')} USD more to purchase this {p.name}.</>
                    )}
                </p>
                <div className="order-info">
                    <span>{isSuccess ? 'Order reference' : 'Device price'}</span>
                    <strong>{isSuccess ? done.order_id : '$' + p.price.toLocaleString('en-US') + ' USD'}</strong>
                </div>
                <Link id="success-cta" className="primary-button" href="/">
                    Back to dashboard <ArrowRight size={18} />
                </Link>
                <small>This is a simulated purchase. No charge was made.</small>
            </div>
        </div>
    );
}
