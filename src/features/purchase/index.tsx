'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Truck, LoaderCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { getProductByIdApi, simulateBuyApi } from './api/products-api';
import { setSelectedProduct, addOrder } from './store/purchase-slice';
import { SpecList } from './components/SpecList';
import { ResultDialog } from './components/ResultDialog';

export function ProductDetailPage({ id }: { id: string }) {
    const dispatch = useAppDispatch();
    const balance = useAppSelector((state) => state.session.walletBalance);

    const [p, setP] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');
    const [busy, setBusy] = useState(false);
    const [done, setDone] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        getProductByIdApi(id)
            .then((data) => {
                if (mounted) {
                    setP(data);
                    dispatch(setSelectedProduct(data));
                }
            })
            .catch((e) => {
                if (mounted) setErr(e.message);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, [id, dispatch]);

    async function handleBuy() {
        if (busy || done) return;
        setBusy(true);
        setErr('');
        try {
            const result = await simulateBuyApi(p, balance);
            if (result.status === 'success') {
                dispatch(addOrder(result));
            }
            setDone(result);
        } catch (e: any) {
            setErr(e.message || 'Purchase failed.');
        } finally {
            setBusy(false);
        }
    }

    return (
        <main className="detail-main">
            <Link className="back-link" href="/">
                <ArrowLeft size={16} /> Back to discover
            </Link>

            {loading ? (
                <div className="loading">A closer look is on its way…</div>
            ) : !p ? (
                <div className="empty">
                    <h1>Device not found.</h1>
                    <p role="alert">{err}</p>
                    <Link className="primary-button" href="/">
                        Back to dashboard <ArrowRight size={17} />
                    </Link>
                </div>
            ) : (
                <div className="detail-grid">
                    <div>
                        <div className={'detail-art product-art ' + p.tone}>
                            <span className="badge">THE EVERYDAY, REIMAGINED</span>
                            <div className={'device ' + (p.type === 'Tablets' ? 'tablet' : '')}>
                                <div className="device-back">
                                    <div className={'cameras ' + (p.brand === 'Google' ? 'pixel' : '')}>
                                        <i /><i /><i />
                                    </div>
                                    <span className="device-brand">
                                        {p.brand === 'Apple' ? '●' : p.brand === 'Google' ? 'G' : 'SAMSUNG'}
                                    </span>
                                </div>
                                <div className="device-front">
                                    <div className="dynamic-island" />
                                    <div className="wallpaper" />
                                </div>
                            </div>
                            <span className="art-caption">Designed for your everyday.</span>
                        </div>
                        <p className="illustration-note">
                            Illustrative device preview. Specifications are demo data.
                        </p>
                    </div>

                    <div className="detail-copy">
                        <div className="eyebrow">{p.brand} / {p.type}</div>
                        <h1>{p.name}</h1>
                        <p className="description">
                            A little more possibility in your hands. Beautifully designed, effortlessly powerful, and ready for whatever your day brings.
                        </p>
                        <div className="detail-price">
                            ${p.price.toLocaleString('en-US')} <span>USD · One-time payment</span>
                        </div>
                        <div className="divider" />
                        <div className="option-label">
                            COLOR <strong>{p.color}</strong>
                        </div>
                        <div className={'color-swatch ' + p.tone}>
                            <Check size={16} />
                        </div>
                        <div className="option-label">STORAGE</div>
                        <div className="storage-option">
                            {p.storage} <Check size={15} />
                        </div>
                        <h2 className="spec-heading">Small details. Big difference.</h2>
                        <SpecList p={p} />
                        <div className="in-stock">
                            <span /> In stock. Ready for your next chapter.
                        </div>
                        {err && <p role="alert" className="error">{err}</p>}
                        <button
                            className="primary-button buy"
                            disabled={busy || !!done}
                            onClick={handleBuy}
                        >
                            {busy ? (
                                <>
                                    <LoaderCircle className="spin" size={18} /> Making it yours…
                                </>
                            ) : (
                                <>
                                    Make it yours <span>${p.price.toLocaleString('en-US')} <ArrowRight size={18} /></span>
                                </>
                            )}
                        </button>
                        <p className="purchase-note">
                            Demo purchase · No payment or personal details needed
                        </p>
                        <div className="detail-perks">
                            <span><Truck size={16} /> Free shipping</span>
                            <span><ShieldCheck size={16} /> 1-year warranty</span>
                        </div>
                    </div>
                </div>
            )}

            {done && <ResultDialog done={done} p={p} balance={balance} />}
        </main>
    );
}
