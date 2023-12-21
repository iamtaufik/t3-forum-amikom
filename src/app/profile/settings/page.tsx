import EditProfile from "@/components/EditProfile";
import LoginBtn from "@/components/LoginBtn";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  // TODO: Create settings page
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div className="container h-screen max-w-lg bg-gray px-4 pb-4">
        <LoginBtn />;
      </div>
    );
  }
  return (
    <div className="container h-screen max-w-lg bg-white pb-6">
      <div className="my-2 flex w-full justify-start px-4">
        <Link href={"/profile"} className="w-max">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8  text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </div>
        </Link>
      </div>
      <div className="container px-8">
        <h1 className="text-2xl font-semibold text-primary">Edit Profile</h1>
        <div className="flex flex-col items-center justify-center gap-3">
          <Image
            className="rounded-full"
            src={session.user.image ?? ""}
            width={120}
            height={120}
            alt={session.user.name ?? ""}
          />
          <p className="font-medium text-primary">Edit Foto Profile</p>
        </div>
        <div>
          <EditProfile userInfo={session.user} />
        </div>
      </div>
    </div>
  );
};

export default Page;
