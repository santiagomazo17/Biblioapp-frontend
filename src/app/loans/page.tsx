
import { returnLoan } from "./actions";

type Loan = {
  id: string;
  userId: string;
  loanedAt: string;
  dueAt: string;
  returnedAt: string | null;
  book?: {
    title: string;
    author: string;
  };
};

export default async function LoansPage() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  let loans: Loan[] = [];

  try {
    const response = await fetch(`${apiUrl}/loans`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Error consultando préstamos");
    }

    loans = await response.json();
  } catch {
    return <p>No se pudo conectar con el backend de Biblioapp.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Préstamos de libros
      </h1>

      <p className="text-slate-600">
        Consulta los préstamos y las fechas de devolución.
      </p>

      {loans.length === 0 ? (
        <p>Todavía no hay préstamos registrados.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="rounded-xl border p-5 space-y-3"
            >
              <h2 className="text-xl font-semibold">
                {loan.book?.title ?? "Libro"}
              </h2>

              <p>Usuario: {loan.userId}</p>

              <p>
                Fecha límite:{" "}
                {new Date(loan.dueAt).toLocaleDateString("es-CO")}
              </p>

              <p className="font-medium">
                {loan.returnedAt
                  ? "Devuelto"
                  : "Préstamo activo"}
              </p>

              {!loan.returnedAt && (
                <form action={returnLoan}>
                  <input
                    type="hidden"
                    name="loanId"
                    value={loan.id}
                  />

                  <button
                    type="submit"
                    className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-500"
                  >
                    Devolver libro
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
