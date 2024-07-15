import React from "react";
import Header from "../Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto">{children}</main>
    </>
  );
};

export default Layout;
