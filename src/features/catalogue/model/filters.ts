export type Category = 'All devices' | 'Smartphones' | 'Tablets';
export type SortOption = 'featured' | 'low' | 'high';
export function filterProducts(products: any[], category: Category, search: string) {
    const cleanSearch = search.trim().toLowerCase();
    return products.filter((p) => {
        const matchCategory = category === 'All devices' || p.type === category;
        const matchSearch =
            cleanSearch === '' || (p.name + ' ' + p.brand).toLowerCase().includes(cleanSearch);
        return matchCategory && matchSearch;
    });
}
export function sortProducts(products: any[], sort: SortOption) {
    if (sort === 'low') return [...products].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...products].sort((a, b) => b.price - a.price);
    return products;
}