import { Link } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPlayer from "react-player";

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [currentTrailerUrl, setCurrentTrailerUrl] = useState("");

    const loadMovie = useCallback(async () => {
        try {
            const movieResponse = await api.get(url.MOVIE.LIST);
            setMovies(movieResponse.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        loadMovie();
    }, [loadMovie]);

    return (
        <>
            <section className="movie-section padding-top padding-bottom">
                <div className="container">
                    <div className="row flex-wrap-reverse justify-content-center">
                        <div className="col-sm-10 col-md-8 col-lg-3">
                            <div className="widget-1 widget-check">
                                <div className="widget-1-body">
                                    <h6 className="subtitle">Country</h6>
                                    <div className="check-area">
                                        <div className="form-group">
                                            <input type="checkbox" name="lang" id="lang1" />
                                            <label htmlFor="lang1">Australia</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="lang" id="lang2" />
                                            <label htmlFor="lang2">France</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="lang" id="lang3" />
                                            <label htmlFor="lang3">Russia</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="lang" id="lang4" />
                                            <label htmlFor="lang4">Thailand</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="lang" id="lang5" />
                                            <label htmlFor="lang5">Germany</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="lang" id="lang6" />
                                            <label htmlFor="lang6">Italy</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="lang" id="lang7" />
                                            <label htmlFor="lang7">USA</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="lang" id="lang8" />
                                            <label htmlFor="lang8">UK</label>
                                        </div>
                                    </div>
                                    <div className="add-check-area">
                                        <a href="#!">view more</a> <i className="fal fa-chevron-circle-down"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-1 widget-check">
                                <div className="widget-1-body">
                                    <h6 className="subtitle">experience</h6>
                                    <div className="check-area">
                                        <div className="form-group">
                                            <input type="checkbox" name="mode" id="mode1" />
                                            <label htmlFor="mode1">2d</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="mode" id="mode2" />
                                            <label htmlFor="mode2">3d</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-1 widget-check">
                                <div className="widget-1-body">
                                    <h6 className="subtitle">genre</h6>
                                    <div className="check-area">
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre1" />
                                            <label htmlFor="genre1">action</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre2" />
                                            <label htmlFor="genre2">horror</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre3" />
                                            <label htmlFor="genre3">animation</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre4" />
                                            <label htmlFor="genre4">sci-fi</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre5" />
                                            <label htmlFor="genre5">thriller</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre6" />
                                            <label htmlFor="genre6">comedy</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre7" />
                                            <label htmlFor="genre7">romantic</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre8" />
                                            <label htmlFor="genre8">drama</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre9" />
                                            <label htmlFor="genre9">romance</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="genre" id="genre10" />
                                            <label htmlFor="genre10">adventure</label>
                                        </div>
                                    </div>
                                    <div className="add-check-area">
                                        <a href="#!">view more</a> <i className="fal fa-chevron-circle-down"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-1 widget-banner">
                                <div className="widget-1-body">
                                    <a href="#!">
                                        <img src="assets/img/sidebar/banner/banner-2.jpg" alt="banner" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 mb-50 mb-lg-0">
                            <div className="filter-tab tab">
                                <div className="filter-area">
                                    <div className="filter-main">
                                        <div className="left">
                                            <div className="item">
                                                <span className="show">Show :</span>
                                                <select className="select-bar">
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                    <option value="40">40</option>
                                                    <option value="50">50</option>
                                                    <option value="60">60</option>
                                                    <option value="100">100</option>
                                                </select>
                                            </div>
                                            <div className="item">
                                                <span className="show">Sort By :</span>
                                                <select className="select-bar">
                                                    <option value="latest">latest showing</option>
                                                    <option value="exclusive">exclusive</option>
                                                    <option value="upcoming">upcoming</option>
                                                    <option value="trending">trending</option>
                                                    <option value="popular">popular</option>
                                                </select>
                                            </div>
                                        </div>
                                        <ul className="grid-button tab-menu">
                                            <li className="active">
                                                <i className="fal fa-th-list"></i>
                                            </li>
                                            <li>
                                                <i className="fal fa-th-large"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-area">
                                    <div className="tab-item active">
                                        <div className="movie-area mb-10">
                                            {movies.map((item, index) => (
                                                <div className="movie-list" key={index}>
                                                    <div className="movie-thumb c-thumb">
                                                        <Link to={`/movie-details/${item.id}`} className="w-100 h-100">
                                                            <img src={item.movie_image} alt="movie" className="movie-thumb__custom" />
                                                        </Link>
                                                    </div>
                                                    <div className="movie-content bg-one">
                                                        <h5 className="title">
                                                            <Link to={`/movie-details/${item.id}`} className="line-clamp">
                                                                {item.title}
                                                            </Link>
                                                        </h5>
                                                        <p className="duration">
                                                            {item.duration}h {item.duration > 1 ? "hours" : "hour"}
                                                        </p>
                                                        <div className="movie-tags">
                                                            {item.genres.map((genre, genreIndex) => (
                                                                <p key={genreIndex}>{genre.name}</p>
                                                            ))}
                                                        </div>
                                                        <div className="release">
                                                            <span>Release Date : </span> <a href="#!">{format(new Date(item.release_date), "dd/MM/yyyy")}</a>
                                                        </div>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">{item.ratings}</span>
                                                            </li>
                                                        </ul>
                                                        <div className="book-area">
                                                            <div className="book-ticket">
                                                                <div className="react-item">
                                                                    <a href="#!">
                                                                        <div className="thumb">
                                                                            <i className="fal fa-heart"></i>
                                                                        </div>
                                                                        <span>10k</span>
                                                                    </a>
                                                                </div>
                                                                <div className="react-item mr-auto">
                                                                    <Link to={`/movie-details/${item.id}`}>
                                                                        <div className="thumb">
                                                                            <i className="fal fa-ticket"></i>
                                                                        </div>
                                                                        <span>Book Ticket</span>
                                                                    </Link>
                                                                </div>

                                                                <div className="react-item">
                                                                    <button
                                                                        className="popup-video video-popup"
                                                                        data-toggle="modal"
                                                                        data-target="#trailerModal"
                                                                        onClick={() => setCurrentTrailerUrl(item.trailer)}
                                                                    >
                                                                        <div className="thumb">
                                                                            <i className="fal fa-play-circle"></i>
                                                                        </div>
                                                                        <span>Watch Trailer</span>
                                                                    </button>
                                                                </div>

                                                                <div className="modal fade" id="trailerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                                                        <div className="modal-content modal-content__custom-movie">
                                                                            <div className="modal-body d-flex justify-content-center align-items-center">
                                                                                <ReactPlayer url={currentTrailerUrl} controls />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="tab-item">
                                        <div className="row mb-10 justify-content-center custom-gy">
                                            {movies.map((item, index) => {
                                                return (
                                                    <div className="col-sm-6 col-lg-6" key={index}>
                                                        <div className="movie-grid">
                                                            <div className="movie-thumb c-thumb">
                                                                <Link to={`/movie-details/${item.id}`}>
                                                                    <img src={item.movie_image} alt="movie" className="c-thumb__custom" />
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
                                                                        <i className="fal fa-shopping-cart"></i>
                                                                        <span className="content">88.8k</span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="fal fa-star"></i>
                                                                        <span className="content">{item.ratings}</span>
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
                                <div className="pagination-area text-center">
                                    <a href="#!">
                                        <i className="fal fa-long-arrow-alt-left"></i>
                                        <span>Prev</span>
                                    </a>
                                    <a href="#!">1</a>
                                    <a href="#!" className="active">
                                        2
                                    </a>
                                    <a href="#!">3</a>
                                    <a href="#!">
                                        <span>Next</span>
                                        <i className="fal fa-long-arrow-alt-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default MoviesList;
