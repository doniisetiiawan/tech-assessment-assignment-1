// Infrastructure adapter — maps snake_case API rows to the domain User here,
// so raw API shapes never leak inward (doc §3 "Boundary Crossing Data").
import type { UserRepository } from '../application/ports/user-repository';
import type { User } from '../domain/user';

interface UserApiRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  membership: string;
  wallet_balance: number;
}

export class LocalUserRepository implements UserRepository {
  fetchCurrentUser(): Promise<User> {
    return new Promise(resolve =>
      setTimeout(
        () => {
          const row: UserApiRow = {
            id: 1,
            first_name: 'Dilan',
            last_name: 'Morgan',
            email: 'dilan.1995@email.com',
            membership: 'Orbit Plus',
            wallet_balance: 1050,
          };
          resolve({
            id: row.id,
            firstName: row.first_name,
            lastName: row.last_name,
            name: row.first_name + ' ' + row.last_name,
            email: row.email,
            membership: row.membership,
          });
        },
        450
      )
    );
  }
}
