import { Box, Typography, Button, Stack } from '@mui/material'

export const ThemeTest = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1" gutterBottom>
        Theme Test
      </Typography>
      <Typography variant="h2" gutterBottom>
        Colors and Typography
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
        <Button variant="contained" color="neutral">
          Neutral Button
        </Button>
      </Stack>
      <Typography variant="body1" gutterBottom>
        This is a body text using our custom font family (Inter)
      </Typography>
    </Box>
  )
} 