"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function GoogleLoginButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
    >
      <FaGoogle className="text-red-500" size={20} />
    </button>
  );
}