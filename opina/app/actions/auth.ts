"use server";

import { signOut } from "@/auth";
import argon2 from "argon2";

export async function logout() {
    await signOut();
}

export async function register(formData: FormData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (
        !username ||
        !email ||
        !password ||
        !confirmPassword
    ) {
        console.log("Todos os campos são obrigatórios");
        return;
    }

    if (
        typeof username !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof confirmPassword !== "string"
    ) {
        console.log("Dados inválidos");
        return;
    }

    if (password !== confirmPassword) 
    {
        console.log("As senhas não coincidem");
        return;
    }

    if (password.length < 8) 
    {
        console.log("A senha deve possuir pelo menos 8 caracteres");
        return;
    }

    const passwordHash = await argon2.hash(password);
}