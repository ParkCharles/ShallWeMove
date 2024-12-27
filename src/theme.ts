import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    neutral: { main: string; contrastText: string }
  }
  interface PaletteOptions {
    neutral: { main: string; contrastText: string }
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
  }
}

export const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    }
  }
}) 