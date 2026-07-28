"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

type Provider = "google" | "facebook";

type SocialLoginButtonProps = {
  provider: Provider;
};

export default function SocialLoginButton({ provider }: SocialLoginButtonProps) {

  const providers = {
    google:   { icon: <FaGoogle className="text-red-500" size={20} /> },
    facebook: { icon: <FaFacebookF className="text-blue-600" size={20} /> }
  };

  return (
    <button
      type="button"
      onClick={() => signIn(provider, { callbackUrl: "/dashboard" })}
      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
    >
      {providers[provider].icon}
    </button>
  );
}