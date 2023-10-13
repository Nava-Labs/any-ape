import Link from "next/link";

export function Header() {
  return (
    <div className="flex w-full items-center justify-between my-4">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-xl">AnyApe</span>{" "}
          {/* TODO: CHANGE INTO LOGO LATER */}
        </Link>
        <span className="text-base ml-4">Marketplace</span>
      </div>
      <button>0xeD7B...6Afd</button>
    </div>
  );
}
