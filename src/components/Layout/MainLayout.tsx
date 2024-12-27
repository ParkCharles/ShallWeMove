import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from '../Layout/Footer'

export const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ p: 3, flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
} 