import React from 'react';
import { getSessionCookie } from '../_lib/session';
import { redirect } from 'next/navigation';
import { getContacts } from '../api/contact';
import ContactList from '../_components/ContactList';

const ContactPage = async () => {
    const user = await getSessionCookie();
    if (!user) {
        return (
            <div>
                Please {" "}
                <a href="/login" className="text-blue-600 hover:underline">
                    login
                </a> {" "}
                to view contacts.
            </div>
        );
    }
    const contacts = await getContacts(user?.id);
    console.log("Contacts:", contacts);
    if (!contacts || contacts.length === 0) {
        return (
            <div>
                Please {" "}
                <a href="/contact/new" className="text-blue-600 hover:underline">
                    add a contact
                </a> {" "}
                to your contact list.
            </div>
        );
    }
    return <div>
        <div className="flex justify-between items-center mb-6">
            <h1>Your Contacts</h1>
            <a href="/contact/new" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Add Contact
            </a>
        </div>
        <ContactList contacts={contacts} />
    </div>;
};

export default ContactPage;