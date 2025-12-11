"use server";

import { cookies } from "next/headers";

export const loginAction = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!res.ok) return { error: "Login Failed!!" };
    const rawSetCookie = res.headers.get("set-cookie");
    if (rawSetCookie) {
      const tokenMatch = rawSetCookie.match(/token=([^;]+)/);
      const token = tokenMatch ? tokenMatch[1] : null;

      if (token) {
        (await cookies()).set("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
          maxAge: 2592000, // 30 days
        });
      }
    }

    return { success: "Login Success" };
  } catch (err) {
    console.error("Login failed:", err);
    return { error: "Something went wrong" };
  }
};
