export interface UserApiResult {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  membership: string;
  wallet_balance: number;
}

export function fetchUserApi(): Promise<UserApiResult> {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          id: 1,
          first_name: 'Dilan',
          last_name: 'Morgan',
          email: 'dilan.1995@email.com',
          membership: 'Orbit Plus',
          wallet_balance: 1050,
        }),
      450
    )
  );
}
