import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { Box } from "@mui/system";

import { Link, NavLink } from "react-router-dom";

import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

export default function Navbar({ navegationLinks, children }) {
  const [open, setOpen] = useState(false);


  const navigate = useNavigate();

  const logout = () => {
      localStorage.clear();
      navigate('/auth/login');
  }


  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            /*sx={{ display: { xs: "flex", sm: "none" } }}*/
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            M3 Autos
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
         
              <Button
                color="inherit"
                onClick= {() => logout()}
              >
                <ExitToAppIcon/>
                Cerrar Sesión
              </Button>
            
          </Box>
        </Toolbar>
      </AppBar>
         
                {children}
            
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
                   /*   sx={{ display: { xs: "flex", sm: "none" } }}*/
      >
        <NavListDrawer
          navegationLinks={navegationLinks}
          component={Link}
          setOpen={setOpen}
        />
      </Drawer>
    </>
  );
}
