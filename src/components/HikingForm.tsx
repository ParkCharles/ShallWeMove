import { Grid, TextField, Paper, Button, Typography, Stack, Alert, CircularProgress } from '@mui/material'
import { Upload as UploadIcon } from '@mui/icons-material'
import dayjs, { Dayjs } from 'dayjs'

export interface HikingFormData {
  location: string
  description: string
  imageFile: File | null
  imageUrl: string
  participants: number
  maxElevation: number
  duration: number
  date: Dayjs
  startTime: string
  endTime: string
  totalDistance: number
  processedImageUrl: string
  gpxFile: File | null
}

interface HikingFormProps {
  formData: HikingFormData
  onFormChange: (updates: Partial<HikingFormData>) => void
  onImageChange: (file: File) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  loading: boolean
  error: string | null
  children?: React.ReactNode
  onGpxUpload?: (file: File) => Promise<void>
}

export const HikingForm = ({ 
  formData, 
  onFormChange, 
  onImageChange,
  onSubmit,
  loading,
  error,
  onGpxUpload
}: HikingFormProps) => {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" align="center">
        Record your hiking journey
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderStyle: 'dashed' }}>
            <input
              type="file"
              accept=".gpx"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file && onGpxUpload) onGpxUpload(file)
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
                Upload GPX File
              </Button>
            </label>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="date"
            label="Date"
            value={formData.date.format('YYYY-MM-DD')}
            onChange={(e) => onFormChange({ date: dayjs(e.target.value) })}
            fullWidth
            disabled={!!formData.gpxFile}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="time"
            label="Start Time"
            value={formData.startTime}
            onChange={(e) => onFormChange({ startTime: e.target.value })}
            fullWidth
            disabled={!!formData.gpxFile}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="time"
            label="End Time"
            value={formData.endTime}
            onChange={(e) => onFormChange({ endTime: e.target.value })}
            fullWidth
            disabled={!!formData.gpxFile}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            label="Max Elevation (m)"
            value={formData.maxElevation}
            onChange={(e) => onFormChange({ maxElevation: Number(e.target.value) })}
            fullWidth
            disabled={!!formData.gpxFile}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            label="Duration (minutes)"
            value={formData.duration}
            onChange={(e) => onFormChange({ duration: Number(e.target.value) })}
            fullWidth
            disabled={!!formData.gpxFile}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="text"
            label="Total Distance (km)"
            value={(formData.totalDistance / 1000).toFixed(2)}
            fullWidth
            disabled
          />
        </Grid>

        {formData.gpxFile && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary">
              Please fill in the following information below:
            </Typography>
          </Grid>
        )}

        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <TextField
                label="Location"
                value={formData.location}
                onChange={(e) => onFormChange({ location: e.target.value })}
                fullWidth
                placeholder="Mountain name or trail"
              />
              
              <TextField
                type="number"
                label="Participants"
                value={formData.participants || ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? 0 : Number(e.target.value)
                  onFormChange({ participants: value })
                }}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => onFormChange({ description: e.target.value })}
              multiline
              rows={5}
              fullWidth
              sx={{ 
                height: '100%',
                '& .MuiInputBase-root': {
                  height: '100%'
                }
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderStyle: 'dashed' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onImageChange(file)
              }}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<UploadIcon />}
                disabled={loading}
                fullWidth
              >
                Upload Photo
              </Button>
            </label>
          </Paper>
        </Grid>

        {formData.processedImageUrl && (
          <Grid item xs={12}>
            <img
              src={formData.processedImageUrl}
              alt="Preview"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "8px",
                margin: "0 auto",
                display: "block"
              }}
            />
          </Grid>
        )}

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading || !formData.location || !formData.imageUrl}
            onClick={onSubmit}
          >
            {loading ? <CircularProgress size={24} /> : 'Record Hiking Journey on the Blockchain'}
          </Button>
        </Grid>
      </Grid>
    </Stack>
  )
} 