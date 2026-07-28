import SocialLoginButton from "@/components/SocialLoginButton.tsx";
import { Mail, Lock } from "lucide-react";

export default function Login() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
			<div className="flex flex-col justify-center items-center bg-blue-100 p-8">
				<div className="flex flex-col items-center">
					<div className="w-28 h-28 rounded-full border-4 border-blue-500 overflow-hidden">
							<img
								src="/opina.png"
								alt="Logo"
								className="w-full h-full object-cover"
							/>
					</div>
					<p className="mt-5 text-lg">Crie enquetes em segundos e veja as opiniões em tempo real.</p>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center bg-gray-100 p-8">
				<form className="flex flex-col justify-center items-center h-full p-8 bg-white w-100 rounded-2xl shadow-md" >
					<h1 className="text-3xl font-extrabold tracking-tight text-blue-500 mb-2">Bem-vindo de volta!</h1>
					<div className="flex flex-col gap-4 mt-4 w-full max-w-sm">
						<div className="relative">
							<Mail
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								size={20}
							/>
							<input
								type="email"
								placeholder="E-mail"
								className="w-full pl-10 pr-4 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>

						<div className="relative">
							<Lock
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								size={20}
							/>
							<input
								type="password"
								placeholder="Password"
								className="w-full pl-10 pr-4 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>
					</div>
					<div className="flex justify-end w-full max-w-sm mt-2">
						<a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Esqueceu a senha?</a>
					</div>
					<div className="flex flex-col gap-4 mt-4 w-full max-w-sm">
						<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Entrar</button>
					</div>
					
					<div className="flex justify-center w-full max-w-sm mt-2">
						<p className="text-sm text-gray-600 text-center">
								Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Cadastre-se</a>
						</p>
					</div>

					<div className="flex items-center my-6 w-full max-w-sm">
						<div className="flex-1 border-t border-gray-300"></div>
						<span className="px-4 text-sm text-gray-500">ou</span>
						<div className="flex-1 border-t border-gray-300"></div>
					</div>

					<div className="flex justify-center gap-4">
						<SocialLoginButton provider="google" />
						<SocialLoginButton provider="facebook" />
					</div>
				</form>
			</div>
		</div>
	);
}