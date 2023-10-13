import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      {/* <Link href={`./[assetId]/page.tsx`}> */}
      <div className="flex flex-col border border-neutral-500 rounded-xl">
        <img src="../nft.png" className="h-80 hover:transition" />
        <div className="px-2 py-5 space-y-3">
          <span className="">Bored Ape Yacht Club #7913</span>
          <div className="flex justify-between">
            <div className="flex items-center space-x-1 ">
              <img
                src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
                className="h-8"
              />
              <span className="text-lg">10,000</span>
            </div>
            <button className="py-1 px-5 rounded-lg border border-neutral-600 hover:bg-neutral-600">
              Buy
            </button>
          </div>
        </div>
      </div>
      {/* </Link> */}

      <div className="flex flex-col border border-neutral-500 rounded-xl">
        <img src="../nft.png" className="h-80 hover:transition" />
        <div className="px-2 py-5 space-y-3">
          <span className="">Bored Ape Yacht Club #7913</span>
          <div className="flex justify-between">
            <div className="flex items-center space-x-1 ">
              <img
                src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
                className="h-8"
              />
              <span className="text-lg">10,000</span>
            </div>
            <button className="py-1 px-5 rounded-lg border border-neutral-600 hover:bg-neutral-600">
              Buy
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col border border-neutral-500 rounded-xl">
        <img src="../nft.png" className="h-80" />
        <div className="px-2 py-5 space-y-3">
          <span className="">Bored Ape Yacht Club #7913</span>
          <div className="flex justify-between">
            <div className="flex items-center space-x-1 ">
              <img
                src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
                className="h-8"
              />
              <span className="text-lg">10,000</span>
            </div>
            <button className="py-1 px-5 rounded-lg border border-neutral-600 hover:bg-neutral-600">
              Buy
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
