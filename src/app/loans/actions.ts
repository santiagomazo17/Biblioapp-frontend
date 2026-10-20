
"use server";

import { revalidatePath } from "next/cache";

export async function returnLoan(formData: FormData) {
  const loanId = formData.get("loanId");

  if (typeof loanId !== "string" || !loanId) {
    throw new Error("ID del préstamo inválido");
  }

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  const response = await fetch(
    `${apiUrl}/loans/${encodeURIComponent(loanId)}/return`,
    {
      method: "PUT",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo devolver el libro");
  }

  revalidatePath("/loans");
}
