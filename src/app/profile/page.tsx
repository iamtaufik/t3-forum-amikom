import LoginBtn from "@/components/LoginBtn";
import NavbarBtm from "@/components/NavbarBtm";
import Profile from "@/pages/Profile";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const Page = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div className="container h-screen max-w-lg bg-gray px-4 pb-4">
        <LoginBtn />;
      </div>
    );
  }
  return (
    <div className="container h-screen max-w-lg bg-gray pb-6">
      <Profile user={session.user} />
      <NavbarBtm />
    </div>
  );
};

export default Page;
