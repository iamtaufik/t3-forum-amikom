import LoginBtn from "@/components/LoginBtn";
import Comments from "@/components/layouts/Comments";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const Page = async ({ params }: { params: { postId: string } }) => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div className="container h-screen max-w-lg bg-gray px-4 pb-4">
        <LoginBtn />;
      </div>
    );
  }
  return <Comments postId={params.postId} email={session.user.email!} />;
};

export default Page;
