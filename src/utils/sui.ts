import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID } from "@/constants";

export const createMintNftTransaction = async (
  title: string,
  description: string,
  imageUrl: string,
  location: string,
  participants: number,
  achievement: number,
  duration: number,
  date: number,
  startTime: number,
  endTime: number,
  tags: string
) => {
  const tx = new Transaction()
  
  tx.moveCall({
    target: `${PACKAGE_ID}::movent::mint_nft`,
    arguments: [
      tx.pure.string(title),
      tx.pure.string(description),
      tx.pure.string(imageUrl),
      tx.pure.string(location),
      tx.pure.u64(participants),
      tx.pure.u64(achievement),
      tx.pure.u64(duration),
      tx.pure.u64(date),
      tx.pure.u64(startTime),
      tx.pure.u64(endTime),
      tx.pure.string(tags)
    ]
  })

  return tx
}

export const formatAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
} 