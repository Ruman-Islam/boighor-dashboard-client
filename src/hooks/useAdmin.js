import { useEffect, useState } from "react"
import fetcher from "../api/axios";

const useAdmin = user => {
    const [admin, setAdmin] = useState('');
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        const email = user?.email;
        if (email) {
            (async () => {
                try {
                    const { data } = await fetcher.get(`admin/is-admin?email=${email}`)
                    setAdmin(data)
                    setAdminLoading(false)
                } catch (error) {
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        // message.warning(error?.response?.data?.message);
                    }
                }
            })()
        }
    }, [user])

    return { admin, adminLoading };
}

export default useAdmin;