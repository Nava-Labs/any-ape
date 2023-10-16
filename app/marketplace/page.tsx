import Link from "next/link";
import { getNftsQuery } from "@/lib/gql/queries/nft";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import Image from "./modules/Image";

const nft = {
  tokenId: 1,
};

export const client = new Client({
  url: "https://api.thegraph.com/subgraphs/name/jonassunandar/any-ape-subgraph",
  exchanges: [cacheExchange, fetchExchange],
});

export default async function Home() {
  const nftsRes = await client.query(getNftsQuery, {}).toPromise();
  if (!nftsRes) throw new Error("Failed to fetch NFTs");

  // let nfts = nftsRes.data?.nfts;
  let nfts = [
    {
      id: "0x0cfb5d82be2b949e8fa73a656df91821e2ad99fd-123",
      collectionAddress: "0x0cfb5d82be2b949e8fa73a656df91821e2ad99fd",
      owner: "0x37409a3e9542d4078d6aed82531e4eee9bba165a",
      uri: "https://api.hv-mtl.com/hv/123",
      collectionName: "HV-MTL",
      price: "10,000",
      __typename: "NFT",
    },
    {
      id: "0x0cfb5d82be2b949e8fa73a656df91821e2ad99fd-124",
      collectionAddress: "0x0cfb5d82be2b949e8fa73a656df91821e2ad99fd",
      owner: "0x37409a3e9542d4078d6aed82531e4eee9bba165a",
      uri: "https://api.hv-mtl.com/hv/124",
      collectionName: "HV-MTL",
      price: "20,000",
      __typename: "NFT",
    },
    {
      id: "0x0cfb5d82be2b949e8fa73a656df91821e2ad99fd-125",
      collectionAddress: "0x0cfb5d82be2b949e8fa73a656df91821e2ad99fd",
      owner: "0x37409a3e9542d4078d6aed82531e4eee9bba165a",
      uri: "https://api.hv-mtl.com/hv/125",
      collectionName: "HV-MTL",
      price: "30,000",
      __typename: "NFT",
    },
  ];

  return (
    <>
      {nfts?.map((item: any) => (
        <Link key={item.id} href={`./marketplace/${item.id.slice(-1)}`}>
          <div className="flex flex-col border border-neutral-500 rounded-xl">
            <Image uri={item.uri} />
            <div className="px-2 py-5 space-y-3">
              <span className="">
                {item.collectionName} # {item.id.slice(-1)}
              </span>
              <div className="flex justify-between">
                <div className="flex items-center space-x-1 ">
                  <img
                    src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
                    className="h-8"
                  />
                  <span className="text-lg">{item.price}</span>
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
