export const processImage = async (file: File, watermarkInfo: { 
  location: string;
  line2: string;
  line3: string 
}) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Failed to get canvas context')

  const img = await createImageBitmap(file)
  
  // 500x500 크기로 중앙 크롭
  const size = 500
  const sourceSize = Math.min(img.width, img.height)
  const sourceX = (img.width - sourceSize) / 2
  const sourceY = (img.height - sourceSize) / 2

  // 캔버스 크기 설정
  canvas.width = size
  canvas.height = size

  // 이미지를 중앙에서 크롭하여 그리기
  ctx.drawImage(
    img,
    sourceX, sourceY,    // 소스 이미지의 시작점
    sourceSize, sourceSize,    // 소스 이미지에서 가져올 영역 크기
    0, 0,               // 캔버스의 시작점
    size, size          // 캔버스에 그릴 크기
  )

  // 워터마크 배경 (투명에서 어두운색으로 그라데이션)
  const backgroundHeight = canvas.height * 0.175
  const gradient = ctx.createLinearGradient(
    0, canvas.height - backgroundHeight,
    0, canvas.height
  )

  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(0.2, 'rgba(0, 0, 0, 0.5)')
  gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.8)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, canvas.height - backgroundHeight, canvas.width, backgroundHeight)

  // 워터마크 스타일 설정
  ctx.fillStyle = 'white'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  
  // 텍스트 크기 자동 조절 함수
  const fitTextToWidth = (text: string, maxWidth: number) => {
    let fontSize = 24  // 48 → 24로 감소
    ctx.font = `bold ${fontSize}px Inter`
    
    while (ctx.measureText(text).width > maxWidth && fontSize > 8) {  // 16 → 8로 감소
      fontSize--
      ctx.font = `bold ${fontSize}px Inter`
    }
    return fontSize
  }

  const padding = 30
  const maxWidth = canvas.width - (padding * 2)
  const lineHeight = 1.4

  // 각 줄의 텍스트 크기 계산 및 그리기
  const fontSize1 = fitTextToWidth(watermarkInfo.location, maxWidth)
  const fontSize2 = fitTextToWidth(watermarkInfo.line2, maxWidth)
  const fontSize3 = fitTextToWidth(watermarkInfo.line3, maxWidth)

  // 텍스트에 그림자 효과 추가
  const drawTextWithOutline = (text: string, x: number, y: number) => {
    // 텍스트 외곽선
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.strokeText(text, x, y)
    
    // 그림자 효과
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    
    // 텍스트 본체
    ctx.fillStyle = 'white'
    ctx.fillText(text, x, y)
    
    // 효과 초기화
    ctx.shadowColor = 'transparent'
    ctx.strokeStyle = 'transparent'
  }

  // 첫 번째 줄
  ctx.font = `bold ${fontSize1}px Inter`
  drawTextWithOutline(watermarkInfo.location, canvas.width - padding, canvas.height - padding - (fontSize2 * lineHeight) - (fontSize3 * lineHeight))

  // 두 번째 줄
  ctx.font = `bold ${fontSize2}px Inter`
  drawTextWithOutline(watermarkInfo.line2, canvas.width - padding, canvas.height - padding - (fontSize3 * lineHeight))

  // 세 번째 줄
  ctx.font = `bold ${fontSize3}px Inter`
  drawTextWithOutline(watermarkInfo.line3, canvas.width - padding, canvas.height - padding)

  return canvas.toDataURL('image/jpeg', 0.9)
} 