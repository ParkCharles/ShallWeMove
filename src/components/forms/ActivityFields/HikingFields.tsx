import { Grid, TextField, Paper, Button, Typography, Stack } from '@mui/material'
import { Upload as UploadIcon } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { BaseFormData } from '../BaseNftForm'

interface HikingFormData extends BaseFormData {
  totalDistance: number
}

interface HikingFieldsProps {
  formData: HikingFormData
  onFormChange: (updates: Partial<HikingFormData>) => void
  onGpxUpload: (file: File) => Promise<void>
  loading: boolean
}

// 시간 포맷팅 함수
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

export const HikingFields = ({
  formData,
  onFormChange,
  onGpxUpload,
  loading
}: HikingFieldsProps) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          label="Location"
          value={formData.location}
          onChange={(e) => onFormChange({ location: e.target.value })}
          fullWidth
          placeholder="Mountain name or trail"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Number of Participants"
          type="number"
          value={formData.participants}
          onChange={(e) => onFormChange({ participants: parseInt(e.target.value) || 1 })}
          fullWidth
          inputProps={{ min: 1 }}
        />
      </Grid>

      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderStyle: 'dashed' }}>
          <input
            type="file"
            accept=".gpx"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onGpxUpload(file)
            }}
            style={{ display: 'none' }}
            id="gpx-upload"
          />
          <label htmlFor="gpx-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
              disabled={loading}
              fullWidth
            >
              Upload GPX Track
            </Button>
          </label>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Upload your GPX file to automatically fill elevation, duration, and time details
          </Typography>
        </Paper>
      </Grid>

      {formData.totalDistance > 0 && (
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 2, 
              bgcolor: 'primary.50',
              border: 1,
              borderColor: 'primary.200',
              borderRadius: 1
            }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle1" align="center" color="primary.main">
                Total Distance: {(formData.totalDistance / 1000).toFixed(2)}km
              </Typography>
              <Typography variant="body2" align="center" color="primary.main">
                Duration: {formatDuration(formData.duration)}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      )}

      <Grid item xs={12} md={6}>
        <TextField
          label="Max Elevation (m)"
          type="number"
          value={formData.achievement || ''}
          onChange={(e) => onFormChange({ 
            achievement: e.target.value === '' ? 0 : parseInt(e.target.value) 
          })}
          fullWidth
          inputProps={{ min: 0 }}
          placeholder="Highest point reached"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Duration (minutes)"
          type="number"
          value={formData.duration || ''}
          onChange={(e) => onFormChange({ 
            duration: e.target.value === '' ? 0 : parseInt(e.target.value) 
          })}
          fullWidth
          inputProps={{ min: 0 }}
          placeholder="e.g., 180 for 3h 0m"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <DatePicker
          label="Date"
          value={formData.date}
          onChange={(newValue) => onFormChange({ 
            date: newValue || formData.date 
          })}
          sx={{ width: '100%' }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TimePicker
          label="Start Time"
          value={formData.startTime}
          onChange={(newValue) => onFormChange({ 
            startTime: newValue || formData.startTime,
            endTime: (newValue || formData.startTime).add(formData.duration, 'minute')
          })}
          sx={{ width: '100%' }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TimePicker
          label="End Time"
          value={formData.endTime}
          onChange={(newValue) => {
            if (newValue) {
              const duration = newValue.diff(formData.startTime, 'minute')
              onFormChange({ 
                endTime: newValue,
                duration: duration > 0 ? duration : 0
              })
            }
          }}
          sx={{ width: '100%' }}
        />
      </Grid>
    </>
  )
} 