import { type ClassValue, clsx } from "clsx";
import { BigNumber } from "ethers";
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
  value: BigNumber
): string {
  return IApproveERC20.encodeFunctionData("approve", [spender, value]);
}

export function encodeInputDataClaimFaucet(): string {
  return IClaimFaucet.encodeFunctionData("claim", []);
}

export function encodeInputDataNativeChainSale(
  tokenAddress: string,
  tokenId: string
): string {
  return IAnyApeNativeChainSale.encodeFunctionData("directBuy", [
    tokenAddress,
    tokenId,
  ]);
}
export function encodeInputDataCrossChainSale(
  tokenAddress: string,
  tokenId: string
): string {
  return IAnyApeCrossChainSale.encodeFunctionData("crossChainSale", [
    tokenAddress,
    tokenId,
  ]);
}

export function encodeCounter(): string {
  return ICounter.encodeFunctionData("count", []);
}

export const INFINITE: BigNumber = BigNumber.from(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"
);
