import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import MaterialReactTable from "material-react-table";
import { useEffect, useState } from "react";
import TarjetaVehiculos from "../components/TarjetaVehiculos";
import api from "../components/utils/api";
export default function ListadoVehiculos() {
  const userToken = localStorage.getItem("user-token");
  const UrlVehiculos = api.urlAPI + "vehiculo";

  const [vehiculos, setVehiculos] = useState([]);

  const ListarVehiculos = async () => {
    const headers = { "m3-token": userToken };
    console.log(headers);
    let res = await fetch(UrlVehiculos, { headers });
    let data = await res.json();
    setVehiculos(data);
    console.log(data);
  };

  useEffect(() => {
    ListarVehiculos();
  }, []);
  return (
    <>
      <Typography variant="h4" color="black" align="center" pb={1} m={2}>
        Listado Vehiculos
      </Typography>

      <Grid container alignItems={"center"}>
        {vehiculos.map((vehiculo) => {
          return (
            <Grid item xs={12} sm={6} md={4} sx={{ p: 3 }} key={vehiculo.Image}>
              <TarjetaVehiculos VEHICULOS={vehiculo} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
