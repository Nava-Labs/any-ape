"use client";

import { DocumentDuplicateIcon, UserIcon } from "@heroicons/react/24/outline";
import * as Popover from "@radix-ui/react-popover";
import truncateEthAddress from "truncate-eth-address";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import { useEffect, useState } from "react";
import AccountImage from "./AccountImage";

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
      const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
      const chain = EvmChain.MUMBAI;
      const chains = [EvmChain.MUMBAI, EvmChain.AVALANCHE_TESTNET];
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
        setMoralisStarted(true);

        // Fetched all NFTs on Polygon Mumbai
        const fetchedNfts = nftResponse.toJSON();
        nftsResult = fetchedNfts.result;
        setUsersNfts(nftsResult);

        // Fetch APE balance on Polygon Mumbai
        const filterApeTokenOnMumbai = tokenResult[0].result.filter(
          (item: any) => item.token?.name === "iPhone 15"
        );
        const apeTokenAmountOnMumbai =
          Number(filterApeTokenOnMumbai[0].amount) / 1e18;
        setApeOnMumbai(apeTokenAmountOnMumbai);

        // Fetch APE balance on Avalanche Fuji
        const filterApeTokenOnFuji = tokenResult[1].result.filter(
          (item: any) => item.token?.name === "iPhone 15"
        );
        const apeTokenAmountOnFuji =
          Number(filterApeTokenOnFuji[0].amount) / 1e18;
        setApeOnFuji(apeTokenAmountOnFuji);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
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
              onClick={() => navigator.clipboard.writeText("hahaha")} //TODO: Change the hahaha to user's address
            >
              <div className="border border-neutral-500 rounded-lg bg-black p-1">
                <DocumentDuplicateIcon className="h-6" />
              </div>
            </button>
          </div>

          <div className="flex flex-col space-y-2 border border-neutral-500 p-2 rounded-lg mt-2 bg-black">
            <div className="text-sm border-b font-medium">Your Balance</div>
            <div className="flex items-center space-x-1">
              <img
                className="h-6"
                src="https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F84d33469-d6ef-48b6-9824-9570fc245a5a%2FWhite_on_Gradient_Circle.png?id=d05c50cf-35fc-4a93-b645-c38a5210aa3c&table=block&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
                alt="Polygon Logo"
              />
              <span>{apeOnMumbai} APE</span>
            </div>
            <div className="flex items-center space-x-1">
              <img
                className="h-6"
                src="/Avalanche_logo.png"
                alt="Polygon Logo"
              />
              <span>{apeOnFuji} APE</span>
            </div>
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
