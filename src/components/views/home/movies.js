import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { Link } from "react-router-dom";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [sortBy, setSortBy] = useState("latest-showing");

    useEffect(() => {
        // Initial load
        loadData(url.MOVIE.LATEST_SHOWING);
    }, []); // Empty dependency array to run once on mount

    const handleSortChange = async (event) => {
        const selectedSortOption = event.target.value;
        setSortBy(selectedSortOption);

        switch (selectedSortOption) {
            case "latest-showing":
                await loadData(url.MOVIE.LATEST_SHOWING);
                break;
            case "best-showing":
                await loadData(url.MOVIE.BEST_SHOWING);
                break;
            case "coming-soon":
                await loadData(url.MOVIE.COMING_SOON);
                break;
            default:
                break;
        }
    };

    const loadData = async (url) => {
        try {
            const response = await api.get(url);
            setMovies(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className="movie-section padding-top bg-two">
                <div className="container">
                    <div className="row flex-wrap-reverse justify-content-center">
                        <div className="col-lg-12">
                            <div className="article-section padding-bottom">
                                <div className="section-header-2">
                                    <h2 className="title">movies</h2>

                                    <ul className="tab-menu">
                                        <li className={sortBy === "latest-showing" ? "active" : ""} onClick={() => handleSortChange({ target: { value: "latest-showing" } })}>
                                            latest showing
                                        </li>

                                        <li className={sortBy === "best-showing" ? "active" : ""} onClick={() => handleSortChange({ target: { value: "best-showing" } })}>
                                            best showing
                                        </li>
                                        <li className={sortBy === "coming-soon" ? "active" : ""} onClick={() => handleSortChange({ target: { value: "coming-soon" } })}>
                                            coming soon
                                        </li>
                                    </ul>
                                </div>
                                <div className="row mb-30-none justify-content-center">
                                    {movies.map((item, index) => {
                                        return (
                                            <div className="col-sm-6 col-lg-4" key={index}>
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb h-200">
                                                        <Link to={`/movie-details/${item.id}`}>
                                                            <img src={item.movie_image} alt="movie" />
                                                        </Link>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <Link to={`/movie-details/${item.id}`} className="line-clamp">
                                                                {item.title}
                                                            </Link>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-clock"></i>
                                                                <span className="content">{item.duration} minutes</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-heart"></i>
                                                                <span className="content">{item.favoriteCount}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Movies;
