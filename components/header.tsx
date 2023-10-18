"use client";

import * as React from "react";
import Link from "next/link";
import { Account } from "./Account";
import { useApproveAndClaim } from "@/lib/modules/wallet/hooks/useApproveAndClaim";

export function Header() {
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
          onClick={() => useApproveAndClaim()}
        >
          Faucet
        </button>
        <Account />
      </div>
    </div>
  );
}
