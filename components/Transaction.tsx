"use client";

import { TransactionReceipt } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useWalletAuth } from "@/lib/modules/wallet/hooks/useWalletAuth";

import {
  ComethProvider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
  RelayTransactionResponse,
} from "@cometh/connect-sdk";

interface TransactionProps {
  transactionSuccess: boolean;
  setTransactionSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Transaction({
  transactionSuccess,
  setTransactionSuccess,
}: TransactionProps) {
  const { wallet, counterContract } = useWalletAuth();
  const [isTransactionLoading, setIsTransactionLoading] =
    useState<boolean>(false);
  const [transactionSended, setTransactionSended] =
    useState<RelayTransactionResponse | null>(null);
  const [transactionResponse, setTransactionResponse] =
    useState<TransactionReceipt | null>(null);
  const [transactionFailure, setTransactionFailure] = useState(false);
  const [nftBalance, setNftBalance] = useState<number>(0);

  return <></>;
}
