import { useState } from 'react'
import { parseFitData } from '@/utils/fileProcessing/fitProcessor'
import dayjs from 'dayjs'

interface UseFitUploadReturn {
  handleFitUpload: (file: File) => Promise<void>
  loading: boolean
  error: string | null
}

export const useFitUpload = (
  onSuccess: (data: {
    achievement: number
    startTime: dayjs.Dayjs
    endTime: dayjs.Dayjs
    duration: number
    totalDistance: number
    poolLength: number
    numLaps: number
  }) => void
): UseFitUploadReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFitUpload = async (file: File) => {
    try {
      setLoading(true)
      setError(null)
      
      const buffer = await file.arrayBuffer()
      const fitData = await parseFitData(buffer)
      
      onSuccess({
        achievement: fitData.totalDistance,
        startTime: dayjs(fitData.startTime),
        endTime: dayjs(fitData.endTime),
        duration: Math.round(fitData.duration / 60), // 초를 분으로 변환
        totalDistance: fitData.totalDistance,
        poolLength: fitData.poolLength,
        numLaps: fitData.numLaps
      })
    } catch (error) {
      setError('Failed to parse FIT file')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    handleFitUpload,
    loading,
    error
  }
} 