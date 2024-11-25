import React, { Fragment, useEffect, useState } from "react";
import { deleteMovie, getAdminById, getMovieById } from "../../api-helpers/api_helpers";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

const AdminProfile = () => {
    const [admin, setAdmin] = useState();
    const [movieTitles, setMovieTitles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminData = await getAdminById();
                setAdmin(adminData.admin);

                const titles = await Promise.all(adminData.admin.addedMovies.map(movieId => getMovieTitle(movieId)));

                setMovieTitles(titles);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

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
        deleteMovie(id)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 1);
            });
    };    

    return (
        <Box width={"100%"} display="flex">
            {admin && (
                <Fragment>
                    <Box flexDirection={"column"} justifyContent="center" alignItems={"center"} width={"30%"} padding={3}>
                        <AccountCircleIcon sx={{ fontSize: "15rem", textAlign: 'center', ml: 5 }} />
                        <Typography mt={1} padding={1} width={"75%"} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>
                            Email: {admin.email}
                        </Typography>
                    </Box>
                </Fragment>
            )}
            <Box width={"70%"} display="flex" flexDirection={"column"}>
                <Typography variant="h3" fontFamily={"verdana"} textAlign="center" padding={2}>Added Movies</Typography>
                {admin && admin.addedMovies.length > 0 && movieTitles.length === admin.addedMovies.length && (
                    <Fragment>
                        <Box margin={'auto'} display="flex" flexDirection={"column"} width="80%">
                            <List>
                                {admin.addedMovies.map((movieId, index) => (
                                    <ListItem sx={{ bgcolor: "orange", color: "white", textAlign: "center", margin: 1 }} key={index}>
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: "left" }}>
                                            Movie Title: {movieTitles[index]}
                                        </ListItemText>
                                                <IconButton onClick={() => handleDelete(movieId)} color="error">
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

export default AdminProfile;
