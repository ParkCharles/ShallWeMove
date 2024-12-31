import { Card, CardContent, CardMedia, Typography, Button, Box, Link } from '@mui/material'
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const ResultCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  overflow: 'hidden',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)'
  }
}))

const ViewButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 600
}))

interface HikingResultProps {
  objectId: string | null
  imageUrl: string
  location: string
}

export const HikingResult = ({ objectId, imageUrl, location }: HikingResultProps) => {
  if (!objectId) return null

  return (
    <ResultCard>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={location}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🎉 Successfully recorded your hiking journey!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Your hiking memory at {location} has been permanently stored on the blockchain.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Link
            href={`https://suiscan.xyz/testnet/object/${objectId}/fields`}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
          >
            <ViewButton
              variant="contained"
              color="primary"
              endIcon={<OpenInNewIcon />}
            >
              View on Sui Scan
            </ViewButton>
          </Link>
        </Box>
      </CardContent>
    </ResultCard>
  )
} 