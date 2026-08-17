"use client";

import { useActionState } from "react";
import SocialLoginButton from "@/components/SocialLoginButton.tsx";
import { registerUser } from "./actions";

import Link from "next/link";

export default function Register() {
    const [state, formAction, isPending] = useActionState(
        registerUser,
        null
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Criar Conta
                </h1>

                <form action={formAction} className="space-y-4">

                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nome de Usuário
                        </label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            E-mail
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Senha
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirmar Senha
                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    {state && (
                        <div
                            className={`rounded-md p-3 text-sm ${
                                state.success
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {state.message}
                        </div>
                    )}

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>

                <div className="flex justify-center items-center mt-6">
                    <span className="text-sm text-gray-600">
                        Já tem uma conta?{" "}
                        <Link
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Entrar
                        </Link>
                    </span>
                </div>

                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>

                    <span className="px-4 text-sm text-gray-500">
                        ou
                    </span>

                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <div className="flex justify-center gap-4">
                    <SocialLoginButton provider="google" />
                    <SocialLoginButton provider="facebook" />
                </div>

            </div>
        </div>
    );
}