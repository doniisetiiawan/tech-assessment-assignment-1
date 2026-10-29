import { describe, it, expect } from "vitest";
import { mockProducts } from "../../../shared/data/mock-products";
import { canPurchase } from "./purchase";

const sampleProducts = mockProducts;

describe("Purchase", () => {
    it("returns insufficient_balance if the wallet balance is insufficient", () => {
        const result = canPurchase({ price: 1299, stock: 5 }, 1050);
        expect(result).toBe("insufficient_balance");
    });

    it("returns insufficient_stock if the product stock is insufficient", () => {
        const result = canPurchase({ price: 1299, stock: 0 }, 1050);
        expect(result).toBe("out_of_stock");
    });

    it("returns successful purchase if the wallet balance and product stock are sufficient", () => {
        const result = canPurchase({ price: 799, stock: 5 }, 1050);
        expect(result).toBe("ok");
    });
});
