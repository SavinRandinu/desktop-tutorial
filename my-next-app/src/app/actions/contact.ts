"use server"

import { revalidatePath } from "next/cache";
import { deleteContact } from "../api/contact";

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