import { useState } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { createMintNftTransaction } from '@/utils/sui'
import { uploadImage } from '@/utils/api'
import { processImage } from '@/utils/image'
import dayjs from 'dayjs'
import { BaseNftForm, BaseFormData } from '@/components/forms/BaseNftForm'
import { SwimmingFields } from '@/components/forms/ActivityFields/SwimmingFields'
import { useFitUpload } from '@/hooks/forms/useFitUpload'

interface SwimmingFormData extends BaseFormData {
  totalDistance: number
  poolLength: number
  numLaps: number
}

export const MintSwimming = () => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
  const account = useCurrentAccount()
  
  const [formData, setFormData] = useState<SwimmingFormData>({
    title: '',
    description: '',
    imageFile: null,
    imageUrl: '',
    location: '',
    participants: 1,
    achievement: 0,
    duration: 0,
    date: dayjs(),
    startTime: dayjs(),
    endTime: dayjs(),
    tags: 'swimming',
    processedImageUrl: '',
    totalDistance: 0,
    poolLength: 0,
    numLaps: 0
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = async (file: File) => {
    try {
      setLoading(true)
      const watermarkInfo = {
        line1: formData.location || 'Swimming',
        line2: `${formData.totalDistance}m`
      }
      
      const processedImageUrl = await processImage(file, watermarkInfo)
      setFormData(prev => ({ ...prev, processedImageUrl }))

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

  const { handleFitUpload, loading: fitLoading } = useFitUpload((data) => {
    setFormData(prev => ({
      ...prev,
      achievement: data.totalDistance,
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
      totalDistance: data.totalDistance,
      poolLength: data.poolLength,
      numLaps: data.numLaps
    }))
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.imageUrl || !account) return

    try {
      setLoading(true)
      const tx = await createMintNftTransaction(
        account.address,
        formData.title,
        formData.description,
        formData.imageUrl,
        formData.location,
        formData.participants,
        formData.achievement,
        formData.duration,
        formData.date.unix(),
        String(formData.startTime.unix()),
        String(formData.endTime.unix()),
        formData.tags
      )

      await signAndExecuteTransaction({
        transaction: tx.serialize().toString(),
        chain: 'sui:testnet',
      })
    } catch (error) {
      setError('Failed to mint NFT')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseNftForm
      formData={formData}
      onFormChange={(updates) => setFormData(prev => ({ ...prev, ...updates }))}
      onImageChange={handleImageChange}
      onSubmit={handleSubmit}
      loading={loading || fitLoading}
      error={error}
      title="Record Swimming Activity"
    >
      <SwimmingFields
        formData={formData}
        onFormChange={(updates) => setFormData(prev => ({ ...prev, ...updates }))}
        onFitUpload={handleFitUpload}
        loading={loading}
      />
    </BaseNftForm>
  )
} 