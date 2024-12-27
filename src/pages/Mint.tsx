import { Box, Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Celebration as CelebrationIcon, Hiking as HikingIcon, Pool as PoolIcon } from '@mui/icons-material'

export const Mint = () => {
  const navigate = useNavigate()

  const categories = [
    {
      title: 'Moments',
      description: 'Create NFT for your special moments and events',
      icon: <CelebrationIcon sx={{ fontSize: 48 }} />,
      path: '/mint/moments',
      color: '#FE6B8B'
    },
    {
      title: 'Hiking',
      description: 'Record your hiking adventures',
      icon: <HikingIcon sx={{ fontSize: 48 }} />,
      path: '/mint/hiking',
      color: '#4CAF50'
    },
    {
      title: 'Swimming',
      description: 'Track your swimming achievements',
      icon: <PoolIcon sx={{ fontSize: 48 }} />,
      path: '/mint/swimming',
      color: '#2196F3'
    }
  ]

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose Category
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 6 }}>
        Select the type of moment you want to create
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
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: category.color, mb: 2 }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
} 