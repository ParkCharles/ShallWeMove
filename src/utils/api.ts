import { uploadToS3 } from './s3'

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const url = await uploadToS3(file, 'images')
    return url
  } catch (error) {
    console.error('Failed to upload image:', error)
    throw error
  }
} 