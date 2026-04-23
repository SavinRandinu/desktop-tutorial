import { UserType } from "../_types/user";
import { supabase } from "@/supabase-client";

// Get session cookie - Check Supabase auth and fetch user profile from DB
export const getSessionCookie = async(): Promise<UserType | null> => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return null;
    
    // Fetch user profile from database using authenticated user ID
    const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.session.user.id)
        .single();
    
    if (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
    
    console.log("Session user:", userData);
    return userData;
};

// Delete session - Sign out from Supabase
export const deleteSessionCookie = async() => {
    await supabase.auth.signOut();
};