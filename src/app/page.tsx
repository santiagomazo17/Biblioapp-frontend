
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">

      {/* BIENVENIDA PRINCIPAL */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 px-8 py-16 text-white shadow-xl md:px-12">

        <div className="relative z-10 max-w-3xl">
          <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200">
            📚 BIBLIOAPP • BIBLIOTECA DIGITAL
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-tight md:text-6xl">
            Tu biblioteca.
            <br />
            <span className="text-amber-300">
              Un mundo por descubrir.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Explora nuestro catálogo de libros, encuentra tus
            próximas lecturas y gestiona tus préstamos de
            manera fácil, rápida y organizada.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/books"
              className="rounded-full bg-amber-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              Explorar catálogo →
            </Link>

            <Link
              href="/loans"
              className="rounded-full border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white transition hover:bg-white/20"
            >
              Ver préstamos
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIONES DE LA BIBLIOTECA */}
      <section className="grid gap-6 md:grid-cols-3">

        <Link
          href="/books"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-5 text-4xl">📚</div>
          <h2 className="text-2xl font-bold">
            Catálogo de libros
          </h2>
          <p className="mt-3 text-slate-600">
            Descubre libros, busca por título o autor y
            consulta cuáles están disponibles.
          </p>
          <p className="mt-6 font-semibold text-emerald-600">
            Explorar libros →
          </p>
        </Link>

        <Link
          href="/users"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-5 text-4xl">👥</div>
          <h2 className="text-2xl font-bold">
            Usuarios
          </h2>
          <p className="mt-3 text-slate-600">
            Registra nuevos lectores y consulta
            la información de los usuarios.
          </p>
          <p className="mt-6 font-semibold text-blue-600">
            Gestionar usuarios →
          </p>
        </Link>

        <Link
          href="/loans"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-5 text-4xl">📖</div>
          <h2 className="text-2xl font-bold">
            Préstamos
          </h2>
          <p className="mt-3 text-slate-600">
            Consulta los préstamos activos,
            revisa las fechas y devuelve libros.
          </p>
          <p className="mt-6 font-semibold text-violet-600">
            Ver préstamos →
          </p>
        </Link>
      </section>

      {/* INFORMACIÓN ADICIONAL */}
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-8">
        <h2 className="text-2xl font-bold">
          Bienvenido a Biblioapp
        </h2>

        <p className="mt-3 text-slate-600">
          Nuestra biblioteca digital facilita la
          administración de libros, usuarios y préstamos.
          Encuentra lo que buscas y disfruta de una
          experiencia de lectura organizada.
        </p>
      </section>

    </div>
  );
}
