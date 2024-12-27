export const processImage = async (file: File, watermarkInfo: { line1: string; line2: string; line3: string }) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Failed to get canvas context')

  const img = await createImageBitmap(file)
  canvas.width = img.width
  canvas.height = img.height

  // 이미지 그리기
  ctx.drawImage(img, 0, 0)

  // 워터마크 배경 (투명에서 어두운색으로 그라데이션)
  const backgroundHeight = canvas.height * 0.175
  const gradient = ctx.createLinearGradient(
    0, canvas.height - backgroundHeight,  // 시작점 (상단 - 투명)
    0, canvas.height                      // 종료점 (하단 - 어두움)
  )

  // 그라데이션 색상 설정
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')      // 상단: 완전 투명
  gradient.addColorStop(0.2, 'rgba(0, 0, 0, 0.5)')  // 상단과 중간: 더 진한 반투명
  gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.8)')  // 중간과 하단: 더 어두움
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)')    // 하단: 거의 검정

  // 그라데이션 배경 적용
  ctx.fillStyle = gradient
  ctx.fillRect(0, canvas.height - backgroundHeight, canvas.width, backgroundHeight)

  // 워터마크 스타일 설정
  ctx.fillStyle = 'white'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  
  // 텍스트 크기 자동 조절 함수
  const fitTextToWidth = (text: string, maxWidth: number) => {
    let fontSize = 48  // 72 → 48로 감소
    ctx.font = `bold ${fontSize}px Inter`
    
    while (ctx.measureText(text).width > maxWidth && fontSize > 16) {  // 20 → 16으로 감소
      fontSize--
      ctx.font = `bold ${fontSize}px Inter`
    }
    return fontSize
  }

  const padding = 30
  const maxWidth = canvas.width - (padding * 2)
  const lineHeight = 1.4

  // 각 줄의 텍스트 크기 계산 및 그리기
  const fontSize1 = fitTextToWidth(watermarkInfo.line1, maxWidth)
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
  drawTextWithOutline(watermarkInfo.line1, canvas.width - padding, canvas.height - padding - (fontSize2 * lineHeight) - (fontSize3 * lineHeight))

  // 두 번째 줄
  ctx.font = `bold ${fontSize2}px Inter`
  drawTextWithOutline(watermarkInfo.line2, canvas.width - padding, canvas.height - padding - (fontSize3 * lineHeight))

  // 세 번째 줄
  ctx.font = `bold ${fontSize3}px Inter`
  drawTextWithOutline(watermarkInfo.line3, canvas.width - padding, canvas.height - padding)

  return canvas.toDataURL('image/jpeg', 0.9)
} 