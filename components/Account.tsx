"use client";

import { UserIcon } from "@heroicons/react/24/outline";
import * as Popover from "@radix-ui/react-popover";

export function Account() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="flex bg-neutral-800 p-2 rounded-xl items-center">
          0xeD7B...6Afd {/* TO DO: USER'S ADDRESS */}
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="bg-neutral-900 rounded-lg p-5 min-w-80">
          <div className="flex items-center space-x-1">
            <UserIcon className="h-9" />
            <div className="flex flex-col ">
              <span className="text-sm">Account</span>
              <span className="text-sm">
                0xeD7B...6Afd {/* TO DO: USER'S ADDRESS */}
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-2 border border-neutral-500 p-2 rounded-lg mt-2 bg-black">
            <div className="text-sm border-b font-medium">Your Balance</div>
            <div className="flex items-center space-x-1">
              <img
                className="h-6"
                src="https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F84d33469-d6ef-48b6-9824-9570fc245a5a%2FWhite_on_Gradient_Circle.png?id=d05c50cf-35fc-4a93-b645-c38a5210aa3c&table=block&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
                alt="Polygon Logo"
              />
              <span>0.00 APE</span>
            </div>
            <div className="flex items-center space-x-1">
              <img
                className="h-6"
                src="/Avalanche_logo.png"
                alt="Polygon Logo"
              />
              <span>0.00 APE</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2 border justify-center border-neutral-500 p-2 rounded-lg mt-2 bg-black w-full">
            <div className="text-sm border-b font-medium">Your NFT</div>
            <div className="flex items-center space-x-1">
              <img src="/nft.png" className="h-24" />
              <img src="/nft.png" className="h-24" />
              <img src="/nft.png" className="h-24" />
            </div>
          </div>

          <div className="mt-2 flex space-x-1"></div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
