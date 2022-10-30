import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuthJWT } from 'src/Pages/Authentication/queries';
import { updateState } from 'src/store/authenticationSlice';

export function useAuth() {
    const [loading, setLoading] = useState(true);
    const user = localStorage.getItem('userData');
    const controller = new AbortController();
    const dispatch = useDispatch()

    useEffect(() => {
        getAuthJWT()
            .then(({ data }) => {
                dispatch(updateState(data));
                setTimeout(() => setLoading(false), 1000);
            })
            .catch((err) => {
                console.log(err);
                setTimeout(() => setLoading(false), 1000);
            });

        return () => {
            controller.abort();
        };
    }, []);

    return { user, loading };
}
