import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movieData, setMovieDataInternal] = useState(() => {
        const storedData = localStorage.getItem("movie_data");
        return storedData ? JSON.parse(storedData) : { movieDetails: null, selectedSeats: [], addFoods: null };
    });

    useEffect(() => {
        localStorage.setItem("movie_data", JSON.stringify(movieData));
    }, [movieData]);

    const setMovieDetails = (details) => {
        setMovieDataInternal((prevData) => ({ ...prevData, movieDetails: details }));
    };

    const updateSelectedSeats = (seats) => {
        setMovieDataInternal((prevData) => ({ ...prevData, selectedSeats: seats }));
    };
    const setFoods = (foods) => {
        setMovieDataInternal((prevData) => ({ ...prevData, addFoods: foods }));
    };

    return <MovieContext.Provider value={{ movieData, setMovieDetails, updateSelectedSeats, setFoods }}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
    return useContext(MovieContext);
};
