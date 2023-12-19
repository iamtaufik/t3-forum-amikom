import React from "react";
import Post from "./Post";
import { api } from "@/trpc/react";
import Loading from "./Loading";

const DetailedPost = ({ postId }: { postId: string }) => {
  const { data: post, isLoading } = api.post.getOne.useQuery({
    id: Number(postId),
  });
  return (
    <div className="flex w-full flex-col items-center px-4 ">
      {isLoading ? (
        <Loading />
      ) : (
        <Post
          name={post?.student?.name ?? ""}
          description={post?.body ?? ""}
          id={post?.id ?? 0}
          profilePicture={post?.student.image ?? "/blank-profile.png"}
          imagePost={post?.image ?? ""}
          isBtnComment={false}
          className="w-full"
        />
      )}
    </div>
  );
};

export default DetailedPost;
