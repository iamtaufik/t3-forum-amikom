"use client";
import Comment from "./Comment";
import { api } from "@/trpc/react";

const CommentsList = () => {
  const { data } = api.comment.getAllByUser.useQuery();
  return (
    <>
      {data?.length === 0 && (
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold text-primary">Belum ada komentar</span>
          <span className="text-slate-400">Buat komentar pertama anda</span>
        </div>
      )}
      <div className="flex w-full flex-col items-end">
        {data?.map((comment, index) => (
          <Comment
            key={index}
            name={comment.student.name}
            id={comment.id}
            profilePicture={comment.student.image ?? "/blank-profile.png"}
            content={comment.body}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default CommentsList;
