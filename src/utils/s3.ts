import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
})

export const uploadToS3 = async (file: File, path: string) => {
  try {
    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: `${path}/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    })

    await s3Client.send(command)
    return `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${
      import.meta.env.VITE_AWS_REGION
    }.amazonaws.com/${path}/${file.name}`
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
} 