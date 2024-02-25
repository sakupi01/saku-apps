import Image from "next/image";

export default async function Page() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-center p-24">
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
          今年からお仕事頑張ります。
          <br />
          旅とコーヒーが好きです。
        </p>
      </div>
    </main>
  );
}
