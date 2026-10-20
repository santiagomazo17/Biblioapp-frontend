
"use server";

import { revalidatePath } from "next/cache";

export async function createLoan(formData: FormData) {
  const userId = formData.get("userId");
  const bookId = formData.get("bookId");

  if (
    typeof userId !== "string" ||
    !userId.trim() ||
    typeof bookId !== "string" ||
    !bookId.trim()
  ) {
    throw new Error("Debes indicar el usuario y el libro");
  }

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  const response = await fetch(`${apiUrl}/loans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId.trim(),
      bookId: bookId.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo registrar el préstamo");
  }

  revalidatePath("/books");
  revalidatePath("/loans");
}

export async function createBook(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const genre = String(formData.get("genre") ?? "").trim();
  const pages = Number(formData.get("pages"));

  if (
    !title ||
    !author ||
    !genre ||
    !Number.isInteger(pages) ||
    pages <= 0
  ) {
    throw new Error("Los datos del libro no son válidos");
  }

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  const response = await fetch(`${apiUrl}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      author,
      pages,
      genre,
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo registrar el libro");
  }

  revalidatePath("/books");
}
