export default function Home() {
  return (
    <>
      <header>
        <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
          <div className="flex items-center">
            <img src="/opina.png" alt="Logo da opina.com" className="h-10 w-10 mr-2 rounded-full" />
            <span className="font-bold text-lg">Opina</span>
          </div>
          <div>
            <a href="/login" className="mr-4 hover:underline">Login</a>
            <a href="/register" className="hover:underline">Register</a>
          </div>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Opina!</h1>
        <p className="text-lg mb-8">Crie enquetes em segundos e veja as opiniões em tempo real.</p>
        <a href="/login" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Começar</a>
      </main>
      
      <footer className="flex items-center justify-center p-4 bg-gray-200">
        <span className="text-gray-600">&copy; 2024 Opina. Todos os direitos reservados.</span>
        <img src="/opina.png" alt="Logo da opina.com" className="h-6 w-6 ml-2 rounded-full"/>
      </footer>
    </>
  );
}
