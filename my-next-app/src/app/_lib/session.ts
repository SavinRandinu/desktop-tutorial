import { cookies } from "next/headers";
import { UserType } from "../_types/user";

// Set session cookie
export const setSessionCookie = async(user: UserType) => {
    (await cookies()).set("session", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });
};

// Get session cookie
export const getSessionCookie = async(): Promise<UserType | null> => {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) return null;
    return JSON.parse(sessionCookie) as UserType;
};

// Delete session cookie
export const deleteSessionCookie = async() => {
    const cookieStore = await cookies();
    cookieStore.delete("session");
};