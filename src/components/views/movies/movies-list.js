import { Link } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPlayer from "react-player";
import { getAccessToken } from "../../../utils/auth";
import Loading from "../../layouts/loading";
import Swal from "sweetalert2";
import Pagination from "../../layouts/pagination";

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [genres, setGenres] = useState([]);
    const [currentTrailerUrl, setCurrentTrailerUrl] = useState("");
    const [visibleLanguages, setVisibleLanguages] = useState(5);
    const [visibleGenres, setVisibleGenres] = useState(5);
    const [expandedLanguage, setExpandedLanguage] = useState(false);
    const [expandedGenre, setExpandedGenre] = useState(false);

    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState("all-movies");

    // Search and Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguageIds, setSelectedLanguageIds] = useState([]);
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleLanguageCheckboxChange = (languageId) => {
        const updatedSelectedLanguages = [...selectedLanguageIds];
        if (updatedSelectedLanguages.includes(languageId)) {
            updatedSelectedLanguages.splice(updatedSelectedLanguages.indexOf(languageId), 1);
        } else {
            updatedSelectedLanguages.push(languageId);
        }
        setSelectedLanguageIds(updatedSelectedLanguages);
    };

    const handleGenreCheckboxChange = (genreId) => {
        const updatedSelectedGenres = [...selectedGenreIds];
        if (updatedSelectedGenres.includes(genreId)) {
            updatedSelectedGenres.splice(updatedSelectedGenres.indexOf(genreId), 1);
        } else {
            updatedSelectedGenres.push(genreId);
        }
        setSelectedGenreIds(updatedSelectedGenres);
    };

    const loadMovie = useCallback(async () => {
        try {
            // Handle single filters
            const singleFilters = [];
            if (searchQuery) singleFilters.push(`searchTerm=${searchQuery}`);
            if (selectedLanguageIds.length === 1) singleFilters.push(`languageIds=${selectedLanguageIds[0]}`);
            if (selectedGenreIds.length === 1) singleFilters.push(`genreIds=${selectedGenreIds[0]}`);

            const singleFiltersParam = singleFilters.length > 0 ? `?${singleFilters.join("&")}` : "";

            // Handle combined filters
            const combinedFilters = [];
            if (searchQuery && (selectedLanguageIds.length > 1 || selectedGenreIds.length > 1)) {
                combinedFilters.push(`searchTerm=${searchQuery}`);
            }
            if (selectedLanguageIds.length > 1) combinedFilters.push(`languageIds=${selectedLanguageIds.join("&languageIds=")}`);
            if (selectedGenreIds.length > 1) combinedFilters.push(`genreIds=${selectedGenreIds.join("&genreIds=")}`);

            const combinedFiltersParam = combinedFilters.length > 0 ? `?${combinedFilters.join("&")}` : "";

            // Construct the final API request URL
            const apiRequestURL = `${url.MOVIE.LIST}${combinedFiltersParam || singleFiltersParam}`;

            // console.log("API Request URL:", apiRequestURL);
            const moviesResponse = await api.get(apiRequestURL);
            const languagesResponse = await api.get(url.LANGUAGE.LIST);
            const genresResponse = await api.get(url.GENRE.LIST);

            setMovies(moviesResponse.data);
            setLanguages(languagesResponse.data);
            setGenres(genresResponse.data);
        } catch (error) {
            console.log(error);
        }
    }, [searchQuery, selectedLanguageIds, selectedGenreIds]);

    // View more
    const handleViewMoreClickLanguage = () => {
        setVisibleLanguages(languages.length);
        setExpandedLanguage(true);
    };

    const handleViewLessClickLanguage = () => {
        setVisibleLanguages(5);
        setExpandedLanguage(false);
    };

    const handleViewMoreClickGenre = () => {
        setVisibleGenres(genres.length);
        setExpandedGenre(true);
    };

    // View less
    const handleViewLessClickGenre = () => {
        setVisibleGenres(5);
        setExpandedGenre(false);
    };

    useEffect(() => {
        loadMovie();

        window.scrollTo({ top: 800, left: 0, behavior: "smooth" });
    }, [loadMovie, selectedLanguageIds, selectedGenreIds, searchQuery]);

    // Config token
    const userToken = getAccessToken();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    };

    // Add to Favorite
    const handleAddFavorite = async (movieId) => {
        try {
            const favoriteRequest = await api.post(url.FAVORITE.ADD, { movieId }, config);
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
            }, 2000);

            if (favoriteRequest.status === 201) {
                setTimeout(() => {
                    Swal.fire({
                        title: "Good job!",
                        text: "Added movie to favorites list successfully.",
                        icon: "success",
                    });
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    title: "Oops...",
                    text: "The movie is already in your favorites list.",
                    icon: "warning",
                });
            } else if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please log in to add movies to your favorites list!",
                    footer: '<a href="/login">Log in now?</a>',
                });
            } else {
                console.error("Error adding to favorites", error);
            }
        }
    };

    const handleSortChange = async (event) => {
        const selectedSortOption = event.target.value;
        setSortBy(selectedSortOption);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);

        switch (selectedSortOption) {
            case "all-movies":
                await loadData(url.MOVIE.LIST);
                break;
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

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentItemPage = movies.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 20, left: 0, behavior: "smooth" });
    };

    return (
        <>
            {loading ? <Loading /> : ""}

            <section className="search-ticket-section search-ticket-section__custom padding-top pt-lg-0">
                <div className="container">
                    <div className="search-tab">
                        <div className="row align-items-center mb--20">
                            <div className="col-lg-6 mb-20">
                                <div className="search-ticket-header">
                                    <h6 className="category">search tickets</h6>
                                    <h3 className="title">find your tickets now</h3>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-20">
                                <div className="tab-area mt-0">
                                    <div className="tab-item active">
                                        <div className="ticket-search-form">
                                            <div className="form-group large__custom">
                                                <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Search for Movies" required />
                                                <button type="button">
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="movie-section pt-5 padding-bottom">
                <div className="container">
                    <div className="row flex-wrap-reverse justify-content-center">
                        <div className="col-sm-10 col-md-8 col-lg-3">
                            <div className="widget-1 widget-check">
                                <div className="widget-1-body widget-animation">
                                    <h6 className="subtitle">Languages</h6>
                                    <div className="check-area">
                                        {languages.slice(0, visibleLanguages).map((item, index) => {
                                            return (
                                                <div className="form-group" key={index}>
                                                    <input
                                                        type="checkbox"
                                                        name="language"
                                                        id={item.name}
                                                        checked={selectedLanguageIds.includes(item.id)}
                                                        onChange={() => {
                                                            handleLanguageCheckboxChange(item.id);
                                                            setLoading(true);

                                                            setTimeout(() => {
                                                                setLoading(false);
                                                            }, 2000);
                                                        }}
                                                    />
                                                    <label htmlFor={item.name}>{item.name}</label>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {languages.length > 5 && (
                                        <div className="add-check-area" onClick={expandedLanguage ? handleViewLessClickLanguage : handleViewMoreClickLanguage}>
                                            <Link to="#">{expandedLanguage ? "view less" : "view more"}</Link> <i className={`fal fa-chevron-circle-${expandedLanguage ? "up" : "down"}`}></i>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="widget-1 widget-check">
                                <div className="widget-1-body">
                                    <h6 className="subtitle">genres</h6>
                                    <div className="check-area">
                                        {genres.slice(0, visibleGenres).map((item, index) => {
                                            return (
                                                <div className="form-group" key={index}>
                                                    <input
                                                        type="checkbox"
                                                        name="genre"
                                                        id={item.name}
                                                        checked={selectedGenreIds.includes(item.id)}
                                                        onChange={() => {
                                                            handleGenreCheckboxChange(item.id);
                                                            setLoading(true);

                                                            setTimeout(() => {
                                                                setLoading(false);
                                                            }, 2000);
                                                        }}
                                                    />
                                                    <label htmlFor={item.name}>{item.name}</label>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {genres.length > 5 && (
                                        <div className="add-check-area" onClick={expandedGenre ? handleViewLessClickGenre : handleViewMoreClickGenre}>
                                            <Link to="#">{expandedGenre ? "view less" : "view more"}</Link> <i className={`fal fa-chevron-circle-${expandedGenre ? "up" : "down"}`}></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 mb-50 mb-lg-0">
                            <div className="filter-tab tab">
                                <div className="filter-area">
                                    <div className="filter-main">
                                        <div className="left left-custom">
                                            <div className="item">
                                                <span className="show">Show: 06</span>
                                            </div>
                                            <div className="item-custom">
                                                <span className="show" style={{ whiteSpace: "nowrap" }}>
                                                    Sort By:
                                                </span>
                                                <select className="filter-select" onChange={handleSortChange} value={sortBy}>
                                                    <option value="all-movies">All Movies</option>
                                                    <option value="latest-showing">Latest Showing</option>
                                                    <option value="best-showing">Best Showing</option>
                                                    <option value="coming-soon">Coming Soon</option>
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
                                            {!movies.length ? (
                                                <div className="col-lg-8 mt-5 mx-auto">
                                                    <p className="text-center">Sorry, there are no movies that match the filter you selected. Please try again with other conditions.</p>
                                                </div>
                                            ) : (
                                                currentItemPage.map((item, index) => (
                                                    <div className="movie-list" key={index}>
                                                        <div className="movie-thumb c-thumb">
                                                            <Link to={`/movie-details/${item.id}`} className="w-100 h-100">
                                                                <img src={item.movie_image} alt="movie" className="movie-thumb__custom" />
                                                            </Link>
                                                        </div>
                                                        <div className="movie-content bg-one">
                                                            <h5 className="title line-clamp">
                                                                <Link to={`/movie-details/${item.id}`} className="line-clamp">
                                                                    {item.title}
                                                                </Link>
                                                            </h5>
                                                            <p className="duration">{item.duration} minutes</p>
                                                            <div className="movie-tags">{item.genres && item.genres.map((genre, genreIndex) => <p key={genreIndex}>{genre.name}</p>)}</div>
                                                            <div className="release">
                                                                <span>Release Date : </span> <a href="#!">{format(new Date(item.release_date), "dd/MM/yyyy")}</a>
                                                            </div>
                                                            <ul className="movie-rating-percent">
                                                                <li>
                                                                    <i className="fal fa-shopping-cart"></i>
                                                                    <span className="content">{item.totalTicket}</span>
                                                                </li>
                                                                <li>
                                                                    <i className="fal fa-heart"></i>
                                                                    <span className="content">{item.favoriteCount}</span>
                                                                </li>
                                                            </ul>
                                                            <div className="book-area">
                                                                <div className="book-ticket">
                                                                    <div className="react-item">
                                                                        <button onClick={() => handleAddFavorite(item.id)}>
                                                                            <div className="thumb">
                                                                                <i className="fal fa-heart"></i>
                                                                            </div>
                                                                            <span>Add to favorite</span>
                                                                        </button>
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
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    <div className="tab-item">
                                        <div className="row mb-10 justify-content-center custom-gy">
                                            <div className="row mb-10 justify-content-center custom-gy">
                                                {!movies.length ? (
                                                    <div className="col-lg-8 mt-5 mx-auto">
                                                        <p className="text-center">Sorry, there are no movies that match the filter you selected. Please try again with other conditions.</p>
                                                    </div>
                                                ) : (
                                                    currentItemPage.map((item, index) => (
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
                                                                            <span className="content">{item.totalTicket}</span>
                                                                        </li>
                                                                        <li>
                                                                            <button onClick={() => handleAddFavorite(item.id)} className="favorite-btn__custom">
                                                                                <div className="thumb">
                                                                                    <i className="fal fa-heart"></i>
                                                                                </div>
                                                                                <span>{item.favoriteCount}</span>
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {movies.length <= 6 ? "" : <Pagination perPage={itemsPerPage} totalPage={movies.length} paginate={paginate} currentPage={currentPage} />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default MoviesList;
