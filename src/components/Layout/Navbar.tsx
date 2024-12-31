import { AppBar, Toolbar, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { WalletButton } from '@/providers/SuiProvider'

// 공통 버튼 스타일
const commonButtonStyles = `
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 500;
  text-transform: none;
  border: 1px solid rgba(0, 0, 0, 0.12);
`

// 로고 스타일
const Logo = styled(RouterLink)`
  ${commonButtonStyles}
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: inherit;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`

// 네비게이션 버튼 스타일
const NavButton = styled(RouterLink)`
  ${commonButtonStyles}
  color: inherit;
  background-color: transparent;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`

export const Navbar = () => {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo to="/">
          ShallWeMove
        </Logo>

        <Stack direction="row" spacing={2} alignItems="center">
          <NavButton to="/hiking">
            Record Hiking
          </NavButton>
          <WalletButton />
        </Stack>
      </Toolbar>
    </AppBar>
  )
} 