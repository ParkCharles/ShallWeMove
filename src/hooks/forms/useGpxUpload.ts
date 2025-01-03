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
    maxElevation: number
    date: dayjs.Dayjs
    startTime: string
    endTime: string
    duration: number
    totalDistance: number
    gpxFile: File
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
      
      const hikingDate = dayjs(gpxData.startTime)
      
      onSuccess({
        maxElevation: gpxData.maxElevation,
        date: hikingDate,
        startTime: hikingDate.format('HH:mm'),
        endTime: dayjs(gpxData.endTime).format('HH:mm'),
        duration: dayjs(gpxData.endTime).diff(hikingDate, 'minute'),
        totalDistance: gpxData.totalDistance,
        gpxFile: file
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