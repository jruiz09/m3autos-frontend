import Navbar from "./components/menu/Navbar";

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const navegationLinks = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Gastos",
    path: "/Gastos",
    icon: <HomeIcon />,
  },
  {
    title: "Nuevo Auto",
    path: "/NuevoAuto",
    icon: <DirectionsCarIcon />,
  },
  {
    title: "Prueba Imagenes",
    path: "/PruebaImagenes",
    icon: <DirectionsCarIcon />,
  },
  {
    title: "Lista Vehiculos",
    path: "/ListadoVehiculos",
    icon: <DirectionsCarIcon />,
  },
];

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem("user-token");
    console.log("UserToken: ", userToken);
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/auth/login");
      console.log("IsLogged: ", isLoggedIn);
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <>
      <React.Fragment>
        {isLoggedIn && (
          <Navbar
            navegationLinks={navegationLinks}
            children={<Outlet />}
          ></Navbar>
        )}
      </React.Fragment>
    </>
  );
}

export default App;
