import Image from "next/image";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100vw",
      }}
    >
      <Image
        src={"/app/404-saku.png"}
        alt={"404 saku"}
        width={100}
        height={100}
      />
    </main>
  );
}
