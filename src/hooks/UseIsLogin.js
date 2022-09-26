import { useEffect, useState } from "react"
import fetcher from '../api/axios';

const UseIsLogin = email => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsLoading(true);
        if (email) {
            (async () => {
                try {
                    const { data: { result } } = await fetcher.get(`http://localhost:5000/api/v1/admin/is-login?email=${email}`);
                    setIsLoading(false);
                    setUser(result);
                } catch (error) {
                    setError(null);
                }
            })()
        }
    }, [email]);


    return { user, isLoading, error };
}

export default UseIsLogin;