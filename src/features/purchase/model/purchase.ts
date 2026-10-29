export type PurchaseCheckResult = 'ok' | 'insufficient_balance' | 'out_of_stock';
export function canPurchase(
    product: { price: number; stock: number },
    balance: number
): PurchaseCheckResult {
    if (product.stock < 1) return 'out_of_stock';
    if (product.price > balance) return 'insufficient_balance';
    return 'ok';
}