"use server"

import axios from "axios"
import { redirect } from "next/navigation";
import { UserType } from "../_types/user";

const API_URL = "http://localhost:3001";

export const loginAction = async(formData: FormData) => {
    console.log("formData", formData);
    try {
        const response = await axios.get(`${API_URL}/users?email=${formData.get("email")}&password=${formData.get("password")}` 
    );
    console.log("API response:", response.data[0]);
    const user: UserType = response.data[0];
    console.log("User found:", user);
    if (!user) throw new Error("Invalid credentials");
    // set user in the cookie
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed");
    }
    // Redirect after successful login
    redirect("/contact");
};

export const logout = async() => {
    redirect("/login");
};