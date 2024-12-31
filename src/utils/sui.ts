import { Transaction } from '@mysten/sui/transactions'
import dayjs from 'dayjs'

export const createMintNftTransaction = async (
  location: string,
  description: string,
  imageUrl: string,
  participants: number,
  maxElevation: number,
  duration: number,
  date: number,
  startTime: number,
  endTime: number
) => {
  if (participants > 65535) throw new Error('Participants count exceeds u16 max value')
  if (maxElevation > 65535) throw new Error('Max elevation exceeds u16 max value')
  if (duration > 65535) throw new Error('Duration exceeds u16 max value')

  const formattedDate = dayjs.unix(date).format('YYYY-MM-DD')
  const formattedStartTime = dayjs.unix(startTime).format('HH:mm')
  const formattedEndTime = dayjs.unix(endTime).format('HH:mm')

  const enhancedDescription = `
${description}

Date: ${formattedDate}
Start Time: ${formattedStartTime}
End Time: ${formattedEndTime}
`.trim()

  const tx = new Transaction()
  
  console.log('Creating transaction with args:', {
    location, description, imageUrl, participants, 
    maxElevation, duration, date, startTime, endTime
  })

  tx.moveCall({
    target: `${import.meta.env.VITE_PACKAGE_ID}::shallwemove::mint`,
    arguments: [
      tx.pure.string(location),
      tx.pure.string(enhancedDescription),
      tx.pure.string(imageUrl),
      tx.pure.u16(participants),
      tx.pure.u16(maxElevation),
      tx.pure.u16(duration),
      tx.pure.string(formattedDate),
      tx.pure.string(formattedStartTime),
      tx.pure.string(formattedEndTime)
    ]
  })

  return tx
}

export const formatAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
} 