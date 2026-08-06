"use server";

import { signIn } from "@/auth";

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") 
        return;

    await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
    });
}