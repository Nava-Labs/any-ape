"use client";

import {
  ComethProvider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";
import { useEffect, useState } from "react";
import { useWalletContext } from "./useWalletContext";
import getPublicKey from "@/lib/modules/wallet/getters/getPublicKey";
import getWebAuthn, {
  WebAuthnRequest,
} from "@/lib/modules/wallet/getters/getWebAuthn";

export function useWalletAuth() {
  const {
    setWallet,
    setProvider,
    wallet,
    counterContract,
    setCounterContract,
  } = useWalletContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [connectionError, setConnectionError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY_MUMBAI!;

  function displayError(message: string) {
    setConnectionError(message);
  }

  async function connect() {
    setIsConnecting(true);
    try {
      const walletAdaptor = new ConnectAdaptor({
        chainId: SupportedNetworks.MUMBAI,
        apiKey,
      });

      const instance = new ComethWallet({
        authAdapter: walletAdaptor,
        apiKey,
      });

      const localStorageAddress = window.localStorage.getItem("walletAddress");

      if (localStorageAddress) {
        await instance.connect(localStorageAddress);
      } else {
        await instance.connect();
        const walletAddress = await instance.getAddress();
        window.localStorage.setItem("walletAddress", walletAddress);

        const publicKeyIdBefore = window.localStorage.getItem(
          "cometh-connect-" + `${walletAddress}`
        );

        const publicKeyId = JSON.parse(publicKeyIdBefore!).publicKeyId;

        const publicKeyData = await getPublicKey(apiKey, publicKeyId);

        const requestData: WebAuthnRequest = {
          walletAddress: walletAddress,
          publicKeyId: publicKeyData.publicKeyId,
          publicKeyX: publicKeyData.publicKeyX,
          publicKeyY: publicKeyData.publicKeyY,
          deviceData: publicKeyData.deviceData,
        };

        await getWebAuthn(apiKey, requestData);
      }

      const instanceProvider = new ComethProvider(instance);

      setIsConnected(true);
      setWallet(instance as any);
      setProvider(instanceProvider as any);
    } catch (e) {
      displayError((e as Error).message);
    } finally {
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    const localStorageAddress = window.localStorage.getItem("walletAddress");
    if (localStorageAddress) {
      connect();
    }
  }, []);

  async function disconnect() {
    if (wallet) {
      try {
        await wallet!.logout();
        setIsConnected(false);
        setWallet(null);
        setProvider(null);
        setCounterContract(null);
      } catch (e) {
        displayError((e as Error).message);
      }
    }
  }
  return {
    wallet,
    counterContract,
    connect,
    disconnect,
    isConnected,
    isConnecting,
    connectionError,
    setConnectionError,
  };
}
