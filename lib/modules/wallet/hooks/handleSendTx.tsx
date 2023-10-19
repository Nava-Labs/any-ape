import {
  ComethProvider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";
import { ethers } from "ethers";

export type TxMetadata = {
  to: string;
  value: string;
  data: string;
};

export type SendTxArgs = {
  walletAddress: string;
  apiKey: string;
  chainId: SupportedNetworks;
  txMetadata: TxMetadata[];
};

const anyApeFujiAddress = process.env.NEXT_PUBLIC_ANY_APE_FUJI!;

export const handleSendTx = async ({
  walletAddress,
  apiKey,
  chainId,
  txMetadata,
}: SendTxArgs) => {
  const walletAdaptor = new ConnectAdaptor({
    chainId,
    apiKey,
  });

  const instance = new ComethWallet({
    authAdapter: walletAdaptor,
    apiKey,
  });

  await instance.connect(walletAddress);

  const provider = new ComethProvider(instance);

  let txHash;

  if (txMetadata.length == 1) {
    const txValues = txMetadata[0];
    const sendTx = await instance.sendTransaction(txValues);
    const safeTxHash = sendTx.safeTxHash;

    const txResponse = await provider.getTransaction(safeTxHash);
    const txConfirmed = await txResponse.wait();

    txHash = txConfirmed.transactionHash;
  } else {
    const txValues = txMetadata;
    const sendTx = await instance.sendBatchTransactions(txValues);
    const safeTxHash = sendTx.safeTxHash;

    const txResponse = await provider.getTransaction(safeTxHash);
    const txConfirmed = await txResponse.wait();

    txHash = txConfirmed.transactionHash;
  }

  if (txMetadata[0].to == anyApeFujiAddress) {
    return "https://ccip.chain.link/tx/" + txHash;
  }

  if (chainId == SupportedNetworks.MUMBAI) {
    return "https://mumbai.polygonscan.com/tx/" + txHash;
  } else {
    return "https://testnet.snowtrace.io/tx/" + txHash;
  }
};
