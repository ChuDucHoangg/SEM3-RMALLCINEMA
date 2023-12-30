// MovieContext.js
import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movieDetails, setMovieDetailsInternal] = useState(() => {
        // Get information from local storage when the component is created
        const storedMovieDetails = localStorage.getItem("movie_details");
        return storedMovieDetails ? JSON.parse(storedMovieDetails) : null;
    });
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Update local storage when movie information changes
    useEffect(() => {
        localStorage.setItem("movie_details", JSON.stringify(movieDetails));
    }, [movieDetails]);

    const setMovieDetails = (details) => {
        setMovieDetailsInternal(details);
    };

    const updateSelectedSeats = (seats) => {
        setSelectedSeats(seats);
    };

    return <MovieContext.Provider value={{ movieDetails, setMovieDetails, selectedSeats, updateSelectedSeats }}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
    return useContext(MovieContext);
};
