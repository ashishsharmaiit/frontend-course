import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function MenuAppBar() {
  const auth = false;
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ 
        flexGrow: 1,
        paddingBottom: "16px"
      }}>
      <AppBar position="static" style={{background: "#D9D9D9"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "#697077" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1,
            color: "#697077",
          }}>
            Learn With AI
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (<Button sx={{color: "#697077"}}>Login</Button>)

          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}