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
import InfiniteScroll from "react-infinite-scroll-component";
import { type $Enums } from "@prisma/client";

const Categories = ["Terbaru", "UKM", "AMIKOM", "Berita", "Saran"] as const;

const PostsList = () => {
  const [isActive, setIsActive] =
    useState<(typeof Categories)[number]>("Terbaru");
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 1000);

  const post = api.post.infiniteFeed.useInfiniteQuery(
    {
      query: debouncedSearch,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

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
          {post.isError && (
            <Error
              title="Gagal memuat data"
              description="Terjadi kesalahan saat memuat data"
              action={
                <button
                  onClick={() => post.refetch()}
                  className="rounded-md bg-primary px-4 py-2 text-white"
                >
                  Coba lagi
                </button>
              }
            />
          )}

          {post.data?.pages.flatMap((page) => page.posts).length === 0 && (
            <div className="text-muted-foreground text-center">
              Post tidak ditemukan
            </div>
          )}

          <InfiniteFeedList
            posts={
              isActive === "Terbaru"
                ? post.data?.pages.flatMap((page) => page.posts)
                : post.data?.pages.flatMap((page) =>
                    page.posts.filter((post) => post.category === isActive),
                  )
            }
            hasMore={post.hasNextPage ?? false}
            fetchNewPosts={post.fetchNextPage}
          />
        </div>
      </SessionProvider>
    </>
  );
};

export default PostsList;

type Post = {
  id: number;
  body: string;
  image: string | null;
  student_id: number;
  category: $Enums.Category;
  createdAt: Date;
  updatedAt: Date;
  student: {
    id: number;
    name: string;
    email: string;
    password: string | null;
    googleId: string | null;
    image: string | null;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

const InfiniteFeedList = ({
  posts,
  hasMore,
  fetchNewPosts,
}: {
  posts?: Post[];
  hasMore: boolean;
  fetchNewPosts: () => void;
}) => {
  return (
    <>
      <SessionProvider>
        {/* <Navbar  /> */}
        <InfiniteScroll
          dataLength={posts?.length ?? 0}
          next={fetchNewPosts}
          hasMore={hasMore}
          loader={<Loading />}
          className="flex flex-col gap-4"
        >
          {posts?.map((post) => (
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
        </InfiniteScroll>
      </SessionProvider>
    </>
  );
};
