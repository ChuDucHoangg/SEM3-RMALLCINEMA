import React, { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { Link } from "react-router-dom";

function Movies() {
    const [comingSoon, setComingSoon] = useState([]);
    const [lastShowing, setLastShowing] = useState([]);
    const [bestShowing, setBestShowing] = useState([]);

    const loadMovie = useCallback(async () => {
        try {
            const comingSoonResponse = await api.get(url.MOVIE.COMING_SOON);
            const lastShowingResponse = await api.get(url.MOVIE.LATEST_SHOWING);
            const bestShowingResponse = await api.get(url.MOVIE.BEST_SHOWING);

            setComingSoon(comingSoonResponse.data);
            setLastShowing(lastShowingResponse.data);
            setBestShowing(bestShowingResponse.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        loadMovie();
    }, [loadMovie]);

    return (
        <>
            <section className="movie-section padding-top bg-two">
                <div className="container">
                    <div className="row flex-wrap-reverse justify-content-center">
                        <div className="col-lg-12">
                            <div className="article-section padding-bottom">
                                <div className="section-header-1">
                                    <h2 className="title">Coming Soon</h2>

                                    <Link to="/movies" className="view-more">
                                        View More <i className="fal fa-long-arrow-alt-right"></i>
                                    </Link>
                                </div>
                                <div className="row mb-30-none justify-content-center">
                                    {comingSoon.map((item, index) => {
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

            <section className="movie-section padding-top bg-two">
                <div className="container">
                    <div className="row flex-wrap-reverse justify-content-center">
                        <div className="col-lg-12">
                            <div className="article-section padding-bottom">
                                <div className="section-header-1">
                                    <h2 className="title">Last Showing</h2>

                                    <Link to="/movies" className="view-more">
                                        View More <i className="fal fa-long-arrow-alt-right"></i>
                                    </Link>
                                </div>
                                <div className="row mb-30-none justify-content-center">
                                    {lastShowing.map((item, index) => {
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

            <section className="movie-section padding-top bg-two">
                <div className="container">
                    <div className="row flex-wrap-reverse justify-content-center">
                        <div className="col-lg-12">
                            <div className="article-section padding-bottom">
                                <div className="section-header-1">
                                    <h2 className="title">Best Showing</h2>

                                    <Link to="/movies" className="view-more">
                                        View More <i className="fal fa-long-arrow-alt-right"></i>
                                    </Link>
                                </div>
                                <div className="row mb-30-none justify-content-center">
                                    {bestShowing.map((item, index) => {
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
