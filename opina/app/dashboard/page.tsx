export default function Dashboard() {
    return (
        <>  
            <header>
                <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
                <div className="flex items-center">
                    <img src="/opina.png" alt="Logo da opina.com" className="h-10 w-10 mr-2 rounded-full" />
                    <span className="font-bold text-lg">Opina</span>
                </div>
                <div>
                    <span className="mr-4">User01</span>
                </div>
                </nav>
            </header>

            <main>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Criar enquete</button>
                </div>
            </main>

            <footer className="flex items-center justify-center p-4 bg-gray-200">
                <span className="text-gray-600">&copy; 2024 Opina. Todos os direitos reservados.</span>
                <img src="/opina.png" alt="Logo da opina.com" className="h-6 w-6 ml-2 rounded-full"/>
            </footer>
        </>
    );
}   