"use client";

import {
  INFINITE,
  encodeInputDataApproveERC20,
  encodeInputDataClaimFaucet,
} from "@/lib/utils";
import { SendTxArgs, TxMetadata, handleSendTx } from "./handleSendTx";
import { SupportedNetworks } from "@cometh/connect-sdk";

const bridgedApeMumbai = process.env.NEXT_PUBLIC_BRIDGED_APE_MUMBAI!;
const anyApeMumbaiAddress = process.env.NEXT_PUBLIC_ANY_APE_MUMBAI!;

const bridgedApeFuji = process.env.NEXT_PUBLIC_BRIDGED_APE_FUJI!;
const anyApeFujiAddress = process.env.NEXT_PUBLIC_ANY_APE_FUJI!;

const faucetMumbaiAddress = process.env.NEXT_PUBLIC_FAUCET_MUMBAI!;
const faucetFujiAddress = process.env.NEXT_PUBLIC_FAUCET_FUJI!;

const commethApiKeyMumbai = process.env.NEXT_PUBLIC_COMETH_API_KEY_MUMBAI!;
const commethApiKeyFuji = process.env.NEXT_PUBLIC_COMETH_API_KEY_FUJI!;

const localStorageAddress =
  typeof window !== "undefined"
    ? window.localStorage.getItem("walletAddress")
    : "";

const approveMumbaiMetadata: TxMetadata = {
  to: bridgedApeMumbai,
  value: "0",
  data: encodeInputDataApproveERC20(anyApeMumbaiAddress, INFINITE),
};

const mumbaiFaucet: TxMetadata = {
  to: faucetMumbaiAddress,
  value: "0",
  data: encodeInputDataClaimFaucet(),
};

const approveFujiMetadata: TxMetadata = {
  to: bridgedApeFuji,
  value: "0",
  data: encodeInputDataApproveERC20(anyApeFujiAddress, INFINITE),
};

const fujiFaucet: TxMetadata = {
  to: faucetFujiAddress,
  value: "0",
  data: encodeInputDataClaimFaucet(),
};

const mumbaiFaucetTx: SendTxArgs = {
  walletAddress: localStorageAddress!,
  apiKey: commethApiKeyMumbai,
  chainId: SupportedNetworks.MUMBAI,
  txMetadata: [mumbaiFaucet, approveMumbaiMetadata],
};

const fujiFaucetTx: SendTxArgs = {
  walletAddress: localStorageAddress!,
  apiKey: commethApiKeyFuji,
  chainId: SupportedNetworks.FUJI,
  txMetadata: [fujiFaucet, approveFujiMetadata],
};

export const approveAndClaim = () => {
  handleSendTx(mumbaiFaucetTx);
  handleSendTx(fujiFaucetTx);
};
