import Image from "next/image";

export default async function Page() {
  return (
    <main className="flex min-w-screen  min-h-[70vh] md:min-h-[80vh] flex-col items-center justify-center px-24">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <Image
          src={"/app/icon.png"}
          alt="sakuのアイコン"
          width="200"
          height="200"
        />
        <p className="text-base text-left text-basic leading-9 tracking-wide mb-10">
          sakuです。
          <br />
          Webの世界にいることが多いです。
          <br />
          旅と自然とコーヒーが好きです。
        </p>
        <a
          href="https://sakupi01.com/"
          className="text-blossom text-center leading-9 tracking-wide hover:underline"
        >
          Portfolio
        </a>
        <a
          href="https://sakupi01.github.io/slides/"
          className="text-blossom text-center leading-9 tracking-wide hover:underline"
        >
          slides
        </a>
        <a
          href="https://zenn.dev/s_a_k_u"
          className="text-blossom text-center leading-9 tracking-wide hover:underline"
        >
          Zenn
        </a>
        <a
          href="https://github.com/sakupi01/"
          className="text-blossom text-center leading-9 tracking-wide hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://x.com/sakupi01/"
          className="text-blossom text-center leading-9 tracking-wide hover:underline"
        >
          X
        </a>
      </div>
    </main>
  );
}
