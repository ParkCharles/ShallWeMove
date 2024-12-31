import { 
  WalletProvider, 
  ConnectButton, 
  useCurrentWallet 
} from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { SuiClientProvider } from '@mysten/dapp-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { styled } from '@mui/material/styles'

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

const ButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '16px',
  '& ~ div > button': {
    display: 'none !important'
  }
})

const COLORS = {
  DEFAULT: '#FF80AB',
  HOVER: '#FF4081',
  CONNECTED: '#FFE4E8'
}

const StyledConnectButton = styled(ConnectButton)`
  && {
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: ${COLORS.DEFAULT};

    &:hover {
      background-color: ${COLORS.HOVER};
    }
  }
`

export function WalletButton() {
  const { connectionStatus } = useCurrentWallet()
  
  return (
    <ButtonContainer>
      <StyledConnectButton 
        connectText="Connect Wallet"
        style={{
          backgroundColor: connectionStatus === 'connected' ? COLORS.CONNECTED : COLORS.DEFAULT
        }}
      />
    </ButtonContainer>
  )
}

export function SuiProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider 
        networks={networks} 
        defaultNetwork="testnet"
      >
        <WalletProvider 
          autoConnect
          preferredWallets={['Sui Wallet']}
          enableUnsafeBurner={false}
        >
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
} 