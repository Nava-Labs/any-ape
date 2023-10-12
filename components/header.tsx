import Link from "next/link";

export function Header() {
  return (
    <div className="container mx-auto py-5 sm:py-10">
      <header className="flex items-center md:justify-between gap-x-5">
        <Link href="/" className="flex items-center space-x-2 z-[100]">
          {/* <img src="" /> */}
          <span className="text-base font-bold md:inline mr-10 opacity-90">
            AnyApe
          </span>
        </Link>
      </header>
    </div>
  );
}
