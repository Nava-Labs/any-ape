import { Icons } from "@/components/ui/Icons";
import { ComethWallet } from "@cometh/connect-sdk";
import { CheckIcon } from "@radix-ui/react-icons";

interface ConnectWalletProps {
  connectionError: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  wallet: ComethWallet;
}

function ConnectWallet({
  connectionError,
  isConnecting,
  isConnected,
  connect,
}: ConnectWalletProps): JSX.Element {
  const getTextButton = () => {
    if (isConnected) {
      return (
        <>
          <CheckIcon width={20} height={20} />
          <a href={`../marketplace`}>
            {"You are registered, take me to marketplace"}
          </a>
        </>
      );
    } else if (isConnecting) {
      return (
        <>
          <Icons.spinner className="h-6 w-6 animate-spin" />
          {"Getting wallet..."}
        </>
      );
    } else {
      return "Get your Wallet";
    }
  };

  return (
    <>
      {!connectionError ? (
        <button
          disabled={isConnecting || isConnected || !!connectionError}
          className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-neutral-900 disabled:bg-neutral-500"
          onClick={connect}
        >
          {getTextButton()}
        </button>
      ) : (
        <p className="flex items-center justify-center text-gray-900 bg-red-50">
          Connection denied
        </p>
      )}
    </>
  );
}

export default ConnectWallet;
