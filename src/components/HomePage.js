import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api_helpers";


const HomePage=()=>{
    const [movies,setMovies]= useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch(err=>console.log(err));
    },[])
    return <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
        <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
            <img src="https://boldoutline.in/wp-content/uploads/2019/10/Web-Cover-99.jpg" alt="Movie Poster" width={"100%"} height={"100%"}/>
        </Box>

        <Box padding={5} margin="auto">
            <Typography variant="h4" textAlign={"center"}>Latest Movies</Typography>
        </Box>

        <Box display="flex" width="100%" justifyContent={"center"} flexWrap="wrap">
        {movies && movies.slice(0,4).map((movie,index) => <MovieItem id={movie._id} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} key={index}></MovieItem>)}
        </Box>

        <Box display="flex" padding={5} margin="auto">
            <Button LinkComponent={Link} to="/movies" variant="outlined" sx={{margin:"auto",color:"#2b2d42"}}>
                View All Movies
            </Button>
        </Box>
    </Box>;
};

export default HomePage;