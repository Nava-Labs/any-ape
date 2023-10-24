export const dynamic = "force-dynamic";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { BuyButton } from "@/components/BuyButton";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { getNftDetailsQuery } from "@/lib/gql/queries/nft";
import truncateEthAddress from "truncate-eth-address";

const client = new Client({
  url: "https://api.thegraph.com/subgraphs/name/jonassunandar/any-ape-subgraph",
  requestPolicy: "network-only",
  exchanges: [cacheExchange, fetchExchange],
});

type Params = {
  params: {
    tokenId: string;
  };
};

export default async function NftDetails({ params }: Params) {
  const tokenAddress = params.tokenId.split("-")[0];
  const tokenId = params.tokenId.split("-")[1];

  const nftDetailsRes = await client
    .query(getNftDetailsQuery, {
      id: params.tokenId,
    })
    .toPromise();
  if (!nftDetailsRes) throw new Error("Failed to fetch NFT details");

  const nftDetails = nftDetailsRes.data?.listedNFT!;
  const baseUriWithId = nftDetails.uri.split("//")[1];

  const response = await fetch("https://ipfs.io/ipfs/" + baseUriWithId);
  const data = await response.json();
  let imageUrl = data.image;

  return (
    <div className="flex gap-x-8 h-full w-full">
      <div className="flex flex-col">
        <div className="w-full rounded-xl">
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={imageUrl}
              className="min-h-[500px] max-h-[500px] min-w-[500px] max-w-[500px]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col py-5 w-full space-y-8">
        <div>
          <div className="text-2xl">
            {nftDetails.collectionName} #{params.tokenId.split("-")[1]}
          </div>
          <div>Owned by {truncateEthAddress(nftDetails.owner)}</div>
        </div>

        <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
          <div className="flex items-center space-x-2 p-2 border-b-2">
            <TagIcon className="h-5" />
            <div className="text-xl">Price</div>
          </div>

          <div className="flex gap-x-2 justify-center items-center py-3">
            <img
              src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
              className="h-8"
            />
            <span className="text-lg">
              {nftDetails.price === "0" ? "0" : Number(nftDetails.price) / 1e18}
            </span>
          </div>

          <div className="px-2 pb-3">
            <div className="flex items-center rounded-xl bg-blue-500 py-2">
              <BuyButton tokenAddress={tokenAddress} tokenId={tokenId} />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
          <div>
            <div className="flex items-center space-x-2 p-2 border-b-2">
              <ArrowsUpDownIcon className="h-5" />
              <div className="text-xl">Activity</div>
            </div>
            <Table>
              <TableHeader className="border-b-neutral-500">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Event</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              {nftDetails.activity.map((item: any, index: number) => (
                <TableBody key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    {Number(BigInt(item.price) / BigInt(1e18))} APE
                  </TableCell>
                  <TableCell>{truncateEthAddress(item.from)}</TableCell>
                  <TableCell>{truncateEthAddress(item.to)}</TableCell>
                  <TableCell>
                    {new Date(item.timestamp * 1000).toLocaleDateString()}
                  </TableCell>
                </TableBody>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
