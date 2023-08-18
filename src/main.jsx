import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import App from "./App";
import Auth from "./components/Auth/Auth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Gastos from "./pages/Gastos";
import NuevoAuto from "./pages/NuevoAuto";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import PruebaImagenes from "./pages/PruebaImagenes";
import ListadoVehiculos from "./pages/ListadoVehiculos";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/Auth" element={<Auth />}>
          <Route path="Login" element={<Login />} />
        </Route>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="Gastos" element={<Gastos />} />
          <Route path="NuevoAuto" element={<NuevoAuto />} />
          <Route path="PruebaImagenes" element={<PruebaImagenes />} />
          <Route path="ListadoVehiculos" element={<ListadoVehiculos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
