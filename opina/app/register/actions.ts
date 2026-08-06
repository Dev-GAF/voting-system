"use server";

import { prisma } from "@/lib/prisma";
import argon2 from "argon2";
import { z } from "zod";

const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
            .max(30, "O nome de usuário deve ter no máximo 30 caracteres"),

        email: z
            .string()
            .email("Digite um e-mail válido"),

        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres"),

        confirmPassword: z
            .string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
});

export async function registerUser(formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };

    const result = registerSchema.safeParse(data);

    if (!result.success) 
    {
        console.log(result.error.issues);
        return;
    }

    const { username, email, password } = result.data;

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username },
            ],
        },
    });

    if (existingUser) 
    {
        console.log("Usuário ou e-mail já cadastrado");
        return;
    }

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            passwordHash,
        },
    });

    return;
}