import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setUser } from '../store/session-slice';
import { userApi } from '../api/user-api';

export function UserBadge() {
    const dispatch = useAppDispatch();
    const { user, walletBalance } = useAppSelector((state) => state.session);

    useEffect(() => {
        userApi().then((data) => dispatch(setUser(data)));
    }, [dispatch]);

    return (
        <section className="welcome" aria-label="User information">
            <div className="welcome-user">
                <div className="avatar">AM</div>
                <div>
                    <div className="welcome-label">YOUR PERSONAL SPACE</div>
                    <h2>
                        Welcome back, {user?.first_name || 'Alex'} <span className="wave">✳</span>
                    </h2>
                    <p>{user?.email || 'Getting your profile ready…'}</p>
                </div>
            </div>
            <div className="member">
                <span className="plus">
                    <Sparkles size={13} /> {user?.membership || 'Orbit Plus'}
                </span>
                <p>A little extra, just for you.</p>
            </div>
            <div className="points">
                <span>YOUR WALLET BALANCE</span>
                <strong>
                    ${walletBalance.toLocaleString('en-US')} <small>USD</small>
                </strong>
                <p>Ready for your next upgrade.</p>
            </div>
        </section>
    );
}
