// This is a server component
import RegisterForm from '@/app/_components/RegisterForm';
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Register</h1>
            <RegisterForm />
            <p className="mt-4 text-center">
                Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterPage;