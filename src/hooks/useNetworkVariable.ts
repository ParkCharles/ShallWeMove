import { PACKAGE_ID } from '@/constants'

export const useNetworkVariable = (key: string) => {
  switch (key) {
    case 'moventPackageId':
      return PACKAGE_ID
    default:
      throw new Error(`Unknown network variable: ${key}`)
  }
} 