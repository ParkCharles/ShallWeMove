import { Box, Grid, Card, CardContent, Typography, CardActionArea, Container, Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { DirectionsWalk as DirectionsWalkIcon, Pool as PoolIcon, Security as SecurityIcon, AccountBalanceWallet as WalletIcon, Apps as AppsIcon } from '@mui/icons-material'
import { useEffect } from 'react'

export const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const categories = [
    {
      title: 'Hiking',
      description: 'Record your hiking adventures with elevation gains and trail details.',
      image: '/hiking.jpg',
      path: '/mint/hiking',
      icon: <DirectionsWalkIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'Swimming',
      description: 'Track your swimming sessions with distance and lap counts.',
      image: '/swimming.jpg',
      path: '/mint/swimming',
      icon: <PoolIcon sx={{ fontSize: 40 }} />
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

      {/* Wallet Guide Section */}
      <Container sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: '2.5rem' }}>
          Get Started with Sui Wallet
        </Typography>
        <Box sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          <Typography variant="body1" align="center" sx={{ mb: 4, fontSize: '1.2rem' }}>
            To store your records on the blockchain, you need to connect your Sui Wallet first.
          </Typography>
          <Typography variant="body1" align="center">
            Follow these simple steps:
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}>
              <WalletIcon sx={{ fontSize: 56, color: '#FE6B8B', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem' }}>
                1. Install Sui Wallet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', mb: 3 }}>
                Download and install the Sui Wallet browser extension from the Chrome Web Store. It's free and only takes a minute.
              </Typography>
              <Button
                variant="contained"
                href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                target="_blank"
                sx={{ 
                  bgcolor: '#FE6B8B',
                  '&:hover': {
                    bgcolor: '#FE6B8B',
                    opacity: 0.9
                  }
                }}
              >
                Install Now
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}>
              <SecurityIcon sx={{ fontSize: 56, color: '#FE6B8B', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem' }}>
                2. Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                Set up your wallet using social login or create a new account with a secure password. Make sure to safely store your recovery phrase.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}>
              <AppsIcon sx={{ fontSize: 56, color: '#FE6B8B', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem' }}>
                3. Connect & Start
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                Once installed, click the "Connect Wallet" button at the top of the page. Then you're ready to store your activities on the blockchain!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Choose Your Activity
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Record your activities on the blockchain and earn rewards for your achievements!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(category.path)}
                  sx={{ height: '100%', p: 3 }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ color: '#FE6B8B', mb: 2 }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem' }}>
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      {category.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
} 