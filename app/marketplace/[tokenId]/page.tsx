"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { BuyButton } from "@/components/BuyButton";

type Params = {
  params: {
    tokenId: string;
  };
};

export default function NftDetails({ params }: Params) {
  return (
    <div className="flex gap-x-8 h-full w-full">
      <div className="flex flex-col">
        <div className="w-full rounded-xl">
          <div className="flex h-full w-full items-center justify-center">
            <img src="/nft.png" className="min-h-[600px]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col py-5 w-full space-y-8">
        <div>
          <div className="text-2xl">
            Bored Ape Yacht Club #{params.tokenId.split("-")[1]}
          </div>
          <div>Owned by 0x86b4...5f98</div>
        </div>

        <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
          <div className="flex items-center space-x-2 p-2 border-b-2">
            <TagIcon className="h-5" />
            <div className="text-xl">Price</div>
          </div>

          <div className="flex gap-x-2 justify-center items-center py-3">
            <img
              src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
              className="h-8"
            />
            <span className="text-lg">10,000</span>
          </div>

          <div className="px-2 pb-3">
            <div className="flex items-center rounded-xl bg-blue-500 py-2">
              <BuyButton />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
          <div>
            <div className="flex items-center space-x-2 p-2 border-b-2">
              <ArrowsUpDownIcon className="h-5" />
              <div className="text-xl">Activity</div>
            </div>
            <Table>
              <TableHeader className="border-b-neutral-500">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Event</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableCell>Sale</TableCell>
                <TableCell>10,000 APE</TableCell>
                <TableCell>Me</TableCell>
                <TableCell>You</TableCell>
                <TableCell>Yes please 🫶🏼</TableCell>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
