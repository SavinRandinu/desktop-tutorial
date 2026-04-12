"use server"

import { redirect } from "next/navigation";
import { UserType } from "../_types/user";
import { deleteSessionCookie, setSessionCookie } from "../_lib/session";
import { supabase } from "@/supabase-client";

export const loginAction = async(formData: FormData) => {
    // console.log("formData", formData);
    try {
    const response = await supabase.from("users").select("*").eq("email", formData.get("email")).eq("password", formData.get("password") 
    );
    // console.log("API response:", response.data[0]);
    if (!response.data) throw new Error("Invalid credentials");
    const user: UserType = response.data[0];
    // console.log("User found:", user);
    if (!user) throw new Error("Invalid credentials");
    // set user in the cookie
    await setSessionCookie({name: user.name, email: user.email, id: user.id});
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed");
    }
    // Redirect after successful login
    redirect("/contact");
};

export const logoutAction = async() => {
    await deleteSessionCookie();
    redirect("/login");
};

export const registerAction = async(formData: FormData) => {
    try {
        const {data, error} = await supabase.from("users").insert({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }).select();

        if (error) {
            console.error("Registration error:", error);
            throw new Error(error.message);
        }

        const user: UserType = data[0];
        await setSessionCookie({name: user.name, email: user.email, id: user.id});
    } catch (error) {
        console.error("Registration error:", error);
        throw new Error("Registration failed");
    }
    redirect("/contact");
};