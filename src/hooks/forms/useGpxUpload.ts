import { useState } from 'react'
import { parseGpxData } from '@/utils/fileProcessing/gpxProcessor'
import dayjs from 'dayjs'

interface UseGpxUploadReturn {
  handleGpxUpload: (file: File) => Promise<void>
  loading: boolean
  error: string | null
}

export const useGpxUpload = (
  onSuccess: (data: {
    achievement: number
    startTime: dayjs.Dayjs
    endTime: dayjs.Dayjs
    duration: number
    totalDistance: number
  }) => void
): UseGpxUploadReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGpxUpload = async (file: File) => {
    try {
      setLoading(true)
      setError(null)
      
      const content = await file.text()
      const gpxData = await parseGpxData(content)
      
      onSuccess({
        achievement: gpxData.maxElevation,
        startTime: dayjs(gpxData.startTime),
        endTime: dayjs(gpxData.endTime),
        duration: dayjs(gpxData.endTime).diff(dayjs(gpxData.startTime), 'minute'),
        totalDistance: gpxData.totalDistance
      })
    } catch (error) {
      setError('Failed to parse GPX file')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    handleGpxUpload,
    loading,
    error
  }
} 