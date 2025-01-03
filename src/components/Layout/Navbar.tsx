import { AppBar, Toolbar, Stack, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
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

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: var(--padding-mobile);
  }
`;

const MenuItems = styled(Stack)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(IconButton)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <StyledToolbar>
        <Logo to="/">ShallWeMove</Logo>

        <MenuItems direction="row" spacing={2} alignItems="center">
          <NavButton to="/hiking">Record Hiking</NavButton>
          <WalletButton />
        </MenuItems>

        <MobileMenu
          color="inherit"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MenuIcon />
        </MobileMenu>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem component={RouterLink} to="/hiking" onClick={() => setAnchorEl(null)}>
            Record Hiking
          </MenuItem>
          <MenuItem>
            <WalletButton />
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar 