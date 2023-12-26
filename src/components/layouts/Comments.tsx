"use client";
import Comment from "@/components/Comment";
import InputComment from "@/components/InputComment";
import Link from "next/link";
import Error from "@/components/Error";
import { api } from "@/trpc/react";
import DetailedPost from "@/components/DetailedPost";

interface IProps {
  postId: string;
  email: string;
}

const Comments = ({ postId, email }: IProps) => {
  const { data, isLoading, isError, refetch } = api.comment.getAll.useQuery({
    postId: Number(postId),
  });
  return (
    <>
      <div className="container relative flex min-h-screen max-w-lg flex-col items-center bg-gray px-4 pb-6 ">
        <div className="my-2 flex w-full justify-start px-4">
          <Link href={"/"} className="w-max">
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
        <DetailedPost postId={postId} />
        <div className="mb-16 mt-4 flex w-full flex-col gap-2 px-4">
          {isError && (
            <Error
              title="Gagal memuat komentar"
              description="Silahkan coba lagi"
              action={
                <button
                  onClick={() => refetch()}
                  className="rounded-xl bg-primary p-2 px-4 font-semibold text-white"
                >
                  Coba lagi
                </button>
              }
            />
          )}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          )}
          {data && data.length === 0 && (
            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold text-primary">
                Belum ada komentar
              </span>
              <span className="text-slate-400">
                Jadilah orang pertama yang berkomentar
              </span>
            </div>
          )}
          {data?.map((comment) => (
            <div
              key={comment.id}
              className={`flex  w-full ${
                comment.student.email === email
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <Comment
                id={comment.id}
                name={comment.student.name}
                profilePicture={comment.student.image ?? "/blank-profile.png"}
                content={comment.body}
                order={comment.student.email !== email ? "left" : "right"}
                createdAt={comment.createdAt}
              />
            </div>
          ))}
        </div>
        <InputComment postId={postId} />
      </div>
    </>
  );
};

export default Comments;
