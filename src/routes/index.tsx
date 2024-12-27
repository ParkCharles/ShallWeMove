import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/Layout/MainLayout'
import { Home } from '@/pages/Home'
import { MintHiking } from './mint/MintHiking'
import { MintSwimming } from './mint/MintSwimming'
import { Profile } from '@/pages/Profile'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import PoolIcon from '@mui/icons-material/Pool'

// 네비게이션 버튼 설정 복원
export const navigationButtons = [
  { label: 'Hiking', path: '/mint/hiking', icon: <DirectionsWalkIcon /> },
  { label: 'Swimming', path: '/mint/swimming', icon: <PoolIcon /> }
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => {
          window.scrollTo(0, 0)
          return null
        }
      },
      {
        path: 'mint/hiking',
        element: <MintHiking />,
        loader: () => {
          window.scrollTo(0, 0)
          return null
        }
      },
      {
        path: 'mint/swimming',
        element: <MintSwimming />,
        loader: () => {
          window.scrollTo(0, 0)
          return null
        }
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: () => {
          window.scrollTo(0, 0)
          return null
        }
      }
    ]
  }
]) 