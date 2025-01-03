import { Box, Grid, Card, Typography, Container, Button, Stack, styled, Paper } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const FeatureGrid = styled(Grid)`
  margin-top: 2rem;
  
  .feature-item {
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.2s;
    margin-bottom: 2rem;
    
    &:hover {
      transform: translateY(-8px);
    }
  }
`;

export const Home = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const hikingFeatures = [
    {
      icon: "🗻",
      title: "Mountain & Trail",
      description: "Record the mountains you climbed and trails you explored"
    },
    {
      icon: "⛰️",
      title: "Peak Elevation",
      description: "Track the highest point you reached on your journey"
    },
    {
      icon: "⏱️",
      title: "Time & Duration",
      description: "Save when you started, finished, and how long you hiked"
    },
    {
      icon: "👥",
      title: "Shared Memory",
      description: "Record everyone who joined and share the blockchain memory together"
    },
    {
      icon: "📸",
      title: "Summit Photo",
      description: "Capture your achievement with a beautiful photo"
    },
    {
      icon: "🌟",
      title: "Forever Memory",
      description: "Store your hiking memories permanently on blockchain"
    }
  ]

  const walletGuideSteps = [
    {
      icon: "💧",
      title: "Install Sui Wallet",
      description: "Get the official Sui Wallet extension from Chrome Web Store",
      buttonText: "Install Wallet",
      buttonLink: "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
    },
    {
      icon: "🔑",
      title: "Create or Import Wallet",
      description: "Set up a new wallet with a secure password or import your existing wallet"
    },
    {
      icon: "🌐",
      title: "Connect to Testnet",
      description: "Click the ⚙️ (settings) icon in your Sui Wallet and select 'Sui Testnet' as your network"
    },
    {
      icon: "🪙",
      title: "Request Testnet SUI Tokens",
      description: "In the same settings menu, scroll down to find 'Request Testnet SUI Tokens'. These tokens are required for storing your hiking records on the blockchain."
    }
  ]  

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FF8E53 0%, #FE6B8B 100%)',
          color: 'white',
          textAlign: 'center',
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/pattern.svg")',
            opacity: 0.1,
            zIndex: 1
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h1" 
            gutterBottom
            sx={{
              fontSize: { xs: '3rem', md: '4.5rem' },
              textShadow: '2px 4px 8px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.05em',
              fontWeight: 800,
              marginBottom: 4,
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            ShallWeMove
          </Typography>
          <Typography 
            variant="h4" 
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 300,
              letterSpacing: '0.1em',
              opacity: 0.9,
              marginBottom: 3,
              animation: 'fadeInUp 1s ease-out 0.2s'
            }}
          >
            Move + Share + Connect
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              fontWeight: 400,
              opacity: 0.8,
              maxWidth: '600px',
              margin: '0 auto',
              animation: 'fadeInUp 1s ease-out 0.4s'
            }}
          >
            Store your activities on the blockchain
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ 
        bgcolor: '#fff5f7',
        py: 8, 
        mb: 8 
      }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Record Your Hiking Journey
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Capture every detail of your mountain adventures and store them permanently on the blockchain
          </Typography>
          <Grid 
            container 
            spacing={8} 
            justifyContent="center"
          >
            {hikingFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    marginBottom: { xs: '2rem', md: 0 },
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom align="center">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Wallet Guide Section */}
      <Box sx={{ 
        bgcolor: '#fdf2f8',
        py: 8 
      }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Start Your Journey
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            Follow these steps to connect your Sui Wallet and begin recording your hiking memories
          </Typography>
          <Grid container spacing={8}>
            {walletGuideSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={step.title}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    position: 'relative',
                    transition: 'transform 0.2s',
                    marginBottom: { xs: '2rem', md: 0 },
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="h2" align="center" sx={{ mb: 2, fontSize: '2.5rem' }}>
                    {step.icon}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    align="center" 
                    sx={{ mb: 2 }}
                  >
                    {step.description}
                  </Typography>
                  {step.buttonText && (
                    <Button
                      variant="contained"
                      href={step.buttonLink}
                      target="_blank"
                      sx={{ 
                        mt: 2,
                        bgcolor: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.dark'
                        }
                      }}
                    >
                      {step.buttonText}
                    </Button>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testnet Info Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 4 }}>
        <Container>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: '0.875rem',
              lineHeight: 1.8
            }}
          >
            Currently in testnet phase - all features are free to try, but please note that recorded data may be deleted. 
            Full data permanence will be guaranteed once we launch on mainnet.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
} 