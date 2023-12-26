"use client";
import { api } from "@/trpc/react";
import { type User } from "@/types/user";
import Image from "next/image";
import { useRef, useState } from "react";

const EditProfile = ({ userInfo }: { userInfo: User }) => {
  const [name, setName] = useState(userInfo?.name ?? "");
  const [nim, setNim] = useState(userInfo?.profile?.nim ?? "");
  const [myFile, setMyFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState<string>(userInfo?.image ?? "");
  const [password, setPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = api.user.update.useMutation({
    onSuccess: async () => {
      window.location.href = "/profile";
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        user.mutate({ name, nim, imageBase64: previewURL });
      }}
      action=""
      className="my-4  flex flex-col gap-4"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <Image
          className="rounded-full"
          src={previewURL}
          width={120}
          height={120}
          alt={userInfo.name ?? ""}
        />
        <button
          type="button"
          onClick={openFileInput}
          className="font-medium text-primary"
        >
          {" "}
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            hidden
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          Edit Foto Profile
        </button>
      </div>
      <div className="flex w-full flex-col gap-2 py-1">
        <label htmlFor="name">Nama</label>
        <input
          className="w-full border-primary bg-gray px-4 py-2  font-normal text-black shadow-md focus:border-b-2 focus:bg-white focus:outline-none"
          type="text"
          name="name"
          id="name"
          placeholder={name}
          value={name}
          disabled={user.isLoading}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col gap-2 py-1">
        <label htmlFor="nim">NIM</label>
        <input
          className="w-full border-primary bg-gray px-4 py-2  font-normal text-black shadow-md focus:border-b-2 focus:bg-white focus:outline-none"
          type="text"
          name="nim"
          id="nim"
          placeholder={nim}
          disabled={user.isLoading}
          value={nim}
          onChange={(e) => setNim(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col gap-2 py-1">
        <label htmlFor="email">Email</label>
        <input
          className="w-full border-primary bg-gray px-4 py-2 font-normal  text-black shadow-md focus:border-b-2 focus:bg-white focus:outline-none disabled:text-zinc-500"
          type="email"
          name="email"
          id="email"
          disabled
          value={userInfo?.email ?? ""}
        />
      </div>
      <div className="flex w-full flex-col gap-2 py-1">
        <label htmlFor="password">Password</label>
        <input
          className="w-full border-primary bg-gray px-4 py-2 font-normal  text-black shadow-md focus:border-b-2 focus:bg-white focus:outline-none "
          type="password"
          name="password"
          id="password"
          placeholder={password}
          disabled={user.isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-8 flex w-full gap-4 px-4">
        <button className="w-full rounded-3xl border border-primary py-2 text-primary shadow-md">
          Batalkan
        </button>
        <button
          type="submit"
          className="w-full rounded-3xl bg-primary py-2 text-white shadow-md"
          disabled={user.isLoading}
        >
          {user.isLoading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
