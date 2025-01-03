import { useState } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'
import { createMintNftTransaction } from '@/utils/sui'
import { uploadImage } from '@/utils/api'
import { processImage } from '@/utils/image'
import dayjs from 'dayjs'
import { HikingForm, HikingFormData } from '@/components/HikingForm'
import { useGpxUpload } from '@/hooks/forms/useGpxUpload'
import { HikingResult } from '@/components/HikingResult'
import { type SuiSignAndExecuteTransactionOutput } from '@mysten/wallet-standard'

export const Hiking = () => {
  const client = useSuiClient()
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
  const account = useCurrentAccount()
  
  const [formData, setFormData] = useState<HikingFormData>({
    location: '',
    description: '',
    imageFile: null,
    imageUrl: '',
    participants: 0,
    maxElevation: 0,
    duration: 0,
    date: dayjs(''),
    startTime: '',
    endTime: '',
    processedImageUrl: '',
    totalDistance: 0,
    gpxFile: null
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [objectId, setObjectId] = useState<string | null>(null)

  const handleImageChange = async (file: File) => {
    try {
      setLoading(true)
      const watermarkInfo = {
        location: formData.location || 'Hiking',
        line2: `Max Elevation: ${formData.maxElevation} m`,
        line3: `Distance: ${(formData.totalDistance / 1000).toFixed(2)} km`
      }
      
      const processedImageUrl = await processImage(file, watermarkInfo)
      setFormData((prev) => ({ ...prev, processedImageUrl }))

      const response = await fetch(processedImageUrl)
      const blob = await response.blob()
      const processedFile = new File([blob], file.name, { type: 'image/jpeg' })
      
      const url = await uploadImage(processedFile)
      setFormData(prev => ({ 
        ...prev, 
        imageFile: processedFile, 
        imageUrl: url 
      }))
    } catch (error) {
      setError('Failed to process or upload image')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const { handleGpxUpload, loading: gpxLoading } = useGpxUpload((data) => {
    setFormData(prev => ({
      ...prev,
      maxElevation: data.maxElevation,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
      totalDistance: data.totalDistance,
      gpxFile: data.gpxFile
    }))
  })

  const handleTransactionSuccess = async (response: SuiSignAndExecuteTransactionOutput) => {
    console.log('Transaction successful:', response)

    try {
      const transaction = await client.waitForTransaction({
        digest: response.digest,
        options: {
          showEffects: true,
          showObjectChanges: true
        }
      })

      console.log('Transaction details:', transaction)

      // Find the created NFT object
      const nftObject = transaction.objectChanges?.find(change => 
        change.type === 'created' && 
        change.objectType?.includes('::shallwemove::ShallWeMove')
      ) as { type: 'created', objectId: string } | undefined

      if (nftObject?.objectId) {
        console.log('Created NFT ID:', nftObject.objectId)
        setObjectId(nftObject.objectId)
        return
      }

      console.log('No NFT object found in transaction')
    } catch (e) {
      console.error('Error processing transaction:', e)
      setError('Failed to process transaction result')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (!account) {
        setError('Please connect your wallet first')
        return
      }

      if (!formData.location || !formData.imageUrl) {
        setError('Location and image are required')
        return
      }

      setLoading(true)
      console.log('Form data:', formData)
      
      console.log('Creating transaction...')
      const tx = await createMintNftTransaction(
        formData.location,
        formData.description,
        formData.imageUrl,
        formData.participants,
        formData.maxElevation,
        formData.duration,
        formData.date.unix(),
        dayjs(`${formData.date.format('YYYY-MM-DD')} ${formData.startTime}`).unix(),
        dayjs(`${formData.date.format('YYYY-MM-DD')} ${formData.endTime}`).unix()
      )

      console.log('Transaction created:', tx)
      console.log('Executing transaction...')
      
      await signAndExecuteTransaction(
        {
          transaction: tx,
          chain: 'sui:testnet'
        },
        {
          onSuccess: handleTransactionSuccess,
          onError: (error) => {
            console.error('Transaction failed:', error)
            setError(error.message || 'Failed to mint NFT')
          }
        }
      )
      
    } catch (error) {
      console.error('Transaction error:', error)
      setError(error instanceof Error ? error.message : 'Failed to mint NFT')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HikingForm
        formData={formData}
        onFormChange={(updates) => {
          if (formData.gpxFile) {
            const { maxElevation, duration, startTime, endTime, ...allowedUpdates } = updates
            setFormData(prev => ({ ...prev, ...allowedUpdates }))
            return
          }
          
          setFormData(prev => ({ ...prev, ...updates }))
        }}
        onImageChange={handleImageChange}
        onGpxUpload={handleGpxUpload}
        onSubmit={handleSubmit}
        loading={loading || gpxLoading}
        error={error}
      />

      <HikingResult 
        objectId={objectId}
        imageUrl={formData.processedImageUrl}
        location={formData.location}
      />
    </>
  )
}
