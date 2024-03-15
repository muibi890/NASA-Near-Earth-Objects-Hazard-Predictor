import * as React from 'react';
import useStyles from './styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import axios from 'axios';


//
const HomePage = () => {
 const [prediction,setPrediction]=useState()
 const [relativeVelocity,setRelativeVelocity]=useState()
 const [missDistance,setMissDistance]=useState()
 const [estdDiameter,setEstdDiameter]=useState()
 const [absoluteMagnitude,setAbsoluteMagnitude]=useState()
 const classes=useStyles();
 const handlePostRequest = async () => {
  const data={
    relative_velocity:parseFloat(relativeVelocity),
    miss_distance:parseFloat(missDistance),
    absolute_magnitude:parseFloat(absoluteMagnitude),
    est_diameter_max:parseFloat(estdDiameter)
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/', data,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response:', response.data);
    setPrediction(response.data.Prediction);
  } catch (error) {
    console.error('Error:', error);
    setPrediction("invalid input")
  }
};
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{textAlign:"center"}}>
            <Grid item xs={12}>
               <img src="nasa.png" alt="logo" style={{marginTop:"5px"}}/>
            </Grid>
            <Grid item xs={12} sx={{textAlign:"center"}} >
                <Box sx={{ 
                  maxWidth: 700,
                  maxHeight: 700,
                  marginLeft:"auto",
                  marginRight:"auto",
                  }}>
                  <Paper elevation={12} sx={{padding:"30px"}}>
                    <Typography variant="h5" component="h2" sx={{padding:"10px"}}>
                      Find Out Whether An Aestroid is Hazardous or Not
                    </Typography>
                    <TextField sx={{margin:"10px"}}id="outlined-basic" label="Relative Velocity (km/s)" variant="outlined"  value={relativeVelocity} onChange={(event)=>setRelativeVelocity(event.target.value)}/>
                    <TextField sx={{margin:"10px", }}id="outlined-basic" label="Absolute Magnitude" variant="outlined" value={absoluteMagnitude} onChange={(event)=>setAbsoluteMagnitude(event.target.value)}/>
                    <TextField sx={{margin:"10px", }}id="outlined-basic" label="Estimated Diameter (km)" variant="outlined" value={estdDiameter} onChange={(event)=>setEstdDiameter(event.target.value)} />
                    <TextField sx={{margin:"10px", }}id="outlined-basic" label="Missed Distance (km)" variant="outlined" value={missDistance} onChange={(event)=>setMissDistance(event.target.value)}/><br/>
                    <Button sx={{marginTop:"10px"}} variant="contained" onClick={handlePostRequest}>Find Out</Button>
                    <Typography variant="h5" sx={{marginTop:"20px"}}>{prediction}</Typography>
                  </Paper>

                </Box>
            </Grid>
        </Grid>
        </Box>
    </div>


  )
}

export default HomePage
