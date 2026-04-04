import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
                Contact Manager
            </Link>
        </div>
    </nav>;
};

export default Navbar;