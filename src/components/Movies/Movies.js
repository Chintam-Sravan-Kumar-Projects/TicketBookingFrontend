import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api_helpers";
import MovieItem from "./MovieItem";

const Movies=()=>{
    const [movies,setMovies]=useState();
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch(err=>console.log(err))
        
    },[]);
    
    return <Box margin={"auto"} marginTop={4}> 
    
    <Typography margin={"auto"} marginTop={5} variant="h4" padding={2} width="40%" textAlign={"center"} bgcolor={"#EC7209"} color="white"> All Movies</Typography>
    <Box display="flex" width="100%" margin="auto" marginTop={5} justifyContent={"center"} flexWrap="wrap">
        
        {movies && movies.map((movie,index) => <MovieItem key={index} id={movie._id} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl}></MovieItem>)}
    </Box>
    </Box>
    
};

export default Movies;