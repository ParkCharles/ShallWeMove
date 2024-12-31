export const useNetworkVariable = (key: string) => {
  switch (key) {
    case 'moventPackageId':
      if (import.meta.env.VITE_NETWORK === 'testnet') {
        return import.meta.env.VITE_PACKAGE_ID
      }
      throw new Error('Only testnet is supported')
    default:
      throw new Error(`Unknown network variable: ${key}`)
  }
} 