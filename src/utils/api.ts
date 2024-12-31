import { uploadToS3 } from './s3'

export const uploadImage = async (file: File) => {
  try {
    const url = await uploadToS3(file)
    return url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
} 