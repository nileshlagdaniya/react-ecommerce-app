import { Outlet } from "react-router-dom";
import UserNavbar from "../navbar/UserNavbar";

const UserLayout = () => {
  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
};

export default UserLayout;
