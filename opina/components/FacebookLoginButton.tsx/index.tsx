"use client";

import { signIn } from "next-auth/react";
import { FaFacebookF } from "react-icons/fa";

export default function FacebookLoginButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("facebook")}
      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
    >
      <FaFacebookF className="text-blue-600" size={20} />
    </button>
  );
}