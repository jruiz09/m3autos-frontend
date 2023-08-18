import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export default function TarjetaVehiculos({VEHICULOS}) {

  const imagen = '/src/assets/'+VEHICULOS.Image
  console.log("IMAGEN RUTA ", imagen)
    return(
        <>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={VEHICULOS.Modelo}
        height="200"
        image= {imagen}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {VEHICULOS.Modelo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {VEHICULOS.Año}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color= {"error"}size="small">Registrar Gasto/Ganancia</Button>
        <Button size="small">Detalle</Button>
      </CardActions>
    </Card>
        </>
    )
}