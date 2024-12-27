import { Box, Button, CircularProgress } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { uploadImage } from '@/utils/api'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
}

export const ImageUpload = ({ onUploadComplete }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const url = await uploadImage(file)
      onUploadComplete(url)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="image-upload">
        <Button
          variant="outlined"
          component="span"
          disabled={isUploading}
          fullWidth
        >
          {isUploading ? <CircularProgress size={24} /> : 'Upload Image'}
        </Button>
      </label>
    </Box>
  )
} 