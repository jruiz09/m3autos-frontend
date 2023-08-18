import { MenuItem, Stack, TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Button } from "@mui/material";
import { Grid, Select } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import api from '../components/utils/api';
import swal from 'sweetalert';
import axios from "axios";

export default function NuevoAuto() {

    const userToken = localStorage.getItem('user-token');
    const UrlVehiculos = api.urlAPI + "vehiculo"

    const [descripcion, setDescripcion] = useState("")
    const [tipoVehiculo, setTipoVehiculo] = useState("")
    const [año, setAño] = useState("")
    const [patente, setPatente] = useState("")
    const [km, setKm] = useState("")
    const [tipoValor, setTipoValor] = useState("")
    const [precioDolar, setPrecioDolar] = useState(0)
    const [precioPeso, setPrecioPeso] = useState(0)
    const [valorDolar, setValorDolar] = useState(0)

    const [imageUrl, setImageUrl] = useState(null);
    const [file1, setFile] = useState("");
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(event.target.files[0]);
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const formData = new FormData()

    formData.append('Image', file1)
    formData.append('TipoVehiculo', tipoVehiculo)
    formData.append('Modelo', descripcion)
    formData.append('Año', año)
    formData.append('Patente', patente)
    formData.append('Km', km)
    formData.append('TipoValor', tipoValor)
    formData.append('PrecioDolar', precioDolar)
    formData.append('PrecioPeso', precioPeso)
    formData.append('ValorDolar', valorDolar)


    

    const GuardarVehiculo = async () => {

        const headers = { 'm3-token': userToken }
       

      console.log("file => ", file1)
            await axios.post(UrlVehiculos, formData, { headers })
                .then(response => {
                    const result = response.data;
                    swal({
                        title: result.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 4000
                    });
            
                    console.log("RESPUESTA API", result)

              
                }
                )
                .catch(err => {
                    console.log("Error", err)
                    console.log("URL", UrlVehiculos)
                    console.log("Post", formData)
                    swal({
                        title: err,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 4000
                    });

                })
        
    }


    return (
        <>

            <Typography
                variant="h4"
                color="black"
                align="center"
                pb={1}
                m={2}
            >
                Nuevo Auto
            </Typography>
            <Grid container >
                <Grid sx={{ p: 1 }} item xs={6}>
                    <InputLabel id="demo-simple-select-label">Tipo Vehiculo</InputLabel>
                    <Select

                        value={tipoVehiculo}
                        onChange={e => setTipoVehiculo(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value={"Auto"}>Auto</MenuItem>
                        <MenuItem value={"Camioneta"}>Camioneta</MenuItem>
                    </Select>
                    <TextField sx={{ pt: 2, mt: 2 }} label="Modelo" variant="standard" value={descripcion} onChange={e => setDescripcion(e.target.value)} fullWidth />
                    <TextField sx={{ pt: 2, mt: 2 }} label="Año" variant="standard" value={año} onChange={e => setAño(e.target.value)} fullWidth />
                    <TextField sx={{ pt: 2, mt: 2 }} label="Patente" variant="standard" value={patente} onChange={e => setPatente(e.target.value)} fullWidth />
                    <TextField sx={{ pt: 2, mt: 2 }} label="KM" variant="standard" value={km} onChange={e => setKm(e.target.value)} fullWidth />

                </Grid>
                <Grid sx={{ p: 1 }} item xs={6}>
                    <InputLabel id="demo-simple-select-label">Tipo Valor</InputLabel>
                    <Select

                        value={tipoValor}
                        onChange={e => setTipoValor(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value={"Peso"}>Peso</MenuItem>
                        <MenuItem value={"Dolar"}>Dolar</MenuItem>
                    </Select>

                    {tipoValor === 'Dolar' ?
                        <div>
                            <TextField sx={{ pt: 2, mt: 2 }} label="US$ Precio Dolar" variant="standard" value={precioDolar} onChange={e => setPrecioDolar(e.target.value)} fullWidth />

                            <TextField sx={{ pt: 2, mt: 2 }} label="Valor US$ Actual en Pesos" variant="standard" value={valorDolar} onChange={e => setValorDolar(e.target.value)} fullWidth />
                        </div>

                        :
                        <TextField sx={{ pt: 2, mt: 2 }} label="$ Precio Peso" variant="standard" value={precioPeso} onChange={e => setPrecioPeso(e.target.value)} fullWidth />}
                    <Stack sx={{ p: 2, mt: 3, boxShadow: 3 }} direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="upload-image">
                            <Button sx={{ m: 2 }} variant="outlined" color="secondary" component="span">
                            <PhotoCamera />
                            </Button>
      
                            <input
                                id="upload-image"
                                hidden
                                accept="image/*"
                                type="file"
                                name="Image"
                                onChange={(event) => handleFileUpload (event)}
                            />
                        </label>
                        {imageUrl && <img sx={{ m: 2 }} src={imageUrl} alt="Uploaded Image" height="75" />}
                    </Stack>
                </Grid>
                <Button  sx={{ p: 1, m: 5 }} variant="contained" color="success" fullWidth onClick={() => GuardarVehiculo()}> Guardar</Button>
            </Grid>
        </>
    )
}