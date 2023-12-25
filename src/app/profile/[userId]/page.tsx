"use client";
import NavbarBtm from "@/components/NavbarBtm";
import { api } from "@/trpc/react";
import { User, type Posts, Profiles } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = ({ params }: { params: { userId: number } }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const { data: user } = api.user.getOne.useQuery({
    id: Number(params.userId),
  });
  return (
    <>
      <div className="container h-screen max-w-lg bg-gray pb-6">
        <div className=" flex w-full  flex-col gap-4 bg-white pt-4 ">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-bold text-primary">Profile</h2>
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
                <h2>{user?.profile?.nim}</h2>
                {/* <p>{session?.user?.name?.split(' ')[session?.user?.name?.split(' ').length - 1]}</p> */}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div
              onClick={() => setIsActive(!isActive)}
              className="flex w-1/2 cursor-pointer flex-col items-center gap-1"
            >
              <span>Posts</span>
              {isActive && (
                <span className="h-[3px] w-full bg-secondary"></span>
              )}
            </div>
            <div
              onClick={() => setIsActive(!isActive)}
              className="flex w-1/2 cursor-pointer flex-col items-center gap-1"
            >
              <span>Comments</span>
              {!isActive && (
                <span className="h-[3px] w-full bg-secondary"></span>
              )}
            </div>
          </div>
        </div>
        <div className={` flex flex-col items-center gap-2 bg-gray pb-16 pt-2`}>
          {isActive && (
            <div className="mb-12 mt-4 flex flex-col gap-4">
              {user?.posts?.map((post: Posts) => (
                <Post
                  key={post.id}
                  name={user.name}
                  description={post.body}
                  id={post.id}
                  profilePicture={user.image ?? "/blank-profile.png"}
                  imagePost={post.image ?? ""}
                  userId={user.id}
                />
              ))}
            </div>
          )}
          {!isActive && (
            <div className="flex w-full flex-col items-end">
              {user?.comments?.map((comment) => (
                <Comment
                  content={comment.body}
                  id={comment.id}
                  name={user.name}
                  profilePicture={user.image ?? "/blank-profile.png"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <NavbarBtm />
    </>
  );
};

export default Page;

const Post = ({
  id,
  name,
  profilePicture,
  imagePost,
  description,
  userId,
  className,
  isBtnComment = true,
}: {
  id: number;
  name: string;
  userId: number;
  profilePicture: string;
  imagePost?: string;
  description: string;
  isBtnComment?: boolean;
  className?: string;
}) => {
  return (
    <>
      <div
        className={`flex flex-col gap-y-4 rounded-lg bg-white p-4 shadow-md ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full "
              width={50}
              height={50}
              src={profilePicture}
              alt={name}
            />
            <h2 className="text-sm font-semibold text-dark">
              <Link href={`/profile/${userId}`}>{name}</Link>
            </h2>
          </div>
        </div>
        {imagePost && (
          <div className="">
            <Image
              width={350}
              height={200}
              className="w-full rounded-2xl "
              src={imagePost}
              alt={description}
            />
          </div>
        )}
        <div>
          <p>{description}</p>
        </div>
        {isBtnComment && (
          <div className="flex justify-end">
            <Link href={`/post/${id}/comments`}>
              <span className="flex items-center font-semibold text-primary">
                Lihat Komentar{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

const Comment = ({
  id,
  name,
  profilePicture,
  content,
  order,
}: {
  id: number;
  name: string;
  profilePicture?: string;
  content: string;
  order?: "left" | "right";
}) => {
  return (
    <div className="flex gap-4 bg-transparent px-2">
      <div
        className={`flex flex-col gap-2 ${
          order === "left" ? "order-2" : "order-1"
        }`}
      >
        <h2
          className={`${
            order === "left" ? "text-start" : "text-end"
          } text-base font-semibold`}
        >
          {name}
        </h2>
        <div
          className={`flex ${
            order === "left" ? "justify-start" : "justify-end"
          }`}
        >
          <p className="w-max rounded-md bg-white px-4 py-2  shadow-md">
            {content}
          </p>
        </div>
      </div>
      <div className={`${order === "left" ? "order-1" : "order-2"}`}>
        <Image
          className="rounded-full "
          width={50}
          height={50}
          src={profilePicture ?? ""}
          alt={name}
        />
      </div>
    </div>
  );
};
