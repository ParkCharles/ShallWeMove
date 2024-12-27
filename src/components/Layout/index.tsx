import { Box, AppBar, Toolbar, Button, Typography, Alert, ButtonGroup, Container, Grid, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Outlet, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'
import { Email as EmailIcon, LocationOn as LocationIcon, Security as SecurityIcon, AccountBalanceWallet as WalletIcon, Apps as AppsIcon } from '@mui/icons-material'
import { useState } from 'react'
import { navigationButtons } from '../../routes'

export const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const account = useCurrentAccount()
  const [openWalletGuide, setOpenWalletGuide] = useState(false)

  const isActivePath = (path: string) => location.pathname === path

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              color: '#FE6B8B',
              cursor: 'pointer' 
            }}
            onClick={() => navigate('/')}
          >
            Movent
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navigationButtons.map((button) => (
              <Button
                key={button.path}
                component={RouterLink}
                to={button.path}
                startIcon={button.icon}
                variant="outlined"
                sx={{ 
                  bgcolor: isActivePath(button.path) ? '#FE6B8B' : 'transparent',
                  color: isActivePath(button.path) ? 'white' : '#333',
                  '&:hover': {
                    bgcolor: isActivePath(button.path) ? '#FE6B8B' : 'rgba(254, 107, 139, 0.08)'
                  }
                }}
              >
                {button.label}
              </Button>
            ))}
          </Box>
          <Box 
            sx={{ 
              ml: 4,
              animation: !account ? 'pulse 2s infinite' : 'none',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(254, 107, 139, 0.4)'
                },
                '70%': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 0 10px rgba(254, 107, 139, 0)'
                },
                '100%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(254, 107, 139, 0)'
                }
              }
            }}
          >
            <ConnectButton 
              connectText="Connect Wallet" 
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: !account ? '#FE6B8B' : undefined,
                color: !account ? 'white' : undefined
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1 }}>
        {!account && window.location.pathname.includes('/mint') && (
          <>
            <Alert 
              severity="info" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto', 
                mb: 2,
                display: 'flex',
                alignItems: 'center'
              }}
              action={
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => setOpenWalletGuide(true)}
                >
                  Learn More
                </Button>
              }
            >
              Please connect your wallet to mint NFTs
            </Alert>

            <Dialog 
              open={openWalletGuide} 
              onClose={() => setOpenWalletGuide(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>
                <Typography variant="h5" sx={{ color: '#FE6B8B' }}>
                  Get Started with Sui Wallet
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={4} sx={{ py: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                      To mint NFTs on Movent, you'll need to install the Sui Wallet browser extension first.
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <WalletIcon sx={{ fontSize: 48, color: '#FE6B8B', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        1. Install Sui Wallet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Download and install the Sui Wallet browser extension from the Chrome Web Store
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <SecurityIcon sx={{ fontSize: 48, color: '#FE6B8B', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        2. Create Account
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Set up your wallet using social login or create a new account with a secure password
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <AppsIcon sx={{ fontSize: 48, color: '#FE6B8B', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        3. Connect & Mint
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Connect your wallet to Movent and start minting your NFTs
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button 
                  onClick={() => setOpenWalletGuide(false)}
                  sx={{ color: '#333' }}
                >
                  Close
                </Button>
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
                  Install Sui Wallet
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        <Outlet />
      </Box>
      <Box sx={{ bgcolor: '#1A1A1A', color: 'white', py: 6, mt: 'auto' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                About Movent
              </Typography>
              <Typography variant="body2" color="grey.400">
                Movent is a platform where you can mint NFTs of your special moments, 
                hiking adventures, and swimming achievements on the Sui blockchain.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon sx={{ color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.400">
                    #205, 61, Yonsei-ro 2na-gil, Seodaemun-gu,<br />
                    Seoul, Republic of Korea<br />
                    03777
                  </Typography>
                </Box>
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
                  style={{ color: 'inherit', textDecoration: 'none' }}
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
    </Box>
  )
} 