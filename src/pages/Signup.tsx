"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const user = api.user.register.useMutation({
    onSuccess: () => {
      setEmail("");
      setName("");
      setPassword("");
      router.push("/login");
    },
  });

  return (
    <div className="container min-h-screen max-w-lg bg-gray px-4">
      <div className="flex justify-center py-16">
        <Image
          src={"/forum-amikom-logo.webp"}
          alt="logo"
          width="150"
          height="150"
          className="rounded-md shadow-xl"
        />
      </div>
      <h2 className="text-3xl font-semibold text-primary">Welcome!</h2>
      <p className="text-sm">Buat akun kamu untuk mengakses forum amikom</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          user.mutate({ email, name, password });
        }}
        className="mt-10 flex flex-col gap-6"
      >
        <div>
          <input
            className="w-full rounded-3xl px-6 py-2 text-base shadow-md outline-primary ring-2 ring-primary"
            type="email"
            placeholder="Email amikom kamu"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-full rounded-3xl px-6 py-2 text-base shadow-md outline-primary ring-2 ring-primary"
            type="text"
            placeholder="Nama kamu"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-full rounded-3xl px-6 py-2 text-base shadow-md outline-primary ring-2 ring-primary"
            type="password"
            placeholder="Kata sandi"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-center">
          <button
            type="submit"
            className="w-max rounded-3xl bg-primary px-10 py-2 font-semibold text-white shadow-md"
            disabled={user.isLoading}
          >
            {user.isLoading ? "Loading" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
