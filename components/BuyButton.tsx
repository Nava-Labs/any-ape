"use client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  SendTxArgs,
  TxMetadata,
  handleSendTx,
} from "@/lib/modules/wallet/hooks/handleSendTx";
import { SupportedNetworks } from "@cometh/connect-sdk";
import {
  INFINITE,
  encodeCounter,
  encodeInputDataApproveERC20,
  encodeInputDataCrossChainSale,
  encodeInputDataNativeChainSale,
} from "@/lib/utils";

type Props = {
  tokenAddress: string;
  tokenId: string;
};

export function BuyButton({ tokenAddress, tokenId }: Props) {
  const [selectedChain, setSelectedChain] = useState("Polygon");
  const [selectedChainId, setSelectedChainId] = useState(80001);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleChainSelect = (chain: string, chainId: number) => {
    setSelectedChain(chain);
    setSelectedChainId(chainId);
  };

  const address = window.localStorage.getItem("walletAddress");
  const anyApeFujiAddress = process.env.NEXT_PUBLIC_ANY_APE_FUJI!;
  const anyApeMumbaiAddress = process.env.NEXT_PUBLIC_ANY_APE_MUMBAI!;

  let network: SupportedNetworks;
  let whichApiKey: string;
  let txMetadatas: Array<TxMetadata> = [];

  // mumbai
  if (selectedChainId == 80001) {
    const mumbaiTxMetadata: TxMetadata = {
      to: anyApeMumbaiAddress,
      value: "0",
      data: encodeInputDataNativeChainSale(tokenAddress, tokenId),
    };

    network = SupportedNetworks.MUMBAI;
    whichApiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY_MUMBAI!;
    txMetadatas.push(mumbaiTxMetadata);
  } else if (selectedChainId == 43113) {
    // fuji

    const fujiTxMetadata: TxMetadata = {
      to: anyApeFujiAddress,
      value: "0",
      data: encodeInputDataCrossChainSale(tokenAddress, tokenId),
    };

    network = SupportedNetworks.FUJI;
    whichApiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY_FUJI!;
    txMetadatas.push(fujiTxMetadata);
  }

  const transaction: SendTxArgs = {
    walletAddress: address!,
    apiKey: whichApiKey!,
    chainId: network!,
    txMetadata: txMetadatas,
  };

  return (
    <>
      <div className="w-full text-center ">
        <button
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              const result = await handleSendTx(transaction);
              console.log(result);
              setTxHash(result);
              toast.success(
                <div>
                  Transaction Successful. TxHash:{" "}
                  <a href={result} target="_blank" rel="noopener noreferrer">
                    {result}
                  </a>
                </div>,
                {
                  position: toast.POSITION.TOP_RIGHT,
                  closeOnClick: false,
                  hideProgressBar: true,
                  pauseOnHover: true,
                  draggable: false,
                }
              );
            } catch (error) {
              console.error(error);
              toast.error("Transaction Failed", {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: true,
              });
            } finally {
              setIsLoading(false);
            }
          }}
          className="text-center flex-1 w-full"
        >
          {isLoading ? "Loading..." : "Buy"}
        </button>
        <ToastContainer />
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex space-x-2 items-center pl-5 pr-2 bg-blue-500 border-l-2">
          <img
            className="h-7 items-center"
            src={
              selectedChain === "Polygon"
                ? "https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F89203c58-0bc9-48b4-898c-18a637150354%2FGradient_on_Transparent.png?table=block&id=d51ab665-6522-4ba6-8480-feb2e18f1a27&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
                : "/Avalanche_logo.png"
            }
          />
          <ChevronDownIcon className="h-5" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="flex flex-col bg-neutral-900 rounded-xl">
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Polygon", 80001)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F89203c58-0bc9-48b4-898c-18a637150354%2FGradient_on_Transparent.png?table=block&id=d51ab665-6522-4ba6-8480-feb2e18f1a27&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
              alt="Polygon Logo"
            />
            <span>Pay from Polygon</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="/avalanche_logo.png"
              alt="Avalanche Logo"
            />
            <span>Pay from Avalanche</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026"
              alt="Ethereum Logo"
            />
            <span>Coming Soon</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=026"
              alt="Arbitrum Logo"
            />
            <span>Coming Soon</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=026"
              alt="Optimism Logo"
            />
            <span>Coming Soon</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026"
              alt="BNB Smart Chain Logo"
            />
            <span>Coming Soon</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
