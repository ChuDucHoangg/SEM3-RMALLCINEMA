import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movieData, setMovieDataInternal] = useState(() => {
        const storedData = localStorage.getItem("movie_data");
        return storedData ? JSON.parse(storedData) : { movieDetails: null, selectedSeats: [], addFoods: null };
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        localStorage.setItem("movie_data", JSON.stringify(movieData));
    }, [movieData]);

    const setMovieDetails = (details) => {
        setMovieDataInternal({ movieDetails: details, selectedSeats: [], addFoods: null });
    };

    const updateSelectedSeats = (seats) => {
        setMovieDataInternal((prevData) => ({ ...prevData, selectedSeats: seats }));
    };

    const setFoods = (foods) => {
        setMovieDataInternal((prevData) => ({ ...prevData, addFoods: foods }));
    };

    const setMessageContext = (newMessage) => {
        setMessage(newMessage);
    };

    return <MovieContext.Provider value={{ movieData, setMovieDetails, updateSelectedSeats, setFoods, message, setMessageContext }}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
    return useContext(MovieContext);
};
