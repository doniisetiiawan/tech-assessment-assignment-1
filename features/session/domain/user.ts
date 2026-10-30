// Domain entity — user as the business sees it (no API naming like first_name).
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  membership: string;
}
