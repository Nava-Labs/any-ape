"use client";
export const dynamic = "force-dynamic";

import { DocumentDuplicateIcon, UserIcon } from "@heroicons/react/24/outline";
import * as Popover from "@radix-ui/react-popover";
import truncateEthAddress from "truncate-eth-address";
import Moralis from "moralis";
import { EvmAddressInput, EvmChain } from "moralis/common-evm-utils";
import { useEffect, useState } from "react";
import AccountImage from "./AccountImage";
import Link from "next/link";
import { createPublicClient, formatEther, http } from "viem";
import { avalancheFuji } from "viem/chains";
import { ERC20_ABI } from "@/lib/erc20.abi";

const publicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(),
});

export function Account() {
  const localStorageAddress =
    typeof window !== "undefined"
      ? window.localStorage.getItem("walletAddress")
      : "";

  const [usersNfts, setUsersNfts] = useState<any | null>(null);

  const [apeOnMumbai, setApeOnMumbai] = useState(0);
  const [apeOnFuji, setApeOnFuji] = useState(0);

  const [moralisStarted, setMoralisStarted] = useState<boolean>(false);

  useEffect(() => {
    const moralis = async () => {
      if (!moralisStarted)
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      const address = window.localStorage.getItem("walletAddress") as string;
      const chain = EvmChain.MUMBAI;
      const chains = [EvmChain.MUMBAI, EvmChain.GOERLI];
      let nftsResult;
      let tokenResult = [];

      try {
        const nftResponse = await Moralis.EvmApi.nft.getWalletNFTs({
          address,
          chain,
        });
        for (const chain of chains) {
          const tokenFetch = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
          });
          tokenResult.push(tokenFetch);
        }
        const apeTokenAmountOnFuji = await publicClient.readContract({
          address:
            "0xb187ba0d97a1d0b00310ce1418bbde9c7690b001" as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [localStorageAddress as `0x${string}`],
        });
        setMoralisStarted(true);

        // Fetched all NFTs on Polygon Mumbai
        const fetchedNfts = nftResponse.toJSON();
        nftsResult = fetchedNfts.result;
        setUsersNfts(nftsResult);

        // Fetch APE balance on Polygon Mumbai
        const filterApeTokenOnMumbai = tokenResult[0].result.filter(
          (item: any) => item.token?.name === "Bridged APE"
        );
        const apeTokenAmountOnMumbai =
          BigInt(filterApeTokenOnMumbai[0].amount.toString()) / BigInt(1e18);
        setApeOnMumbai(Number(apeTokenAmountOnMumbai));

        // Fetch APE balance on Avalanche Fuji
        setApeOnFuji(Number(formatEther(apeTokenAmountOnFuji)));
      } catch (error) {
        console.error("Error fetching: ", error);
      }
    };

    moralis();
  }, []);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="flex bg-neutral-800 p-2 rounded-xl items-center">
          {localStorageAddress ? truncateEthAddress(localStorageAddress) : ""}
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="bg-neutral-900 rounded-lg p-5 w-80">
          <div className="flex items-center space-x-1">
            <UserIcon className="h-9" />
            <div className="flex flex-col ">
              <span className="text-sm">Account</span>
              <span className="text-sm">
                {localStorageAddress
                  ? truncateEthAddress(localStorageAddress)
                  : ""}
              </span>
            </div>
            <button
              className="rounded-lg p-1 flex justify-end w-full"
              onClick={() =>
                navigator.clipboard.writeText(localStorageAddress as string)
              }
            >
              <div className="border border-neutral-500 rounded-lg bg-black p-1">
                <DocumentDuplicateIcon className="h-6" />
              </div>
            </button>
          </div>

          <div className="flex flex-col space-y-2 border border-neutral-500 p-2 rounded-lg mt-2 bg-black">
            <div className="text-sm border-b font-medium">Your Balance</div>
            <Link
              href={`https://mumbai.polygonscan.com/address/${localStorageAddress}`}
              target="_blank"
            >
              <div className="flex items-center space-x-1">
                <img
                  className="h-6"
                  src="https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F84d33469-d6ef-48b6-9824-9570fc245a5a%2FWhite_on_Gradient_Circle.png?id=d05c50cf-35fc-4a93-b645-c38a5210aa3c&table=block&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
                  alt="Polygon Logo"
                />
                <span>{apeOnMumbai} APE</span>
              </div>
            </Link>
            <Link
              href={`https://testnet.snowtrace.io/address/${localStorageAddress}`}
              target="_blank"
            >
              <div className="flex items-center space-x-1">
                <img
                  className="h-6"
                  src="/avalanche_logo.png"
                  alt="Avalanche Logo"
                />
                <span>{apeOnFuji} APE</span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col space-y-2 border justify-center border-neutral-500 p-2 rounded-lg mt-2 bg-black w-full">
            <div className="text-sm border-b font-medium">Your NFT</div>
            <div className="flex items-center space-x-1">
              {usersNfts === null
                ? "You don't have any NFT"
                : usersNfts
                    .slice(0, 3)
                    .map((item: any, index: number) => (
                      <AccountImage key={index} uri={item.token_uri} />
                    ))}
            </div>
          </div>

          <div className="mt-2 flex space-x-1"></div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
