import { Box, Container, Grid, Typography, Stack, Link } from '@mui/material'
import { Email as EmailIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: 'white',
  padding: '3rem 2rem',
  marginTop: 'auto',
  
  '@media (max-width: 768px)': {
    padding: 'var(--padding-mobile)',
  }
}));

const FooterContent = styled(Container)`
  .grid-container {
    margin-bottom: 2rem;
  }
  
  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: white;
    }
  }
  
  .social-icon {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(0.6);
    transition: filter 0.2s;
    
    &:hover {
      filter: brightness(0) invert(1);
    }
  }
  
  .footer-divider {
    margin: 2rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

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
);

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent maxWidth="lg">
        <Grid container spacing={4} className="grid-container">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              <GradientText text="About" gradient="45deg, #FFFFFF 30%, #FE6B8B 90%" />
              <GradientText text="ShallWeMove" gradient="45deg, #FE6B8B 30%, #FF8E53 90%" />
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
                className="contact-link"
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
              >
                <Box 
                  component="img" 
                  src="/x-logo.svg" 
                  alt="X (Twitter)"
                  className="social-icon"
                />
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Box className="footer-divider" />
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
          © {new Date().getFullYear()} Shall We Move. All rights reserved.
        </Typography>
      </FooterContent>
    </StyledFooter>
  )
}

export default Footer 