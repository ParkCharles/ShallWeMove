import { useCurrentWallet } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'

export function useSuiWallet() {
  const { currentWallet } = useCurrentWallet()
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    if (currentWallet?.accounts[0]) {
      setAddress(currentWallet.accounts[0].address)
    } else {
      setAddress(null)
    }
  }, [currentWallet])

  return {
    isConnected: !!currentWallet,
    address,
  }
} 