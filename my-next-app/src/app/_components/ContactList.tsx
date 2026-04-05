import React from 'react';
import { ContactType } from '../_types/contact';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import { deleteContactAction } from '../actions/contact';

const ContactList = ({ contacts }: { contacts: ContactType[] }) => {
    return (
        <div className="space-y-4">
            {contacts.map((contact) => (
                <div key={contact.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-semibold">{contact.name}</h2>
                            <p>{contact.email}</p>
                        </div>
                        <div className="flex items-center self-center gap-3">
                            <Link href={`/contact/edit/${contact.id}`} className="flex items-center text-blue-600 gap-2 px-3 py-1 border border-blue-300 rounded-md hover:border-blue-400 hover:bg-blue-100">
                                <FiEdit className="text-blue-600"></FiEdit>
                            </Link>
                            <DeleteButton action={deleteContactAction} contact={contact} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;