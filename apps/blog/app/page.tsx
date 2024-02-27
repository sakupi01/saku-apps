import Link from "next/link";

export default async function Page() {
  return (
    <main className="flex min-w-screen min-h-[70vh] md:min-h-[80vh]  flex-col items-center justify-center px-14 md:px-24">
      <div className="w-full h-full flex flex-col justify-center max-w-2xl mx-auto">
        <Link href="/dev">
          <h2 className="w-full text-5xl font-bold text-center text-basic my-10 hover:text-blossom hover:scale-110 transition-all duration-400 ease-in-out">
            Techblog
          </h2>
        </Link>
        <Link href="/life">
          <h2 className="w-full text-5xl font-bold text-center text-basic my-10 hover:text-blossom hover:scale-110 transition-all duration-400 ease-in-out">
            Lifeblog
          </h2>
        </Link>
      </div>
    </main>
  );
}
