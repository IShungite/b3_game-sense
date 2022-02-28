import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "reducers/authSlice";
import authService from "services/auth.service";

const pagesLeft = [
  { name: "Accueil", url: RouteUrls.Home },
  { name: "Magasins", url: RouteUrls.Shops },
  { name: "Statistiques", url: RouteUrls.Statistics },
];
const pagesRight = [
  { name: "Connexion", url: RouteUrls.Login },
  { name: "Inscription", url: RouteUrls.Register },
];

export default function AppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const settings = [
    {
      name: "Profile",
      callback: () => {
        console.log("Profile");
      },
    },
    {
      name: "Logout",
      callback: () => {
        dispatch(logout(authService.logout()));
      },
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickNavItem = (url: string) => {
    navigate(url);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (callback?: () => void) => {
    setAnchorElUser(null);

    if (callback) callback();
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Normal screen */}
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            Game-Sense
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pagesLeft.map((page) => (
                <MenuItem key={page.name} onClick={() => handleClickNavItem(page.url)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Small Screen screen */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            Game-Sense
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pagesLeft.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleClickNavItem(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {/* Small Screen screen End */}

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.callback)}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              {pagesRight.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleClickNavItem(page.url)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Typography textAlign="center" fontSize="default">
                    {page.name}
                  </Typography>
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}
