import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-6">
          A página que você está tentando acessar não existe ou foi removida.
        </p>

        <Link
          to="/"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition w-full block"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
