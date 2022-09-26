import { useEffect, useState } from "react"
import fetcher from "../api/axios";

const UseGetAdmin = user => {
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        const email = user?.email;
        if (email) {
            (async () => {
                try {
                    const { data } = await fetcher.get(`admin/get-admin?email=${email}`)
                    setAdmin(data);
                } catch (error) {
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        // message.warning(error?.response?.data?.message);
                    }
                }
            })()
        }
    }, [user])

    return { admin };
}

export default UseGetAdmin;