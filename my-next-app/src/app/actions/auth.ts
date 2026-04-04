"use server"

import axios from "axios"
import { redirect } from "next/navigation";
import { userType } from "../_types/user";

const API_URL = "http://localhost:3001";

export const loginAction = async(prevState: any, formData: FormData) => {
    console.log("loginAction called with formData:", Object.fromEntries(formData));
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Extracted - Email:", email, "Password:", password);

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
        console.log("API Response:", response.data);
        const user: userType = response.data[0];
        console.log("User found:", user);
        if (!user) {
            return { error: "Invalid credentials" };
        }
        // Return success instead of redirecting
        return { success: true, user };
    } catch (error) {
        console.error("Login error:", error);
        return { error: "Login failed" };
    }
};

export const logout = async() => {
    redirect("/login");
}