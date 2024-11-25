import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieByDate, getMovieDetails, newBooking } from "../../api-helpers/api_helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";

const Booking = () => {
  const [message, setMessage] = useState("");
  const [movie, setMovie] = useState(null);
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [bookings, setBookings] = useState([]);
  const [dates, setDates] = useState("");
  const [clicked,setClicked]=useState(false);
  const [available,setAvailable]=useState([]);
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => setMessage(res.message))
      .catch((err) => console.log(err));
  };

  const handleSubmits = (e) => {
    setAvailable([])
    setClicked(true)
    setBookings([]);
    e.preventDefault();
    getMovieByDate(movie._id, dates)
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));
  };


  if (bookings.length > 0) {
    // Calculate available seats only if bookings are available
    for (let seatNumber = 1; seatNumber <= movie?.seats; seatNumber++) {
      const isSeatBooked = bookings.some((booking) => booking.seatNumber === seatNumber);
      if (!isSeatBooked) {
        available.push(seatNumber);
      }
    }
  }else if(clicked){
    // If no bookings are available, all seats are available
    for (let seatNumber = 1; seatNumber <= movie?.seats; seatNumber++) {
      available.push(seatNumber);
    }
  }
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign="center">
            Book Tickets for Movie: {movie.title}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Box display="flex" flexDirection="column" paddingTop={3} width="50%" marginRight="auto">
              <img width="80%" height="300px" src={movie.posterUrl} alt={movie.title} />
              <Box width="80%" marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight="bold" marginTop={1}>
                  Actors: {movie.actors.map((actor) => actor + " ")}
                </Typography>
                <Typography fontWeight="bold" marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width="50%" paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box padding={5} margin="auto" display="flex" flexDirection="column">
                  <Typography fontWeight="bold" marginTop={1}>
                    Select Seats between 1 and {movie.seats}
                  </Typography>
                  <FormLabel>Seat Number:</FormLabel>
                  <TextField
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    name="seatNumber"
                    type="number"
                    margin="normal"
                    variant="standard"
                    inputProps={{ min: 1, max: movie.seats }}
                    required
                  />
                  <FormLabel>Booking Date:</FormLabel>
                  <TextField
                    value={inputs.date}
                    inputProps={{
                      min: getCurrentDate(), // Call a function to get the current date
                    }}
                    onChange={handleChange}
                    name="date"
                    type="date"
                    margin="normal"
                    variant="standard"
                    required
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
              <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign="center">
                {message}
              </Typography>
            </Box>
          </Box>
        </Fragment>
      )}
      <Box width="70%" display="flex" flexDirection="column" margin="auto">
        <Typography variant="h3" fontFamily="verdana" textAlign="center" padding={2}>
        Check Availablility
        </Typography>
        <form onSubmit={handleSubmits}>
          <Box padding={5} margin="auto" display="flex" flexDirection="column">
            <FormLabel>Booking Date:</FormLabel>
            <TextField
              value={dates}
              inputProps={{
                min: getCurrentDate(), // Call a function to get the current date
              }}
              onChange={(e) => setDates(e.target.value)}
              name="date"
              type="date"
              margin="normal"
              variant="standard"
              required
            />
            <Button type="submit" sx={{ mt: 3 }}>
              Check Availablility
            </Button>
          </Box>
        </form>
        {available.length> 0&& bookings.length!==movie.seats && (
          <Box margin="auto" display="flex" flexDirection="column" width="80%">
            <Typography variant="h3" fontFamily="verdana" textAlign="center" padding={2}>
                    List of Available Seats
            </Typography>
            <Typography sx={{color:"green"}} variant="h3" fontFamily="verdana" textAlign="center" padding={2}>
                {available.splice(available.length/4).map((avl, index) => (avl + ", "))}
            </Typography>
         
          </Box>
        )}
        {clicked && bookings.length===movie.seats&& (
          <Box margin="auto" display="flex" flexDirection="column" width="80%">
            <Typography sx={{color:"red"}} variant="h3" fontFamily="verdana" textAlign="center" padding={2}>
                    No Seats are Avaialable
            </Typography>         
          </Box>
        )}
        
      </Box>
    </div>
  );
};

export default Booking;
