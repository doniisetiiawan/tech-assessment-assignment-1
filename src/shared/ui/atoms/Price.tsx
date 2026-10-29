export function Price({ amount }: { amount: string | number }) {
    const formatted = typeof amount === 'number' ? `$${amount.toLocaleString('en-US')}` : amount;
    return <strong>{formatted}<small> USD</small></strong>;
}
