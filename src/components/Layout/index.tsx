import Header from "../Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6 mt-6 overflow-auto">
        {<Outlet />}
      </main>
    </>
  );
};

export default Layout;
