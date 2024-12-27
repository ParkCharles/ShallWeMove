import { TransactionBlock } from '@mysten/sui.js/transactions'
import { PACKAGE_ID } from '@/constants'

export const createMintNftTransaction = async (
  sender: string,
  title: string,
  description: string,
  imageUrl: string,
  location: string,
  participants: number,
  achievement: number,
  duration: number,
  date: number,
  weather: string,
  mood: string,
  tags: string
) => {
  const tx = new TransactionBlock()
  
  tx.moveCall({
    target: `${PACKAGE_ID}::movent::mint_nft`,
    arguments: [
      tx.pure(title),
      tx.pure(description),
      tx.pure(imageUrl),
      tx.pure(location),
      tx.pure(participants),
      tx.pure(achievement),
      tx.pure(duration),
      tx.pure(date),
      tx.pure(weather),
      tx.pure(mood),
      tx.pure(tags)
    ]
  })

  return tx
}

export const formatAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
} 