"use client";

import ConnectWallet from "@/components/ConnectWallet";
import { useWalletAuth } from "@/lib/modules/wallet/hooks/useWalletAuth";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { isConnecting, isConnected, connect, connectionError, wallet } =
    useWalletAuth();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="border rounded-lg border-neutral-500">
        <ConnectWallet
          isConnected={isConnected}
          isConnecting={isConnecting}
          connect={connect}
          connectionError={connectionError}
          wallet={wallet!}
        />
      </div>
    </main>
  );
}
