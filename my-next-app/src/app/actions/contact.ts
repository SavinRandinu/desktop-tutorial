"use server"

import { revalidatePath } from "next/cache";
import { createContact, deleteContact, updateContact } from "../api/contact";
import { getSessionCookie } from "../_lib/session";
import { ContactType } from "../_types/contact";
import { create } from "domain";

export const createContactAction = async(prevState:any, formData: FormData) => {
    if(!formData || !formData.get("name") || !formData.get("email")) {
        return {error: "Form data is required"};
    }

    const user = await getSessionCookie();

    const newContact:ContactType = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        userId: user?.id
    };

    try {
        await createContact(newContact);
        revalidatePath("/contact");
        return {success: true};
    } catch (error) {
        console.error("Create contact error:", error);
        return {error: "Failed to create contact"};
    }
};

export const updateContactAction = async(prevState:any, formData: FormData) => {
    const user = await getSessionCookie();
    const id = formData.get("id") as string;

    const updatedContact:ContactType = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        userId: user?.id
    };

    try {
        await updateContact(id, updatedContact);
        revalidatePath("/contact");
        return {success: true};
    } catch (error) {
        console.error("Update contact error:", error);
        return {error: "Failed to update contact"};
    } 
};

export const deleteContactAction = async(prevState:any, formData: FormData) => {
    const id = formData.get("id") as string;
    try {
        await deleteContact(id);
        revalidatePath("/contact");
        return {success: true};
    } catch (error) {
        console.error("Delete contact error:", error);
        return {error: "Failed to delete contact"};
    }
};