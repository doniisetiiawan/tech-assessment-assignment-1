// Output port owned by the application (use case) layer — see docs/clean-architecture.md §5.2.
// Infrastructure implements this; the slice never imports a concrete API.
import type { CatalogueProduct } from '../../domain/types';

export interface ProductRepository {
  fetchCatalogue(): Promise<CatalogueProduct[]>;
}
