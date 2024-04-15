"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/store/store";
import { useLoginUser } from "@/services/mutation";

const Login = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const loginUserMutation = useLoginUser();
  const {user} = useAuthStore((store) => store);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    loginUserMutation.mutate({ userName, password });
  }

  return (
    <div className="bg-black min-h-screen">
      <form className="p-5 flex min-h-screen items-center justify-center flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          className="w-96 max-w-full p-5 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-white text-2xl font-bold"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-96 max-w-full p-5 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-white text-2xl font-bold"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="w-96 max-w-full h-16 border-2 border-solid border-green-500 bg-green-500 rounded-lg cursor-pointer text-white text-base font-normal"
          onClick={handleSubmit}
        >
          Login
        </button>
      <Link href="/register" className="text-white">Don&apos;t have an account? Register</Link>
      </form>
    </div>
  );
};

export default Login;
