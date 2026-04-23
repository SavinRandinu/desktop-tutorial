"use server"

import { redirect } from "next/navigation";
import { deleteSessionCookie } from "../_lib/session";
import { supabase } from "@/supabase-client";

export const loginAction = async(formData: FormData) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.get("email") as string,
            password: formData.get("password") as string
        });

        if (error || !data.user) throw new Error(error?.message || "Invalid credentials");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Login error:", errorMessage);
        throw new Error(`Login failed: ${errorMessage}`);
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
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        
        console.log("Register attempt - Email:", email, "Name:", name);
        
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error || !data.user) throw new Error(error?.message || "Registration failed");

        // Create user profile in users table
        const { data: userData, error: profileError } = await supabase
            .from("users")
            .insert({
                id: data.user.id,
                name,
                email
            })
            .select()
            .single();

        if (profileError) throw new Error(profileError.message);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Registration error:", errorMessage);
        throw new Error(`Registration failed: ${errorMessage}`);
    }
    redirect("/contact");
};