import Link from "next/link";
import { getNftsQuery } from "@/lib/gql/queries/nft";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import Image from "./modules/Image";

export const client = new Client({
  url: "https://api.thegraph.com/subgraphs/name/jonassunandar/any-ape-subgraph",
  exchanges: [cacheExchange, fetchExchange],
});

export default async function Home() {
  const nftsRes = await client.query(getNftsQuery, {}).toPromise();
  if (!nftsRes) throw new Error("Failed to fetch NFTs");

  let nfts = nftsRes.data?.listedNFTs;

  return (
    <>
      {nfts?.map((item: any) => (
        <Link key={item.id} href={`./marketplace/${item.id}`}>
          <div className="flex flex-col border border-neutral-500 rounded-xl">
            <Image uri={item.uri} />
            <div className="px-2 py-5 space-y-3">
              <span className="">
                {item.collectionName} # {item.id.split("-")[1]}
              </span>
              <div className="flex justify-between">
                <div className="flex items-center space-x-1 ">
                  <img
                    src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
                    className="h-8"
                  />
                  <span className="text-lg">{Number(item.price) / 1e18}</span>
                </div>
                <button className="py-1 px-5 rounded-lg border border-neutral-600 hover:bg-neutral-600">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
