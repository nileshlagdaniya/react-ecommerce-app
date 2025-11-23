import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import UserNavbar from "./UserNavbar";
import NormalNavbar from "./NormalNavbar";

const MainNavbar = () => {
  const { loading, user } = useSelector((state: RootState) => state.auth);

  if (loading) return null;

  // if (user?.role === "admin") return <AdminNavbar />;
  if (user?.role === "user") return <UserNavbar />;
  return <NormalNavbar />;
};

export default MainNavbar;
