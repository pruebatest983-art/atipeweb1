"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const password = formData.get("password") as string;
    const correctPassword = process.env.ADMIN_PASSWORD || "atipe2024";

    if (password === correctPassword) {
        // Set cookie manually
        // Note: In Next.js 15/16 await cookies() is required
        const cookieStore = await cookies();
        cookieStore.set("admin_token", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        redirect("/admin");
    } else {
        return { error: "password_incorrect" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    redirect("/login");
}
