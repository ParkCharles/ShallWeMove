interface WatermarkInfo {
  line1: string;
  line2: string;
}

export const processImage = (file: File, watermarkInfo: WatermarkInfo): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      reject(new Error('Failed to get canvas context'))
      return
    }

    img.onload = () => {
      try {
        // 500x500으로 리사이징
        const targetSize = 500
        let width = img.width
        let height = img.height
        
        // 정사각형으로 크롭
        const size = Math.min(width, height)
        const startX = (width - size) / 2
        const startY = (height - size) / 2

        canvas.width = targetSize
        canvas.height = targetSize

        // 이미지 그리기 (크롭 및 리사이징)
        ctx.drawImage(
          img,
          startX, startY, size, size,  // 소스 영역 (크롭)
          0, 0, targetSize, targetSize  // 대상 영역 (리사이징)
        )

        // 워터마크 배경 (반투명 검정)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, targetSize - 80, targetSize, 80)

        // 워터마크 텍스트
        ctx.font = 'bold 24px Arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(watermarkInfo.line1, targetSize / 2, targetSize - 45)

        ctx.font = '20px Arial'
        ctx.fillText(watermarkInfo.line2, targetSize / 2, targetSize - 20)

        // 결과 이미지를 base64로 변환
        const processedImageUrl = canvas.toDataURL('image/jpeg', 0.9)
        resolve(processedImageUrl)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
} 