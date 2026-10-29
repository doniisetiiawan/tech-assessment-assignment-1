import { Badge } from '@/shared/ui/atoms/Badge';

export function DeviceArt({ p }: { p: any }) {
    return (
        <div className={'product-art ' + p.tone}>
            {p.tag && <Badge isNew={p.tag === 'NEW ARRIVAL'}>{p.tag}</Badge>}
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
            <span className="art-caption">{p.color}</span>
        </div>
    );
}
