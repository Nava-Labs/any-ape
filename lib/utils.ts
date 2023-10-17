import { type ClassValue, clsx } from "clsx";
import { Interface } from "ethers/lib/utils";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IApproveERC20 = new Interface([
  "function approve(address spender, uint256 value)",
]);

const IClaimFaucet = new Interface(["function claim()"]);

const IAnyApeNativeChainSale = new Interface([
  "function directBuy(address tokenAddress, uint256 tokenId)",
]);

const IAnyApeCrossChainSale = new Interface([
  "function crossChainSale(address tokenAddress, uint256 tokenId)",
]);

const ICounter = new Interface(["function count()"]);

export function encodeInputDataApproveERC20(
  spender: string,
  value: number
): string {
  return IApproveERC20.encodeFunctionData("approve", [spender, value]);
}

export function encodeInputDataClaimFaucet(): string {
  return IClaimFaucet.encodeFunctionData("claim", []);
}

export function encodeInputDataNativeChainSale(
  address: string,
  tokenId: number
): string {
  return IAnyApeNativeChainSale.encodeFunctionData("directBuy", [
    address,
    tokenId,
  ]);
}
export function encodeInputDataCrossChainSale(
  address: string,
  tokenId: number
): string {
  return IAnyApeCrossChainSale.encodeFunctionData("crossChainSale", [
    address,
    tokenId,
  ]);
}

export function encodeCounter(): string {
  return ICounter.encodeFunctionData("count", []);
}
