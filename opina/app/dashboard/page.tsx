import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logout } from "../actions/auth";

import CreatePollModal from "@/components/CreatePollModal";

export default async function Dashboard() {
    const session = await auth();

    if (!session) 
        redirect("/login");

    return (
        <>  
            <header>
                <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
                <div className="flex items-center">
                    <img src="/opina.png" alt="Logo da opina.com" className="h-10 w-10 mr-2 rounded-full" />
                    <span className="font-bold text-lg">Opina</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-4">{session?.user?.userName?.slice(0, 10)}</span>
                    {session?.user?.image && (
                        <img src={session.user.image} alt="Profile" className="h-10 w-10 rounded-full" />
                    )}
                    <form action={logout} className="ml-8">
                        <button type="submit" className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition">
                            Sair
                        </button>
                    </form>
                </div>
                </nav>
            </header>

            <main>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <CreatePollModal />
                </div>
            </main>

            <footer className="flex items-center justify-center p-4 bg-gray-200">
                <span className="text-gray-600">&copy; 2024 Opina. Todos os direitos reservados.</span>
                <img src="/opina.png" alt="Logo da opina.com" className="h-6 w-6 ml-2 rounded-full"/>
            </footer>
        </>
    );
}   