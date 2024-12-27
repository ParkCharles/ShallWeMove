import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { RouterProvider } from 'react-router-dom'
import { theme } from './theme/theme'
import { router } from './routes'
import { SuiProvider } from './providers/SuiProvider'

function App() {
  return (
    <SuiProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </SuiProvider>
  )
}

export default App
