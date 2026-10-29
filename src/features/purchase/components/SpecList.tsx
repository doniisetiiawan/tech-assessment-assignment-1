import { Monitor, Cpu, Camera, Battery, HardDrive, Smartphone } from 'lucide-react';

export function SpecList({ p }: { p: any }) {
    const specs = [
        [Monitor, 'Display', p.screen],
        [Cpu, 'Processor', p.chip],
        [Camera, 'Camera', p.camera],
        [Battery, 'Battery', p.battery],
        [HardDrive, 'Storage', p.storage],
        [Smartphone, 'Operating system', p.os],
    ];

    return (
        <div className="specs">
            {specs.map(([Icon, label, value]: any) => (
                <div key={label}>
                    <Icon size={17} />
                    <span>
                        <small>{label}</small>
                        <strong>{value}</strong>
                    </span>
                </div>
            ))}
        </div>
    );
}
