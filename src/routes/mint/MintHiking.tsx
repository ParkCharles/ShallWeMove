import { useState } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { createMintNftTransaction } from '@/utils/sui'
import { uploadImage } from '@/utils/api'
import { processImage } from '@/utils/image'
import dayjs from 'dayjs'
import { BaseNftForm, BaseFormData } from '@/components/forms/BaseNftForm'
import { HikingFields } from '@/components/forms/ActivityFields/HikingFields'
import { useGpxUpload } from '@/hooks/forms/useGpxUpload'

interface HikingFormData extends BaseFormData {
  totalDistance: number
}

export const MintHiking = () => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()
  const account = useCurrentAccount()
  
  const [formData, setFormData] = useState<HikingFormData>({
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
    tags: 'hiking',
    processedImageUrl: '',
    totalDistance: 0
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = async (file: File) => {
    try {
      setLoading(true)
      const watermarkInfo = {
        line1: formData.title || 'Hiking',
        line2: `Max Elevation: ${formData.achievement} m`,
        line3: `Distance: ${(formData.totalDistance / 1000).toFixed(2)} km`
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

  const { handleGpxUpload, loading: gpxLoading } = useGpxUpload((data) => {
    setFormData(prev => ({
      ...prev,
      achievement: data.achievement,
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
      totalDistance: data.totalDistance
    }))
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.imageUrl || !account) return

    try {
      setLoading(true)
      const tx = await createMintNftTransaction(
        formData.title,
        formData.description,
        formData.imageUrl,
        formData.location,
        formData.participants,
        formData.achievement,
        formData.duration,
        formData.date.unix(),
        formData.startTime.unix(),
        formData.endTime.unix(),
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
      loading={loading || gpxLoading}
      error={error}
      title="Record Hiking Activity"
    >
      <HikingFields
        formData={formData}
        onFormChange={(updates) => setFormData(prev => ({ ...prev, ...updates }))}
        onGpxUpload={handleGpxUpload}
        loading={loading}
      />
    </BaseNftForm>
  )
} 