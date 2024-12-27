export interface GpxData {
  maxElevation: number
  totalDistance: number
  startTime: string
  endTime: string
}

export const parseGpxData = (gpxContent: string): GpxData => {
  const parser = new DOMParser()
  const gpx = parser.parseFromString(gpxContent, 'text/xml')
  const trackPoints = Array.from(gpx.getElementsByTagName('trkpt'))
  
  // 고도 데이터 추출 및 소수점 버림
  const elevations = trackPoints
    .map(point => Math.floor(parseFloat(point.getElementsByTagName('ele')[0]?.textContent || '0')))
  const maxElevation = Math.max(...elevations, 0)

  // 시작/종료 시간 추출
  const times = trackPoints
    .map(point => point.getElementsByTagName('time')[0]?.textContent || '')
    .filter(time => time !== '')
  const startTime = times[0] || new Date().toISOString()
  const endTime = times[times.length - 1] || new Date().toISOString()

  // 총 거리 계산 (Haversine formula)
  let totalDistance = 0
  for (let i = 1; i < trackPoints.length; i++) {
    const prev = trackPoints[i - 1]
    const curr = trackPoints[i]
    
    const lat1 = parseFloat(prev.getAttribute('lat') || '0')
    const lon1 = parseFloat(prev.getAttribute('lon') || '0')
    const lat2 = parseFloat(curr.getAttribute('lat') || '0')
    const lon2 = parseFloat(curr.getAttribute('lon') || '0')
    
    const R = 6371e3 // 지구 반경 (미터)
    const φ1 = lat1 * Math.PI/180
    const φ2 = lat2 * Math.PI/180
    const Δφ = (lat2-lat1) * Math.PI/180
    const Δλ = (lon2-lon1) * Math.PI/180

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    
    totalDistance += R * c
  }

  return {
    maxElevation,
    totalDistance: Math.round(totalDistance),
    startTime,
    endTime
  }
} 