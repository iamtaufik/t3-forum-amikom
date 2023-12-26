"use client";
import Loading from "./Loading";
import Error from "./Error";
import { api } from "@/trpc/react";
import Post from "./Post";
import { SessionProvider } from "next-auth/react";

const AllMyPosts = () => {
  const { isLoading, data, isError, refetch } =
    api.post.getAllByUser.useQuery();

  return (
    <>
      <SessionProvider>
        <div className="mb-12 mt-4 flex flex-col gap-4">
          {isError && (
            <Error
              title="Gagal memuat data"
              description="Terjadi kesalahan saat memuat data"
              action={
                <button
                  onClick={() => refetch()}
                  className="rounded-md bg-primary px-4 py-2 text-white"
                >
                  Coba lagi
                </button>
              }
            />
          )}
          {isLoading && <Loading />}
          {data?.map((post) => (
            <Post
              key={post.id}
              name={post.student.name}
              description={post.body}
              id={post.id}
              profilePicture={post.student.image ?? "/blank-profile.png"}
              imagePost={post.image ?? ""}
              author={post.student.email}
              userId={post.student.id}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      </SessionProvider>
    </>
  );
};

export default AllMyPosts;
