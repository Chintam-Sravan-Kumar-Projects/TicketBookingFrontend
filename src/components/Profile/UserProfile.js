import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getMovieById, getUser, getUserBooking } from "../../api-helpers/api_helpers";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();
  const [movieTitles, setMovieTitles] = useState([]);

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUser()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const titles = await Promise.all(bookings.map((booking) => getMovieTitle(booking.movie)));
        setMovieTitles(titles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [bookings]);

  const getMovieTitle = async (movieId) => {
    try {
      const movieDetails = await getMovieById(movieId);
      return movieDetails.movie.title;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return "N/A";
    }
  };

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        console.log(res);
        // Update bookings after successful deletion
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box width={"100%"} display="flex">
      {user && (
        <Fragment>
          <Box flexDirection={"column"} justifyContent="center" alignItems={"center"} width={"30%"} padding={3}>
            <AccountCircleIcon sx={{ fontSize: "15rem", textAligin: 'center', ml: 5 }} />
            <Typography padding={1} width={"75%"} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>
              Name: {user.name}
            </Typography>
            <Typography mt={1} padding={1} width={"75%"} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>
              Email: {user.email}
            </Typography>
          </Box>
        </Fragment>
      )}
      <Box width={"70%"} display="flex" flexDirection={"column"}>
        <Typography variant="h3" fontFamily={"verdana"} textAlign="center" padding={2}>
          Bookings
        </Typography>
        {bookings && bookings.length > 0 && (
          <Fragment>
            <Box margin={'auto'} display="flex" flexDirection={"column"} width="80%">
              <List>
                {bookings.map((booking, index) => (
                  <ListItem sx={{ bgcolor: "orange", color: "white", textAlign: "center", margin: 1, }} key={booking._id}>
                    <ListItemText sx={{ margin: 1, width: 'auto', textAlign: "left" }}>Movie: {movieTitles[index]} </ListItemText>
                    <ListItemText sx={{ margin: 1, width: 'auto', textAlign: "left" }}>Seat Number: {booking.seatNumber} </ListItemText>
                    <ListItemText sx={{ margin: 1, width: 'auto', textAlign: "left" }}>Date: {new Date(booking.date).toDateString()} </ListItemText>
                    <IconButton onClick={() => handleDelete(booking._id)} color="error">
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
