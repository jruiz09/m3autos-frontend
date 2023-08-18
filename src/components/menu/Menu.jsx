import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Menu = () => {
  return (<>
    <br></br>
    <br></br>
    <Container fixed maxWidth="sx" alignItems="center"  sx={{ boxShadow: 3, pb: 2, pt: 2 }}>
 
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width='100%'
        paddingBottom={3}>
        <Typography variant='h4' align="center" sx={{ color: "red", fontWeight: 'bold' }}>IDS - Warehouse</Typography>
      </Box>

      <Stack spacing={2} direction="row" 
      alignContent={"center"}>

        <Button variant='outlined' color='error'
          sx={{
            borderRadius: 3, height: 150,
            width: 150, boxShadow: 3 
          }}
        ><DifferenceOutlinedIcon sx={{
          height: 100,
          width: 100

        }} /></Button>
        <Button variant='outlined' color='error'
          sx={{
            borderRadius: 3, height: 150,
            width: 150,
            boxShadow: 3
          }}
        ><SettingsOutlinedIcon sx={{
          height: 100,
          width: 100
        }} /></Button>
        <Button variant='outlined' color='error'
          sx={{
            borderRadius: 3, height: 150,
            width: 150, boxShadow: 3
          }}
        ><Inventory2OutlinedIcon sx={{
          height: 100,
          width: 100

        }} /></Button>
      </Stack>
    </Container>
  </>
  )
}

export default Menu