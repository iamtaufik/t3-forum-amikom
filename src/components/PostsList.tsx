"use client";
import React, { useState } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { api } from "@/trpc/react";
import Label from "./Label";
import Post from "./Post";
import { SessionProvider } from "next-auth/react";
import { useDebounce } from "use-debounce";
import Navbar from "./Navbar";

const Categories = ["Terbaru", "UKM", "AMIKOM", "Berita", "Saran"] as const;

const PostsList = () => {
  const [isActive, setIsActive] =
    useState<(typeof Categories)[number]>("Terbaru");
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 1000);
  const { isLoading, data, isError, refetch } = api.post.getAll.useQuery({
    query: debouncedSearch,
  });

  return (
    <>
      <SessionProvider>
        <Navbar search={search} setSearch={setSearch} />
        <div className="flex justify-between gap-x-2 overflow-x-auto py-2">
          {Categories.map((category) => (
            <Label
              key={category}
              text={category}
              className={`${
                isActive === category
                  ? "bg-secondary text-white"
                  : "bg-white text-dark "
              }`}
              onClick={() => setIsActive(category)}
            />
          ))}
        </div>
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
          {isActive !== "Terbaru" &&
            data
              ?.filter((post) => post.category === isActive)
              .map((post) => (
                <Post
                  key={post.id}
                  name={post.student.name}
                  description={post.body}
                  id={post.id}
                  profilePicture={post.student.image ?? "/blank-profile.png"}
                  imagePost={post.image ?? ""}
                  author={post.student.email}
                />
              ))}
          {data?.length === 0 && (
            <div className="text-muted-foreground text-center">
              Post tidak ditemukan
            </div>
          )}

          {isActive === "Terbaru" &&
            data?.map((post) => (
              <Post
                key={post.id}
                name={post.student.name}
                description={post.body}
                id={post.id}
                profilePicture={post.student.image ?? "/blank-profile.png"}
                imagePost={post.image ?? ""}
                author={post.student.email}
              />
            ))}
        </div>
      </SessionProvider>
    </>
  );
};

export default PostsList;
