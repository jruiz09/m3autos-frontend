
import Box from '@mui/material/Box';
import { Typography, Tooltip, IconButton, Grid, Button, Select, MenuItem } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect, useMemo } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import api from '../components/utils/api';
import { MaterialReactTable } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';
import { InputLabel } from '@mui/material';


export default function Gastos() {

    const userToken = localStorage.getItem('user-token');
    const UrlGastos = api.urlAPI + "gastos"

    const [descripcion, setDescripcion] = useState("")
    const [tipo, setTipo] = useState("")
    const [idGasto, setIdGasto] = useState("")

    const [modalEliminar, setModalElimiar] = useState(false);


    const abrirCerrarModalEliminar = () => {
        setModalElimiar(!modalEliminar);
        console.log("modalestado: ", modalEliminar)
    }
    // PostGastos
    const PostGastos = {
        Descripcion: descripcion,
        Tipo: tipo
    }

    //Función para guardar


    const GuardarGastos = async () => {

        const headers = { 'm3-token': userToken }
        if ([PostGastos.Descripcion, PostGastos.Tipo].includes('')) {
            swal({
                title: "Los campos descripcion y tipo son obligatorios!",
                icon: "error",
                showConfirmButton: true,
            })
        }
        else {
            await axios.post(UrlGastos, PostGastos, { headers })
                .then(response => {
                    const result = response.data;
                    swal({
                        title: result.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 4000
                    });
                    setDescripcion("")
                    setTipo("")
                    console.log("RESPUESTA API", result)

                    ListarGastos()
                    setMargen(!margen)
                }
                )
                .catch(err => {
                    console.log("Error", err)
                    console.log("URL", UrlGastos)
                    console.log("Post", PostGastos)
                    swal({
                        title: err,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 4000
                    });

                })
        }
    }


    //listar productos
    const [gastos, setGastos] = useState([])
    const ListarGastos = async () => {
        const headers = { 'm3-token': userToken };
        console.log(headers)
        let res = await fetch(UrlGastos, { headers })
        let data = await res.json()
        setGastos(data)
        console.log(data)
    }



    const columns = useMemo(
        () =>
            [
                {
                    accessorKey: 'id', //access nested data with dot notation
                    header: 'Id Gasto',
                    size: 150,
                },
                {
                    accessorKey: 'Descripcion', //access nested data with dot notation
                    header: 'Descripcion',
                    size: 150,
                    enableClickToCopy: true
                },
                {
                    accessorKey: 'Tipo',
                    header: 'Tipo',
                    size: 150,
                    enableClickToCopy: true

                }
            ],
        [],
    );

    useEffect(() => {
        ListarGastos()

    }, [])




    const EditarGasto = async () => {

        const headers = { 'm3-token': userToken }


        const PostEdit = {
            Descripcion: descripcion,
            Tipo: tipo
        }


        await axios.put(UrlGastos + "/" + idGasto, PostEdit, { headers })
            .then(response => {
                const result = response.data;
                swal({
                    title: "Gasto Actualizado!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 4000
                });
                console.log("RESPUESTA API", result)
                ListarGastos()
                setDescripcion("")
                setTipo("")
                setMargen(!margen)


            }
            )
            .catch(err => {
                console.log("Error", err)
                console.log("URL", UrlGastos)
                console.log("Post", PostEdit)
                swal({
                    title: err,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 4000
                });
            })
    };


    const EditarGastoModal = (row) => {
        setDescripcion(row.original.Descripcion),
            setTipo(row.original.Tipo),

            setIdGasto(row.original.id),

            cambioMarger("Editar")
        console.log("Esta es la fila: ", idGasto)

        console.log("Esta es la fila: ", row.original)
    }


    const EliminarProductoModal = (row) => {
        setIdGasto(row.original.id),
            setDescripcion(row.original.Descripcion),

            abrirCerrarModalEliminar()
    }



    const EliminarProducto = async () => {
        const headers = { 'm3-token': userToken };

        await axios.delete(UrlGastos + "/" + idGasto, { headers })
            .then(response => {
                const result = response.data;
                abrirCerrarModalEliminar();
                swal({
                    title: "Gasto Eliminado!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 4000
                })
                ListarGastos();
                console.log(result);
            }).catch(error => {
                swal({
                    title: "Ocurrió un error, contactar con el administrador",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 4000
                });
                console.log(error);
            })
    }

    const [margen, setMargen] = useState(false)
    const [accion, setAccion] = useState("")
    const cambioMarger = (action) => {
        setMargen(!margen)
        setAccion(action)
        console.log("Accion: ", action)

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    return (
        <>

            <Typography
                variant="h4"
                color="black"
                align="center"
                pb={1}
                m={2}
            >
                ABM Gastos
            </Typography>

            <Button variant='contained' color='secondary' sx={{ ml: 2 }} onClick={() => cambioMarger("Nuevo")}> Nuevo </Button>
            <div>
                {margen ?
                    <Grid container >
                        <Grid item xs={8}>
                            <Box
                                sx={{
                                    boxShadow: 2,
                                    p: 2,
                                    m: 2
                                }}
                            >
                                <MaterialReactTable

                                    columns={columns}
                                    data={gastos}

                                    enableEditing
                                    renderRowActions={({ row, table }) => (
                                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                                            <Tooltip arrow placement="left" title="Edit">
                                                <IconButton onClick={() => EditarGastoModal(row)}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip arrow placement="right" title="Delete">
                                                <IconButton color="error" onClick={() => EliminarProductoModal(row)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    )}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                sx={{
                                    boxShadow: 2,
                                    p: 2,
                                    m: 2
                                }}
                            >
                                <Typography variant="h5"
                                    color="Black"
                                    align="center"
                                    pb={1}
                                    m={2}>
                                    {accion}
                                </Typography>
                                <TextField sx={{ pt: 2 }} label="Descripción" variant="standard" value={descripcion} onChange={e => setDescripcion(e.target.value)} fullWidth />
                                <InputLabel sx={{ pt: 2 }} id="demo-simple-select-label">Tipo Gasto</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tipo}
                                    onChange={e => setTipo(e.target.value)}
                                    fullWidth

                                >
                                    <MenuItem value={"Fijo"}>Fijo</MenuItem>
                                    <MenuItem value={"Variable"}>Variable</MenuItem>
                                </Select>

                                <Box>

                                    <Button onClick={() => cambioMarger()} sx={{ pt: 4 }}>Cancelar</Button>
                                    {accion === 'Nuevo' ?
                                        <Button onClick={GuardarGastos} sx={{ pt: 4 }}>Guardar</Button>
                                        :
                                        <Button onClick={EditarGasto} sx={{ pt: 4 }}>Editar</Button>}

                                </Box>



                            </Box>
                        </Grid>
                    </Grid>
                    :
                    <Grid container >
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    boxShadow: 2,
                                    p: 2,
                                    m: 2
                                }}
                            >
                                <MaterialReactTable

                                    columns={columns}
                                    data={gastos}

                                    enableEditing
                                    renderRowActions={({ row, table }) => (
                                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                                            <Tooltip arrow placement="left" title="Edit">
                                                <IconButton onClick={() => EditarGastoModal(row)}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip arrow placement="right" title="Delete">
                                                <IconButton color="error" onClick={() => EliminarProductoModal(row)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    )}
                                />
                                <Modal
                                    open=
                                    {modalEliminar}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" component="h2" sx={{ pb: 2 }}>
                                            Estas seguro de eliminar el producto {descripcion} con el código {idGasto}
                                        </Typography>
                                        <Button onClick={() => abrirCerrarModalEliminar()} sx={{ pt: 4 }}>No, Cancelar</Button>
                                        <Button color='error' onClick={() => EliminarProducto()} sx={{ pt: 4 }}>Sí, Eliminar</Button>
                                    </Box>
                                </Modal>
                            </Box>
                        </Grid>
                    </Grid>
                }
            </div>

        </>
    )
}