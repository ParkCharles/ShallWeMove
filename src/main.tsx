import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { SuiProvider } from '@/providers/SuiProvider'
import { router } from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/theme'
import '@mysten/dapp-kit/dist/index.css'

document.title = 'Shall We Move'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SuiProvider>
        <RouterProvider router={router} />
      </SuiProvider>
    </ThemeProvider>
  </React.StrictMode>
)
