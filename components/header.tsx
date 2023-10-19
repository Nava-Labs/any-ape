"use client";

import Link from "next/link";
import { Account } from "./Account";
import { approveAndClaim } from "@/lib/modules/wallet/hooks/approveAndClaim";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

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
        <ToastContainer />
        <Account />
      </div>
    </div>
  );
}
