import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Register Project
      </h1>
      <div className="my-8">
        <Link href="/register">Register</Link> <br />
      </div>
    </section>
  );
}
