import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movieData, setMovieDataInternal] = useState(() => {
        const storedData = localStorage.getItem("movie_data");
        return storedData ? JSON.parse(storedData) : { movieDetails: null, selectShow: null, selectedSeats: null, addFoods: null, holdingSeat: null };
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        localStorage.setItem("movie_data", JSON.stringify(movieData));
    }, [movieData]);

    const setMovieDetails = (details) => {
        setMovieDataInternal({ movieDetails: details, selectShow: null, selectedSeats: null, addFoods: null, holdingSeat: null });
    };

    const updateSelectShow = (show) => {
        setMovieDataInternal((prevData) => ({ ...prevData, selectShow: show }));
    };

    const updateSelectedSeats = (seats) => {
        setMovieDataInternal((prevData) => ({ ...prevData, selectedSeats: seats }));
    };

    const setFoods = (foods) => {
        setMovieDataInternal((prevData) => ({ ...prevData, addFoods: foods }));
    };

    const setHoldingSeat = (holdingSeat) => {
        setMovieDataInternal((prevData) => ({ ...prevData, holdingSeat: holdingSeat }));
    };

    const setMessageContext = (newMessage) => {
        setMessage(newMessage);
    };

    return (
        <MovieContext.Provider value={{ movieData, setMovieDetails, updateSelectShow, updateSelectedSeats, setFoods, message, setMessageContext, setHoldingSeat }}>{children}</MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    return useContext(MovieContext);
};
