import React, { useEffect, useState } from "react";
import {AppBar, IconButton, Tab, Tabs, TextField, Toolbar} from "@mui/material"
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import{ Box } from"@mui/system";
import Autocomplete from '@mui/material/Autocomplete';
import { getAllMovies } from "../api-helpers/api_helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
    const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
    const [value,setValue]=useState();
    const[movies,setMovies]=useState([])
    useEffect(()=>{
        getAllMovies()
            .then((data)=>setMovies(data.movies))
                .catch(err=>console.log(err))
    },[]);
    const logout=(isAdmin)=>{
            dispatch(isAdmin?adminActions.logout():userActions.logout())
    }
    const handleChange = (e, val) => {
        if (val !== undefined) {
            const movie = movies.find((m) => m.title === val);
            if (movie && (isUserLoggedIn || isAdminLoggedIn)) {
                navigate(`/booking/${movie._id}`);
            } else {
                console.error("Movie not found or user not logged in");
            }
        }
    };
    return(
    <AppBar position="sticky" sx={{bgcolor:"#129CC9"}}>
        <Toolbar>
            <Box width={'20%'}>
                <IconButton LinkComponent={Link} to="/" sx={{color:"white"}}>
                <MovieCreationIcon/>
                </IconButton>
            </Box>
            <Box width={'35%'} margin={"auto"}>
                <Autocomplete
                    onChange={handleChange}
                    freeSolo
                    options={movies && movies.map((option) => option.title)}
                    renderInput={(params) => 
                    <TextField 
                    sx={{input:{color:"white"}}} 
                    variant="standard" {...params} 
                    placeholder="Login to Search for Movies" />}
                />
            </Box>
            
            <Box display={'flex'}>
                <Tabs  textColor="inherit"  value={value} onChange={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/movies" label="MOVIES"/>
                    {!isAdminLoggedIn&&!isUserLoggedIn &&(
                       
                        <>
                        <Tab LinkComponent={Link}  to="/admin" label="ADMIN"/>
                        <Tab LinkComponent={Link} to="/auth" label="LOGIN"/>
                        </>
                    )}
                    {isUserLoggedIn &&(
                        <>
                            <Tab LinkComponent={Link} to="/user" label="PROFILE"/>
                            <Tab onClick={()=>logout(false)} LinkComponent={Link} to="/" label="LOGOUT"/>
                        </>
                    )}
                    {isAdminLoggedIn &&(
                        <>
                            <Tab LinkComponent={Link} to="/add" label="ADD MOVIE"/>
                            <Tab LinkComponent={Link} to="/user_admin" label="PROFILE"/>
                            <Tab onClick={()=>logout(true)} LinkComponent={Link} to="/" label="LOGOUT"/>
                        </>
                    )}
                    
                </Tabs>
            </Box>
        </Toolbar>
    </AppBar>
)};

export default Header;