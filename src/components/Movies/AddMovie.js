import { Box, Button, Checkbox, FormLabel, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { addMovie } from '../../api-helpers/api_helpers';

const labelProps={
    mt:1,
    mb:1
};

const AddMovie=()=>{
    const [inputs,setInputs]=useState({title:"",description:"",posterUrl:"",releaseDate:"",featured:false,seats:1});

    const [actors,setActors]=useState([]);
    const [actor,setActor]=useState("");

    const handleChange=(e)=>{
        setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value,}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs,actors)
        addMovie({...inputs,actors})
        .then((res)=>console.log(res))
        .catch(err=>console.log(err))
        .finally(() => {
            setTimeout(() => {
                window.location.reload();
            }, 1);
        });
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Box width={"50%"} padding={10} margin="auto" display={"flex"} flexDirection="column" boxShadow={"10px 10px 20px #ccc"}>
                    <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
                        Add New Movie
                    </Typography>
                    <FormLabel sx={labelProps}>Title</FormLabel>
                    <TextField value={inputs.title} onChange={handleChange} name="title" variant="standard" margin="normal" required/>
                    <FormLabel sx={labelProps}>Description</FormLabel>
                    <TextField value={inputs.description} onChange={handleChange} name="description" variant="standard" margin="normal" required/>
                    <FormLabel sx={labelProps}>Poster Url</FormLabel>
                    <TextField value={inputs.posterUrl} onChange={handleChange} name="posterUrl" variant="standard" margin="normal" required/>
                    <FormLabel sx={labelProps}>Release Date</FormLabel>
                    <TextField type="date" value={inputs.releaseDate} onChange={handleChange} name="releaseDate" variant="standard" margin="normal" required/>
                    <FormLabel sx={labelProps}>Number of Seats</FormLabel>
                    <TextField type="number" value={inputs.seats} onChange={handleChange} name="seats" variant="standard" margin="normal" inputProps={{min:1}} required />
                    <FormLabel sx={labelProps}>Actor</FormLabel>
                        <Box display={"flex"}>
                            <TextField value={actor} onChange={(e)=>setActor(e.target.value)} name="actor" variant="standard" margin="normal" />
                            <Button onClick={()=>{setActors([...actors,actor]); setActor("");}}>ADD</Button> 
                        </Box>
                        <List>
                            {actors.map((act,index)=>(
                                <ListItem sx={{bgcolor:"skyblue", color:"white", textAlign:"center",margin:1,}}>
                                    <ListItemText sx={{marging:1,width:'auto',textAlign:"left"}}>{act} </ListItemText>
                                </ListItem>
                            ))} 
                        </List>
                    <FormLabel sx={labelProps}>Featured</FormLabel>
                    <Checkbox name="featured" checked={inputs.featured} onClick={(e)=>setInputs((prevState)=>({...prevState,featured:e.target.checked}))} sx={{mr:"auto"}} required/>
                    <Button  type="submit" variant="contained" sx={{width:"30%",margin:"auto", bgcolor:"#2b2d42", ":hover":{bgcolor:"#121217"}}}>Add New Movie</Button>
                </Box>
            </form>
        </div>
    )
};
export default AddMovie;