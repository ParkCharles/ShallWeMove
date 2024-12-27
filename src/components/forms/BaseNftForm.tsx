import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert, Stack, Grid } from '@mui/material'
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'
import { ReactNode } from 'react'

export interface BaseFormData {
  title: string
  description: string
  imageFile: File | null
  imageUrl: string
  location: string
  participants: number
  achievement: number
  duration: number
  date: Dayjs
  startTime: Dayjs
  endTime: Dayjs
  tags: string
  processedImageUrl: string
}

interface BaseNftFormProps {
  formData: BaseFormData
  onFormChange: (updates: Partial<BaseFormData>) => void
  onImageChange: (file: File) => Promise<void>
  onSubmit: (e: React.FormEvent) => Promise<void>
  loading: boolean
  error: string | null
  title: string
  children?: ReactNode
}

export const BaseNftForm = ({
  formData,
  onFormChange,
  onImageChange,
  onSubmit,
  loading,
  error,
  title,
  children
}: BaseNftFormProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom>{title}</Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
          <Grid container spacing={3}>
            {/* 기본 필드들 */}
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => onFormChange({ title: e.target.value })}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => onFormChange({ description: e.target.value })}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            {/* 추가 필드를 위한 슬롯 */}
            {children}

            {/* 이미지 업로드 */}
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
                    startIcon={<CloudUploadIcon />}
                    disabled={loading}
                    fullWidth
                  >
                    Upload Image
                  </Button>
                </label>
              </Paper>
            </Grid>

            {/* 이미지 미리보기 */}
            {formData.processedImageUrl && (
              <Grid item xs={12}>
                <Box sx={{ width: '100%', mt: 2 }}>
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
                </Box>
              </Grid>
            )}

            {/* 에러 메시지 */}
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            {/* 제출 버튼 */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !formData.title || !formData.imageUrl}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : 'Create NFT'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </LocalizationProvider>
  )
} 