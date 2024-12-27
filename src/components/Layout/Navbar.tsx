import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ConnectWallet } from '../ConnectWallet'
import { navigationButtons } from '@/routes'

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button 
            component={RouterLink} 
            to="/"
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              },
              px: 1,
              py: 0.2,
              fontSize: '0.875rem',
              fontWeight: 'bold',
              minHeight: '28px',
              lineHeight: 1
            }}
          >
            ShallWeMove
          </Button>
        </Box>
        
        {navigationButtons.map((button) => (
          <Button
            key={button.path}
            color="inherit"
            component={RouterLink}
            to={button.path}
            startIcon={button.icon}
            sx={{ mr: 1 }}
          >
            {button.label}
          </Button>
        ))}

        <Box sx={{ ml: 2 }}>
          <ConnectWallet />
        </Box>
      </Toolbar>
    </AppBar>
  )
} 