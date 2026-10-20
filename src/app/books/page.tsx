
import { createLoan, createBook } from "./actions";

type Book = {
  id: string;
  title: string;
  author: string;
  pages?: number;
  genre?: string;
  available: boolean;
  isActive: boolean;
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Obtener lo que escribió el usuario en el buscador
  const { q } = await searchParams;
  const search = (q ?? "").trim().toLowerCase();

  // Dirección de nuestro backend
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  let books: Book[] = [];

  // Consultar los libros del backend
  try {
    const response = await fetch(`${apiUrl}/books`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("No se pudieron consultar los libros");
    }

    books = await response.json();
  } catch {
    return <p>No se pudo conectar con el backend de Biblioapp.</p>;
  }

  // NUEVO: Filtrar libros por título o autor
  const filteredBooks = books.filter((book) => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();

    return title.includes(search) || author.includes(search);
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-4 text-3xl font-bold">
        Catálogo de libros
      </h1>
      
    <div className="mb-8 rounded-xl border border-slate-300 bg-white/70 p-6 shadow-sm">
    <h2 className="mb-4 text-2xl font-bold">
        Registrar nuevo libro
    </h2>

    <form action={createBook} className="space-y-4">
        <div>
        <label className="mb-1 block font-medium">
            Título del libro
        </label>
        <input
            type="text"
            name="title"
            placeholder="Ejemplo: El Principito"
            required
            className="w-full rounded-lg border p-3"
        />
        </div>

        <div>
        <label className="mb-1 block font-medium">
            Autor
        </label>
        <input
            type="text"
            name="author"
            placeholder="Ejemplo: Antoine de Saint-Exupéry"
            required
            className="w-full rounded-lg border p-3"
        />
        </div>

        <div>
        <label className="mb-1 block font-medium">
            Número de páginas
        </label>
        <input
            type="number"
            name="pages"
            placeholder="Ejemplo: 96"
            min="1"
            step="1"
            required
            className="w-full rounded-lg border p-3"
        />
        </div>

        <div>
        <label className="mb-1 block font-medium">
            Género
        </label>
        <input
            type="text"
            name="genre"
            placeholder="Ejemplo: Novela"
            required
            className="w-full rounded-lg border p-3"
        />
        </div>

        <button
        type="submit"
        className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-900 hover:bg-amber-500"
        >
        + Registrar libro
        </button>
    </form>
    </div>



      {search && (
        <p className="mb-4 text-slate-600">
          Resultados para: "{q}"
        </p>
      )}

      {filteredBooks.length === 0 ? (
        <p>
          {search
            ? "No se encontraron libros con esa búsqueda."
            : "Todavía no hay libros registrados en la biblioteca."}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-xl border p-5 space-y-3"
            >
              <h2 className="text-xl font-semibold">
                {book.title}
              </h2>

              <p>Autor: {book.author}</p>
              <p>Género: {book.genre ?? "Sin especificar"}</p>

              <p
                className={
                  book.available
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-600"
                }
              >
                {book.available
                  ? "Disponible"
                  : "No disponible"}
              </p>

              {book.available && (
                <form action={createLoan} className="space-y-3">
                  <input
                    type="hidden"
                    name="bookId"
                    value={book.id}
                  />

                  <input
                    type="text"
                    name="userId"
                    placeholder="Número de identificación"
                    required
                    className="w-full rounded-lg border p-3"
                  />

                  <button
                    type="submit"
                    className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-500"
                  >
                    Prestar libro
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
