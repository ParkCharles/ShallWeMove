import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export { Footer } from './Footer'

const MainLayout = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: var(--max-width-content);
    margin: 0 auto;
    padding: 2rem;
    
    @media (max-width: 768px) {
      padding: var(--padding-mobile);
    }
  }
`;

export const Layout = () => {
  return (
    <MainLayout>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </MainLayout>
  )
}

export { MainLayout } 