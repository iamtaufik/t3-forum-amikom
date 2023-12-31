"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { type User } from "@/types/user";

const Tags = [
  {
    id: 1,
    name: "UKM",
  },
  {
    id: 2,
    name: "AMIKOM",
  },
  {
    id: 3,
    name: "Berita",
  },
  {
    id: 4,
    name: "Saran",
  },
] as const;

const AddPost = ({ user }: { user: User }) => {
  const [isActive, setIsActive] = useState<number>(0);
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [myFile, setMyFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const post = api.post.create.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsUploadImage(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileInput = () => {
    fileInputRef.current?.click();
    if (myFile) {
      setIsUploadImage(true);
    }
  };

  const handleDeleteFile = () => {
    setMyFile(undefined);
    setIsUploadImage(false);
    setPreviewURL("");
  };

  return (
    <div className="container min-h-screen max-w-lg bg-gray px-4 pb-4">
      <div className="flex items-center justify-between pt-4">
        <Link href={"/"}>
          <div className={`rounded-full border p-2`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
        <div>
          <button
            className={`cursor-pointer rounded-2xl px-8 py-2 text-lg  ${
              content !== "" && isActive !== 0
                ? "bg-primary text-white"
                : "bg-[#ececec] text-slate-400 "
            } `}
            onClick={() =>
              post.mutate({
                body: content,
                imageBase64: previewURL,
                category: Tags.find((tag) => tag.id === isActive)?.name ?? "",
              })
            }
            disabled={post.isLoading}
          >
            {post.isLoading ? "Memposting..." : "Post"}
          </button>
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-white px-2 py-4">
        <div className=" flex gap-4 ">
          <div>
            <Image
              className=" rounded-full "
              width={50}
              height={50}
              alt={user?.name ?? ""}
              src={user?.image ?? "/blank-profile.png"}
            />
          </div>
          <div className="w-3/4">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              placeholder="Apa yang sedang terjadi?"
              className=" h-36 w-full rounded-lg px-2 py-2 text-base focus-visible:outline-primary focus-visible:ring-1"
            ></textarea>
          </div>
        </div>
        <div className="my-4">
          {isUploadImage && previewURL && (
            <div className="flex">
              <Image
                width={150}
                height={200}
                className=" rounded-2xl"
                src={previewURL}
                alt={"laptop"}
              />
              <div
                className="h-max rounded-full p-2 shadow-md"
                onClick={handleDeleteFile}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="my-4">
          <div
            className={`flex w-max items-center justify-center rounded-full shadow-md ${
              isUploadImage
                ? "bg-secondary text-white"
                : "bg-white text-primary"
            }`}
            onClick={openFileInput}
          >
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              hidden
              name="image"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="m-2 h-6 w-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Tags:</h3>
          <ul className="flex flex-wrap gap-4">
            {Tags.map((tag) => (
              <li
                key={tag.id}
                className={` flex w-max items-center rounded-xl  p-2 shadow-md ${
                  isActive === tag.id ? "bg-secondary text-white" : ""
                }`}
              >
                <input
                  type="checkbox"
                  id={tag.name}
                  className="h-4 w-4 outline-gray "
                  onChange={() => setIsActive(tag.id)}
                  checked={isActive === tag.id}
                />
                <label htmlFor={tag.name} className="mx-2 ">
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
