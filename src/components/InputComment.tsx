"use client";
import { api } from "@/trpc/react";
import { useState } from "react";

interface IProps {
  postId: string;
}

const InputComment = ({ postId }: IProps) => {
  const [body, setBody] = useState("");

  const trpcUtils = api.useUtils();
  const comment = api.comment.create.useMutation({
    onSuccess: async () => {
      setBody("");
      await trpcUtils.comment.getAll.refetch({
        postId: Number(postId),
      });
    },
  });
  return (
    <div className="fixed -bottom-4 left-1/2 h-20 w-full  max-w-lg -translate-x-1/2 transform px-4 ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex  items-center justify-start "
      >
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Tulis Komentar..."
          className="focus-visible:ring-ring placeholder:text-muted-foreground flex h-12 w-full rounded-2xl bg-white  py-1 pl-4 pr-10  text-sm shadow-md transition-colors file:border-0 file:bg-transparent file:text-sm 
          file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={comment.isLoading}
          onClick={() =>
            comment.mutate({
              body,
              postId: Number(postId),
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-10 h-6 w-6 text-primary"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputComment;
