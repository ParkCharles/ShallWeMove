import FitParser from 'fit-file-parser'

export interface FitData {
  totalDistance: number
  startTime: string
  endTime: string
  duration: number
  poolLength: number
  numLaps: number
}

export const parseFitData = (fitBuffer: ArrayBuffer): Promise<FitData> => {
  return new Promise((resolve, reject) => {
    const fitParser = new FitParser({
      force: true,
      speedUnit: 'km/h',
      lengthUnit: 'm',
    })

    fitParser.parse(fitBuffer, (error: any, data: any) => {
      if (error) {
        reject(error)
        return
      }

      try {
        const sessions = data.sessions || []
        if (sessions.length === 0) {
          throw new Error('No session data found in FIT file')
        }

        const session = sessions[0]
        const totalDistance = session.total_distance || 0
        const startTime = session.start_time
        const endTime = session.timestamp
        const duration = session.total_timer_time || 0
        const poolLength = session.pool_length || 0
        const calculatedLaps = Math.round(totalDistance / poolLength)

        resolve({
          totalDistance: Math.round(totalDistance),
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          duration: Math.round(duration),
          poolLength,
          numLaps: calculatedLaps
        })
      } catch (e) {
        console.error('FIT parsing error:', e)
        reject(new Error('Failed to parse FIT file data'))
      }
    })
  })
} 