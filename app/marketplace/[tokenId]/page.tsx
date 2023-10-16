"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

type Params = {
  params: {
    tokenId: number;
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
          <div className="text-2xl">Bored Ape Yacht Club #{params.tokenId}</div>
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
              <div className="w-full text-center ">
                <button className="text-center flex-1 w-full">
                  <span>Buy</span>
                </button>
              </div>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex space-x-2 items-center pl-5 pr-2 bg-blue-500 border-l-2">
                  <img
                    className="h-7 items-center"
                    src="https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F89203c58-0bc9-48b4-898c-18a637150354%2FGradient_on_Transparent.png?table=block&id=d51ab665-6522-4ba6-8480-feb2e18f1a27&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
                  />
                  <ChevronDownIcon className="h-5" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="flex flex-col bg-neutral-900 rounded-xl">
                  <DropdownMenu.Item className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl">
                    <img
                      className="h-7"
                      src="https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F89203c58-0bc9-48b4-898c-18a637150354%2FGradient_on_Transparent.png?table=block&id=d51ab665-6522-4ba6-8480-feb2e18f1a27&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
                      alt="Polygon Logo"
                    />
                    <span>Pay from Polygon</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl">
                    <img
                      className="h-7"
                      src="/Avalanche_logo.png"
                      alt="Avalanche Logo"
                    />
                    <span>Pay from Avalanche</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
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
