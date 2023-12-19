import LoginBtn from "@/components/LoginBtn";
import AddPost from "@/pages/AddPost";
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
  return <AddPost user={session.user} />;
};

export default Page;
