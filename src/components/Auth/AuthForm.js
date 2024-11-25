import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIconRounded from '@mui/icons-material/CloseRounded';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthForm=({onSubmit,isAdmin})=>{
    const [clicked,setClicked]=useState(false);
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
    });
    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    };
    const handleSubmit=(e)=>{
        
        e.preventDefault();
        onSubmit({inputs,signup: isAdmin ? false: isSignup });
        setClicked(true)
    };
    const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
    const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
    const [isSignup,setIsSignup]=useState(false)
    return <Dialog PaperProps={{style:{borderRadius:20}}} open={true} >
        <Box sx={{ml:"auto", padding:1}}>
            <IconButton LinkComponent={Link} to="/" >
                <CloseIconRounded />
            </IconButton>
        </Box>
        <Typography variant="h4" textAlign={"center"}>{!isSignup ? "Login":"SignUp"}</Typography>
        
        <form onSubmit={handleSubmit}>
            <Box display={'flex'} justifyContent={'center'} padding={6} flexDirection="column" width={400} margin="auto" alignContent={"center"}>
                {!isAdmin && isSignup && (
                    <>
                        {" "}
                    <FormLabel margin="normal" sx={{mt:1,mb:1}}>Name</FormLabel>
                    <TextField value={inputs.name} onChange={handleChange} variant="standard" type={"text"} name="name" />
                    </>
                    )}
                <FormLabel margin="normal" sx={{mt:1,mb:1}}>Email</FormLabel>
                <TextField value={inputs.email} onChange={handleChange} variant="standard" type={"email"} name="email" required />
                <FormLabel margin="normal" sx={{mt:1,mb:1}}>Password</FormLabel>
                <TextField value={inputs.password} onChange={handleChange} type={"password"} variant="standard" name="password" required />
                <Button  sx={{mt:2, borderRadius:10, bgcolor:"#129CC9"}} type="submit" fullWidth variant="contained">{!isSignup ? "Login":"Signup"}</Button>
                {!isAdmin && (
                <>
                {" "}
                <Button onClick={()=>setIsSignup(!isSignup)} sx={{mt:2, borderRadius:10}} fullWidth>Switch To {isSignup ? "Login":"Signup"}</Button>
                </>
                )}
                <Typography textAlign={"center"} mt={1} padding={1} sx={{color:"red"}}>{(!isAdminLoggedIn || !isUserLoggedIn)&& clicked?"Email or Password Incorrect":""}</Typography>
            </Box>
            
        </form>
    </Dialog>
};

export default AuthForm;