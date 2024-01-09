import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPlayer from "react-player";
import Pagination from "../../layouts/pagination";
import { getAccessToken } from "../../../utils/auth";
import Loading from "../../layouts/loading";
import Swal from "sweetalert2";

function MoviesList() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [genres, setGenres] = useState([]);
    const [currentTrailerUrl, setCurrentTrailerUrl] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState("all-movies");
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const shouldShowFilteredResults = searchKeyword !== "";

    // Call api movies
    const loadMovie = useCallback(async () => {
        try {
            const moviesResponse = await api.get(url.MOVIE.LIST);
            const languagesResponse = await api.get(url.LANGUAGE.LIST);
            const genresResponse = await api.get(url.GENRE.LIST);

            setMovies(moviesResponse.data);
            setLanguages(languagesResponse.data);
            setGenres(genresResponse.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Pagination
    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentItemPage = shouldShowFilteredResults ? searchResults.slice(indexOfFirstCourse, indexOfLastCourse) : movies.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/movies?page=${pageNumber}`);
    };

    useEffect(() => {
        loadMovie();
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get("page")) || 1;
        setCurrentPage(page);

        window.scrollTo({ top: 800, left: 0, behavior: "smooth" });
    }, [loadMovie, currentPage, navigate]);

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

    const handleLanguageChange = async (languageName) => {
        setLoading(true);
        try {
            const updatedLanguages = selectedLanguages.includes(languageName) ? selectedLanguages.filter((lang) => lang !== languageName) : [...selectedLanguages, languageName];

            setSelectedLanguages(updatedLanguages);

            // Simulate a delay (loading) for 2 seconds before fetching updated data
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenreChange = async (genreName) => {
        setLoading(true);
        try {
            const updatedGenres = selectedGenres.includes(genreName) ? selectedGenres.filter((genre) => genre !== genreName) : [...selectedGenres, genreName];

            setSelectedGenres(updatedGenres);

            // Simulate a delay (loading) for 2 seconds before fetching updated data
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMovies = movies.filter((movie) => {
        const languageFilter = selectedLanguages.length === 0 || (movie.languages && movie.languages.some((lang) => selectedLanguages.includes(lang.name)));
        const genreFilter = selectedGenres.length === 0 || (movie.genres && movie.genres.some((genre) => selectedGenres.includes(genre.name)));
        return languageFilter && genreFilter;
    });

    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);

        const filteredCourses = movies.filter((movie) => {
            return movie && movie.title && movie.title.toLowerCase().includes(keyword.toLowerCase());
        });

        setSearchResults(filteredCourses);
    };

    return (
        <>
            {loading ? <Loading /> : ""}

            <section className="search-ticket-section padding-top pt-lg-0">
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
                                <ul className="tab-menu ticket-tab-menu">
                                    <li className="active">
                                        <div className="tab-thumb">
                                            <img src="assets/img/ticket/movie.png" alt="ticket" />
                                        </div>
                                        <span>movie</span>
                                    </li>
                                    <li>
                                        <div className="tab-thumb">
                                            <img src="assets/img/ticket/event.png" alt="ticket" />
                                        </div>
                                        <span>events</span>
                                    </li>
                                    <li>
                                        <div className="tab-thumb">
                                            <img src="assets/img/ticket/sport.png" alt="ticket" />
                                        </div>
                                        <span>sports</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-area">
                            <div className="tab-item active">
                                <form className="ticket-search-form">
                                    <div className="form-group large">
                                        <input type="text" placeholder="Search for Movies" value={searchKeyword} onChange={handleSearch} required />
                                        <button type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/city.png" alt="ticket" />
                                        </div>
                                        <span className="type">city</span>
                                        <select className="select-bar">
                                            <option value="london">New York</option>
                                            <option value="dhaka">California</option>
                                            <option value="rosario">Texas</option>
                                            <option value="madrid">Florida</option>
                                            <option value="koltaka">Nevada</option>
                                            <option value="rome">Oregon</option>
                                            <option value="khoksa">Ohio</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/date.png" alt="ticket" />
                                        </div>
                                        <span className="type">date</span>
                                        <select className="select-bar">
                                            <option value="11/04/2023">11/04/2023</option>
                                            <option value="10/04/2023">10/04/2023</option>
                                            <option value="09/04/2023">09/04/2023</option>
                                            <option value="08/04/2023">08/04/2023</option>
                                            <option value="07/04/2023">07/04/2023</option>
                                            <option value="06/04/2023">06/04/2023</option>
                                            <option value="05/04/2023">05/04/2023</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/cinema.png" alt="ticket" />
                                        </div>
                                        <span className="type">movie</span>
                                        <select className="select-bar">
                                            <option value="Avatar">Avatar</option>
                                            <option value="Inception">Inception</option>
                                            <option value="Parasite">Parasite</option>
                                            <option value="Joker">Joker</option>
                                            <option value="Searching">Searching</option>
                                            <option value="Coco">Coco</option>
                                            <option value="Lion">Lion</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <button type="submit" className="filter-btn">
                                                <i className="far fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="tab-item">
                                <form className="ticket-search-form">
                                    <div className="form-group large">
                                        <input type="text" placeholder="Search for Events" />
                                        <button type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/city.png" alt="ticket" />
                                        </div>
                                        <span className="type">city</span>
                                        <select className="select-bar">
                                            <option value="london">New York</option>
                                            <option value="dhaka">California</option>
                                            <option value="rosario">Texas</option>
                                            <option value="madrid">Florida</option>
                                            <option value="koltaka">Nevada</option>
                                            <option value="rome">Oregon</option>
                                            <option value="khoksa">Ohio</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/date.png" alt="ticket" />
                                        </div>
                                        <span className="type">date</span>
                                        <select className="select-bar">
                                            <option value="11/04/2023">11/04/2023</option>
                                            <option value="10/04/2023">10/04/2023</option>
                                            <option value="09/04/2023">09/04/2023</option>
                                            <option value="08/04/2023">08/04/2023</option>
                                            <option value="07/04/2023">07/04/2023</option>
                                            <option value="06/04/2023">06/04/2023</option>
                                            <option value="05/04/2023">05/04/2023</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/event-2.png" alt="ticket" />
                                        </div>
                                        <span className="type">event</span>
                                        <select className="select-bar">
                                            <option value="Design">Design</option>
                                            <option value="Development">Development</option>
                                            <option value="Software">Software</option>
                                            <option value="Digital">Digital</option>
                                            <option value="Festival">Festival</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Seo">Seo</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <button type="submit" className="filter-btn">
                                                <i className="far fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="tab-item">
                                <form className="ticket-search-form">
                                    <div className="form-group large">
                                        <input type="text" placeholder="Search fo Sports" />
                                        <button type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/city.png" alt="ticket" />
                                        </div>
                                        <span className="type">city</span>
                                        <select className="select-bar">
                                            <option value="london">New York</option>
                                            <option value="dhaka">California</option>
                                            <option value="rosario">Texas</option>
                                            <option value="madrid">Florida</option>
                                            <option value="koltaka">Nevada</option>
                                            <option value="rome">Oregon</option>
                                            <option value="khoksa">Ohio</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/date.png" alt="ticket" />
                                        </div>
                                        <span className="type">date</span>
                                        <select className="select-bar">
                                            <option value="11/04/2023">11/04/2023</option>
                                            <option value="10/04/2023">10/04/2023</option>
                                            <option value="09/04/2023">09/04/2023</option>
                                            <option value="08/04/2023">08/04/2023</option>
                                            <option value="07/04/2023">07/04/2023</option>
                                            <option value="06/04/2023">06/04/2023</option>
                                            <option value="05/04/2023">05/04/2023</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/sport-2.png" alt="ticket" />
                                        </div>
                                        <span className="type">sport</span>
                                        <select className="select-bar">
                                            <option value="Cricket">Cricket</option>
                                            <option value="Football">Football</option>
                                            <option value="Basketball">Basketball</option>
                                            <option value="Baseball">Baseball</option>
                                            <option value="Golf">Golf</option>
                                            <option value="Running">Running</option>
                                            <option value="Badminton">Badminton</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <button type="submit" className="filter-btn">
                                                <i className="far fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="movie-section padding-top padding-bottom">
                <div className="container">
                    <div className="row flex-wrap-reverse justify-content-center">
                        <div className="col-sm-10 col-md-8 col-lg-3">
                            <div className="widget-1 widget-check">
                                <div className="widget-1-body">
                                    <h6 className="subtitle">Country</h6>
                                    <div className="check-area">
                                        {languages.map((item, index) => {
                                            return (
                                                <div className="form-group" key={index}>
                                                    <input
                                                        type="checkbox"
                                                        name="language"
                                                        id={item.name}
                                                        checked={selectedLanguages.includes(item.name)}
                                                        onChange={() => handleLanguageChange(item.name)}
                                                    />
                                                    <label htmlFor={item.name}>{item.name}</label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="add-check-area">
                                        <Link to="">view more</Link> <i className="fal fa-chevron-circle-down"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="widget-1 widget-check">
                                <div className="widget-1-body">
                                    <h6 className="subtitle">genre</h6>
                                    <div className="check-area">
                                        {genres.map((item, index) => {
                                            return (
                                                <div className="form-group" key={index}>
                                                    <input type="checkbox" name="genre" id={item.name} checked={selectedGenres.includes(item.name)} onChange={() => handleGenreChange(item.name)} />
                                                    <label htmlFor={item.name}>{item.name}</label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="add-check-area">
                                        <Link to="">view more</Link> <i className="fal fa-chevron-circle-down"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 mb-50 mb-lg-0">
                            <div className="filter-tab tab">
                                <div className="filter-area">
                                    <div className="filter-main">
                                        <div className="left left-custom">
                                            <div className="item">
                                                <span className="show">Show: 05</span>
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
                                            {shouldShowFilteredResults ? (
                                                filteredMovies ? (
                                                    filteredMovies.length === 0 ? (
                                                        <div className="col-lg-8 mt-5">
                                                            <p className="text-center">Sorry, there are no movies that match the filter you selected. Please try again with other conditions.</p>
                                                        </div>
                                                    ) : currentItemPage.length > 0 ? (
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
                                                                            <div
                                                                                className="modal fade"
                                                                                id="trailerModal"
                                                                                tabIndex="-1"
                                                                                role="dialog"
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                            >
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
                                                    ) : (
                                                        <div className="col-lg-8 mt-5 mx-auto">
                                                            <p className="text-center">Sorry, there are no movies that match the filter you selected. Please try again with other conditions.</p>
                                                        </div>
                                                    )
                                                ) : null
                                            ) : filteredMovies.length > 0 ? (
                                                filteredMovies.map((item, index) => (
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
                                            ) : (
                                                <div className="col-lg-8 mt-5 mx-auto">
                                                    <p className="text-center">Sorry, there are no movies that match the filter you selected. Please try again with other conditions.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tab-item">
                                        <div className="row mb-10 justify-content-center custom-gy">
                                            <div className="row mb-10 justify-content-center custom-gy">
                                                {shouldShowFilteredResults ? (
                                                    filteredMovies ? (
                                                        filteredMovies.length === 0 ? (
                                                            <div className="col-lg-8 mt-5">
                                                                <p className="text-center">Sorry, there are no movies that match the filter you selected. Please try again with other conditions.</p>
                                                            </div>
                                                        ) : currentItemPage.length > 0 ? (
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
                                                        ) : (
                                                            <div className="col-lg-8 mt-5 mx-auto">
                                                                <p className="text-center">Sorry, there are no movies that match the filter you selected. Please try again with other conditions.</p>
                                                            </div>
                                                        )
                                                    ) : null
                                                ) : filteredMovies.length > 0 ? (
                                                    filteredMovies.map((item, index) => (
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
                                                ) : (
                                                    <div className="col-lg-8 mt-5 mx-auto">
                                                        <p className="text-center">Sorry, there are no movies that match the filter you selected. Please try again with other conditions.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {movies.length > 0 && currentItemPage.length > 0 && filteredMovies.length > 0 ? (
                                    <Pagination perPage={itemsPerPage} totalPage={movies.length} paginate={paginate} currentPage={currentPage} />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default MoviesList;
