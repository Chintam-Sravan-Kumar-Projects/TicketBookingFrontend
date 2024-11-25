import axios from 'axios';
export const getAllMovies=async()=>{
    const res=await axios
        .get("/movie")
            .catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("No Data");
    }
    const data=await res.data;
    return data;
};

export const sendUserAuthRequest=async(data,signup)=>{
    const res= await axios.post(`/user/${signup ? "signup" : "login" }`,{
        name: signup ? data.name : "",
        email: data.email,
        password: data.password,
    }).catch((err)=>console.log(err));

    

    if(res.status!==200 && res.status!==201){
        console.log("Unexpected error occured")
    }
    

    const resData=await res.data;
    return resData;

};

export const sendAdminAuthRequest=async(data)=>{
    const res=await axios.post("/admin/login",{
        email: data.email,
        password: data.password,
    }).catch((err)=>console.log(err));


    if(res.status!==200){
        console.log("Unexpected error occured")
    }
    const resData=await res.data;
    return resData;
}

export const getMovieDetails=async(id)=>{
    const res=await axios.get(`/movie/${id}`).catch((err)=>console.log(err));

    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resData=await res.data;
    return resData;
}

export const newBooking=async(data)=>{
    console.log(data);

    try {
        const res = await axios.post('/booking', {
            movie: data.movie,
            seatNumber: data.seatNumber,
            date: data.date,
            user: localStorage.getItem("userId"),
        });

        if (res.status === 201) {
            const resData =await res.data;
            console.log("yes")
            return resData;
        } else {
            console.error("Unexpected Response Status:", res.status);
            console.error("Response Data:", res.data);
            throw new Error("Unexpected Error");
        }
    } catch (error) {
        if (error.response) {
            return  error.response.data;
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", error.message);
        }

        throw error; // Rethrow the error to let the caller handle it
    }

};

export const getUserBooking=async()=>{
    const id=localStorage.getItem("userId");
    const res=await axios
    .get( `/user/bookings/${id}`)
    .catch((err)=>console.log(err));

    if (res.status!==200){
        return console.log("Unexpected error");
    }

    const resData=await res.data;
    return resData;
}

export const getUser=async()=>{
    const id=localStorage.getItem("userId");
    const res=await axios
    .get( `/user/${id}`)
    .catch((err)=>console.log(err));

    if (res.status!==200){
        return console.log("Unexpected error");
    }

    const resData=await res.data;
    return resData;
}

export const deleteBooking=async(id)=>{
    const res=await axios
    .delete( `/booking/${id}`)
    .catch((err)=>console.log(err));

    if (res.status!==200){
        return console.log("Unexpected error");
    }

    const resData=await res.data;
    return resData;
}

export const addMovie=async(data)=>{
    const res=await axios
    .post( "/movie",{
        title:data.title,
        description:data.description,
        releaseDate:data.releaseDate,
        posterUrl:data.posterUrl,
        featured:data.featured,
        actors:data.actors,
        admin:localStorage.getItem("adminId"),
        seats:data.seats,
    },{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).catch((err)=>console.log(err));

    if (res.status!==201){
        return console.log("Unexpected error");
    }

    const resData=await res.data;
    return resData;
}

export const getAdminById=async()=>{
    const adminId=localStorage.getItem("adminId");
    const res=await axios
    .get( `/admin/${adminId}`)
    .catch((err)=>console.log(err));

    if (res.status!==200){
        return console.log("Unexpected error");
    }

    const resData=await res.data;
    return resData;
}

export const getMovieById=async(id)=>{
    const res=await axios
    .get( `/movie/${id}`)
    .catch((err)=>console.log(err));

    if (res.status!==200){
        return console.log("Unexpected error");
    }
    
    const resData=await res.data;
    return resData;
}

export const deleteMovie=async(id)=>{
    const res=await axios
    .delete( `/movie/${id}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).catch((err)=>console.log(err));

    if (res.status!==201){
        return console.log("Unexpected error");
    }

    const resData=await res.data;
    return resData;
}

export const getMovieByDate=async(movie,date)=>{
    console.log(date)
    console.log(movie)
    const res=await axios
    .post( `/booking/bookingsByDate`,{
        movie: movie,
        date: date,
    })
    .catch((err)=>console.log(err));
    if(res.status===400){
        return {}
    }
    if (res.status!==200){
        return console.log("Unexpected error");
    }
    
    const resData=await res.data;

    return resData;
}