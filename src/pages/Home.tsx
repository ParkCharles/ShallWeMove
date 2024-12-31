import { Box, Grid, Card, Typography, Container, Button, Stack } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

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
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
          textAlign: 'center',
          mb: 8
        }}
      >
        <Container>
          <Typography 
            variant="h1" 
            gutterBottom
            sx={{
              fontSize: '4rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.05em',
              fontWeight: 'bold',
              transform: 'translateZ(0)',
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            ShallWeMove
          </Typography>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontSize: '2rem',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.1em',
              fontWeight: 500,
              opacity: 0.95
            }}
          >
            Move + Share + Connect
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              fontSize: '1.5rem',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.15)',
              letterSpacing: '0.02em',
              opacity: 0.9,
              fontWeight: 400
            }}
          >
            Store your activities on the blockchain
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ mb: 8 }}>
        <Stack spacing={6}>
          <Stack spacing={4}>
            <Typography variant="h3" align="center">
              Record Your Hiking Journey
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 2 }}>
              Capture every detail of your mountain adventures and store them permanently on the blockchain
            </Typography>
          </Stack>

          <Grid container spacing={6}>
            {hikingFeatures.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title} sx={{ mb: 4 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    transition: 'transform 0.2s',
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
        </Stack>
      </Container>

      {/* Wallet Guide Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Start Your Journey
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            Follow these steps to connect your Sui Wallet and begin recording your hiking memories
          </Typography>
          <Grid container spacing={4}>
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