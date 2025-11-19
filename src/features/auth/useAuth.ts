import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"

export const useAuth = () => {
    const { initialized, loading, user } = useSelector((state: RootState) => state.auth)

    return {
        user,
        loading,
        initialized,
        isAdmin: user?.role === "admin",
        isLoggedIn: Boolean(user)
    }
}