import { WalletProvider } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui.js/client'
import { SuiClientProvider } from '@mysten/dapp-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'

const networks = {
  testnet: {
    url: getFullnodeUrl('testnet')
  },
  devnet: {
    url: getFullnodeUrl('devnet')
  },
  mainnet: {
    url: getFullnodeUrl('mainnet')
  }
}

const queryClient = new QueryClient()

export function SuiProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
} 