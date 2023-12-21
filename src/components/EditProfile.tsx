"use client";
import { api } from "@/trpc/react";
import { type User } from "@/types/user";
import { useState } from "react";

const EditProfile = ({ userInfo }: { userInfo: User }) => {
  const [name, setName] = useState(userInfo?.name ?? "");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState(userInfo?.email ?? "");
  const [password, setPassword] = useState("");

  const user = api.user.update.useMutation({
    onSuccess: async () => {
      window.location.href = "/profile";
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        user.mutate({ name, email });
      }}
      action=""
      className="my-4  flex flex-col gap-4"
    >
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
          className="w-full border-primary bg-gray px-4 py-2  font-normal text-black shadow-md focus:border-b-2 focus:bg-white focus:outline-none"
          type="email"
          name="email"
          id="email"
          placeholder={email}
          disabled={user.isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col gap-2 py-1">
        <label htmlFor="password">Password</label>
        <input
          className="w-full border-primary bg-gray px-4 py-2  font-normal text-black shadow-md focus:border-b-2 focus:bg-white focus:outline-none"
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
          Simpan
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
