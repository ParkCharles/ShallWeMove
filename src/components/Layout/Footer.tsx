import { Box, Container, Grid, Typography, Stack } from '@mui/material'
import { Email as EmailIcon } from '@mui/icons-material'

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 'auto' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              <Box component="span" sx={{ 
                background: 'linear-gradient(45deg, #FFFFFF 30%, #FE6B8B 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                display: 'inline-block',
                mr: 1
              }}>
                About
              </Box>
              <Box component="span" sx={{ 
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                display: 'inline-block'
              }}>
                ShallWeMove
              </Box>
            </Typography>
            <Typography variant="body2" color="grey.400">
              Record your physical activities on the blockchain. Share your achievements with the community and connect with like-minded people. Get inspired and motivate others through your active lifestyle.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: 'grey.400' }} />
                <Typography variant="body2" color="grey.400">
                  shallwemove.xyz@gmail.com
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <a 
                href="https://x.com/ShallWeMOVE21" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'inherit' }}
              >
                <Box 
                  component="img" 
                  src="/x-logo.svg" 
                  alt="X (Twitter)"
                  sx={{ 
                    width: 24,
                    height: 24,
                    filter: 'brightness(0) invert(0.6)',
                    '&:hover': {
                      filter: 'brightness(0) invert(1)'
                    }
                  }}
                />
              </a>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'grey.800' }}>
          <Typography variant="body2" color="grey.400" align="center">
            © {new Date().getFullYear()} Shall We Move. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
} 