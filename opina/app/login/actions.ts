"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function login(
    previousState: {
        success: boolean;
        message: string;
    } | null,
    formData: FormData
) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
        return {
            success: false,
            message: "Dados inválidos.",
        };
    }

    if (!email.trim() || !password) {
        return {
            success: false,
            message: "Preencha o e-mail e a senha.",
        };
    }

    try {
        await signIn("credentials", {
            email: email.trim(),
            password,
            redirectTo: "/dashboard",
        });

        return {
            success: true,
            message: "Login realizado com sucesso!",
        };
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                success: false,
                message: "E-mail ou senha incorretos.",
            };
        }

        throw error;
    }
}