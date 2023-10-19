"use client";

import Link from "next/link";
import { Account } from "./Account";
import { approveAndClaim } from "@/lib/modules/wallet/hooks/approveAndClaim";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

export function Header() {
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="flex space-x-3 ">
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                className="bg-neutral-900 rounded-lg px-3 py-2 min-w-80"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    await approveAndClaim();
                    toast.success(`Claim Successful.`, {
                      position: toast.POSITION.TOP_RIGHT,
                      closeOnClick: false,
                      hideProgressBar: true,
                    });
                  } catch (error) {
                    console.error(error);
                    toast.error("Claim Failed", {
                      position: toast.POSITION.TOP_RIGHT,
                      hideProgressBar: true,
                    });
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                {isLoading ? "Claiming multichain $BAPE..." : "Faucet"}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className=" text-neutral-500 bg-black ">
                Need 2 signature to claim.
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        <ToastContainer />
        <Account />
      </div>
    </div>
  );
}
