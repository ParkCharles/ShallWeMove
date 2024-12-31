import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/Layout/MainLayout'
import { Home } from '@/pages/Home'
import { Hiking } from '@/pages/Hiking'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'

// 네비게이션 버튼 - 하이킹 기록에 초점
export const navigationButtons = [
  { label: 'Record Hiking', path: '/hiking', icon: <DirectionsWalkIcon /> }
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
        path: 'hiking',
        element: <Hiking />,
        loader: () => {
          window.scrollTo(0, 0)
          return null
        }
      }
    ]
  }
]) 