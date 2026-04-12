import { ContactType } from "../_types/contact";
import { supabase } from "@/supabase-client";

export const getContacts = async(userId: string) => {
  const { data, error } = await supabase.from("contacts").select("*").eq("userId", userId);
  
  if (error) {
    console.error("Supabase fetch error:", error);
    throw new Error(error.message);
  }
  
  return data;
};

export const getContactById = async(id: string) => {
    const { data, error } = await supabase.from("contacts").select("*").eq("id", id).single();
    
    if (error) {
      console.error("Supabase fetch error:", error);
      throw new Error(error.message);
    }
    
    return data;
}

export const createContact = async (contact: ContactType) => {
    const { data, error } = await supabase.from("contacts").insert([contact]).select();
    
    if (error) {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
    }
    
    return data;
}

export const updateContact = async (id: string, contact: ContactType) => {
    const { data, error } = await supabase.from("contacts").update(contact).eq("id", id).select();
    
    if (error) {
      console.error("Supabase update error:", error);
      throw new Error(error.message);
    }
    
    return data;
}

export const deleteContact = async (id: string) => {
    const { data, error } = await supabase.from("contacts").delete().eq("id", id).select();
    
    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error(error.message);
    }
    
    return data;
}