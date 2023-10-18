"use client";

import Link from "next/link";
import { ComethWallet, SupportedNetworks } from "@cometh/connect-sdk";
import {
  SendTxArgs,
  TxMetadata,
  useSendTx,
} from "@/lib/modules/wallet/hooks/useSendTx";
import { encodeInputDataClaimFaucet } from "@/lib/utils";
import { Account } from "./Account";

export function Header() {
  const localStorageAddress = window.localStorage.getItem("walletAddress");

  const mumbaiFaucet: TxMetadata = {
    to: "0x8204C45D3Bc2Ecf24a4bc84c0c16426223b46877",
    value: "0",
    data: encodeInputDataClaimFaucet(),
  };

  const fujiFaucet: TxMetadata = {
    to: "0xaB845a94e110D6f51815119ac3C87C6a268051Ee",
    value: "0",
    data: encodeInputDataClaimFaucet(),
  };

  const mumbaiFaucetTx: SendTxArgs = {
    walletAddress: localStorageAddress!,
    apiKey: process.env.NEXT_PUBLIC_COMETH_API_KEY_MUMBAI!,
    chainId: SupportedNetworks.MUMBAI,
    txMetadata: [mumbaiFaucet],
  };

  const fujiFaucetTx: SendTxArgs = {
    walletAddress: localStorageAddress!,
    apiKey: process.env.NEXT_PUBLIC_COMETH_API_KEY_FUJI!,
    chainId: SupportedNetworks.FUJI,
    txMetadata: [fujiFaucet],
  };

  const multiChainFaucet = () => {
    useSendTx(mumbaiFaucetTx);
    useSendTx(fujiFaucetTx);
  };

  return (
    <div className="flex w-full items-center justify-between my-4">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-xl">AnyApe</span>{" "}
          {/* TODO: CHANGE INTO LOGO LATER */}
        </Link>
        <Link href="/">
          <span className="text-base ml-4">Register</span>
        </Link>
        <Link href="/marketplace">
          <span className="text-base ml-4">Marketplace</span>
        </Link>
      </div>
      <Account />
    </div>
  );
}
