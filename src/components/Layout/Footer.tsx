import { Box, Container, Grid, Typography, Stack, Link } from '@mui/material'
import { Email as EmailIcon } from '@mui/icons-material'

export const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{ 
        bgcolor: 'grey.900', 
        color: 'white', 
        py: 6, 
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              <GradientText text="About" gradient="45deg, #FFFFFF 30%, #FE6B8B 90%" />
              <GradientText text="ShallWeMove" gradient="45deg, #FE6B8B 30%, #FF8E53 90%" />
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
              <Link 
                href="mailto:shallwemove.xyz@gmail.com"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'white'
                  }
                }}
              >
                <EmailIcon />
                <Typography variant="body2">
                  shallwemove.xyz@gmail.com
                </Typography>
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link 
                href="https://x.com/ShallWeMOVE21" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'inherit',
                  '&:hover img': {
                    filter: 'brightness(0) invert(1)'
                  }
                }}
              >
                <Box 
                  component="img" 
                  src="/x-logo.svg" 
                  alt="X (Twitter)"
                  sx={{ 
                    width: 24,
                    height: 24,
                    filter: 'brightness(0) invert(0.6)',
                    transition: 'filter 0.2s'
                  }}
                />
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ 
          mt: 4, 
          pt: 4, 
          borderTop: '1px solid', 
          borderColor: 'grey.800' 
        }}>
          <Typography variant="body2" color="grey.400" align="center">
            © {new Date().getFullYear()} Shall We Move. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

const GradientText = ({ text, gradient }: { text: string; gradient: string }) => (
  <Box 
    component="span" 
    sx={{ 
      background: `linear-gradient(${gradient})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      display: 'inline-block',
      mr: 1
    }}
  >
    {text}
  </Box>
) 