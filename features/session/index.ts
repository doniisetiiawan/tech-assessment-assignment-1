// Public API of the session feature. Presentation + application only.
export { default as UserBadge } from './presentation/UserBadge';
export { fetchUser, selectUser, selectWalletBalance, addOrder } from './application/session-slice';
export type { User } from './domain/user';
export { LocalUserRepository } from './infrastructure/user-repository';
