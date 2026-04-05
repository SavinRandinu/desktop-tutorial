import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Contact Manager</h1>
        <p className="mt-2 text-lg text-gray-600">Manage your contacts easily and efficiently.</p>
      </div>
      <Image src="/contacts.png" alt="Contacts" width={300} height={300} className="rounded-lg p-4" />
      <div className="text-center">
        <p className="mt-2 text-lg text-gray-600">Start managing your contacts today!</p>
      </div>
    </div>
  );
}
