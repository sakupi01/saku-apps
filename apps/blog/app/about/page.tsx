import Image from "next/image";

export default async function Page() {
  return (
    <main className="flex min-w-screen  min-h-[70vh] md:min-h-[80vh] flex-col items-center justify-center px-24">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <Image
          src={"/icon.png"}
          alt="sakuのアイコン"
          width="200"
          height="200"
        />
        <h1 className="text-5xl font-bold text-left text-basic my-10">
          sakuです
        </h1>
        <p className="text-base text-left text-basic leading-9 tracking-wide ">
          sakuです。
          <br />
          Webフロントエンドの世界にいることが多いです。
          <br />
          旅と自然とコーヒーが好きです。
        </p>
      </div>
    </main>
  );
}
