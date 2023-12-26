import React from "react";
import Post from "./Post";
import { api } from "@/trpc/react";
import Loading from "./Loading";
import { SessionProvider } from "next-auth/react";

const DetailedPost = ({ postId }: { postId: string }) => {
  const { data: post, isLoading } = api.post.getOne.useQuery({
    id: Number(postId),
  });
  return (
    <SessionProvider>
      <div className="flex w-full flex-col items-center px-4 ">
        {isLoading ? (
          <Loading />
        ) : (
          <Post
            userId={post?.student?.id ?? 0}
            name={post?.student?.name ?? ""}
            description={post?.body ?? ""}
            id={post?.id ?? 0}
            profilePicture={post?.student.image ?? "/blank-profile.png"}
            imagePost={post?.image ?? ""}
            isBtnComment={false}
            className="w-full"
            author={post?.student.email ?? ""}
            createdAt={post?.createdAt ?? new Date()}
          />
        )}
      </div>
    </SessionProvider>
  );
};

export default DetailedPost;
