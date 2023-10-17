import {
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";

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

export const useSendTx = async ({
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

  console.log("conencted to fuji");
  await instance.connect(walletAddress);
  console.log("tx done");

  if (txMetadata.length == 1) {
    const txValues = txMetadata[0];
    console.log("txvalue", txValues);
    await instance.sendTransaction(txValues);
  } else {
    const txValues = txMetadata;
    console.log("txvalue", txValues);
    await instance.sendBatchTransactions(txValues);
  }
};
