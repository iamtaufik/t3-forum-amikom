"use client";
import AllMyPosts from "@/components/AllMyPosts";
import CommentsList from "@/components/CommentsList";
import { type User } from "@/types/user";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const Profile = ({ user }: { user: User }) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <>
      <div className="flex w-full  flex-col gap-4 bg-white pt-4 ">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-bold text-primary">Profile</h2>
          <div
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-red-600 px-4 py-2 text-white"
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            <span className="">Log Out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-evenly px-2">
          <Image
            width={150}
            className="rounded-full"
            height={150}
            src={user?.image ?? "/blank-profile.png"}
            alt="Taufik"
          />
          <div className="flex items-center gap-4 rounded-md bg-white p-4 shadow-md">
            <div>
              <h2>{user?.name}</h2>
              {/* <p>{session?.user?.name?.split(' ')[session?.user?.name?.split(' ').length - 1]}</p> */}
            </div>
            <div>
              <Link href={"/profile/settings"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div
            onClick={() => setIsActive(!isActive)}
            className="flex w-1/2 cursor-pointer flex-col items-center gap-1"
          >
            <span>Posts</span>
            {isActive && <span className="h-[3px] w-full bg-secondary"></span>}
          </div>
          <div
            onClick={() => setIsActive(!isActive)}
            className="flex w-1/2 cursor-pointer flex-col items-center gap-1"
          >
            <span>Comments</span>
            {!isActive && <span className="h-[3px] w-full bg-secondary"></span>}
          </div>
        </div>
      </div>
      <div className={` flex flex-col items-center gap-2 bg-gray pb-16 pt-2`}>
        {isActive && <AllMyPosts />}
        {!isActive && <CommentsList />}
      </div>
    </>
  );
};

export default Profile;
