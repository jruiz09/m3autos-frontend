import { MaterialReactTable } from 'material-react-table';
import React, { useState, useEffect } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { Typography, Tooltip, IconButton } from '@mui/material';


export default function Table({ datos, columnas, funcionmodaleditar, funcionmodaleliminar }) {


    return (<MaterialReactTable
      
        columns={columnas}
        data={datos}
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => funcionmodaleditar(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => funcionmodaleliminar(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
            )}
      
       />);
};


