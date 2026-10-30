// Output port owned by the application layer (DIP) — implemented by infrastructure.
import type { User } from '../../domain/user';

export interface UserRepository {
  fetchCurrentUser(): Promise<User>;
}
