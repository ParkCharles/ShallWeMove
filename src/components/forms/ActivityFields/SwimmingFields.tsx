import { Grid, TextField, Paper, Button, Typography, Stack } from '@mui/material'
import { Upload as UploadIcon } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { BaseFormData } from '../BaseNftForm'

interface SwimmingFormData extends BaseFormData {
  totalDistance: number
  poolLength: number
  numLaps: number
}

interface SwimmingFieldsProps {
  formData: SwimmingFormData
  onFormChange: (updates: Partial<SwimmingFormData>) => void
  onFitUpload: (file: File) => Promise<void>
  loading: boolean
}

export const SwimmingFields = ({
  formData,
  onFormChange,
  onFitUpload,
  loading
}: SwimmingFieldsProps) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          label="Location"
          value={formData.location}
          onChange={(e) => onFormChange({ location: e.target.value })}
          fullWidth
          placeholder="Pool or beach name"
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
            accept=".fit"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onFitUpload(file)
            }}
            style={{ display: 'none' }}
            id="fit-upload"
          />
          <label htmlFor="fit-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
              disabled={loading}
              fullWidth
            >
              Upload FIT Track
            </Button>
          </label>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Upload your FIT file to automatically fill distance, duration, and time details
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
                Total Distance: {(formData.totalDistance).toFixed(0)}m
              </Typography>
              <Typography variant="body2" align="center" color="primary.main">
                Pool Length: {formData.poolLength}m • Laps: {formData.numLaps}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      )}

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