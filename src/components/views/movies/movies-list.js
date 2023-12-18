import { NavLink } from "react-router-dom";

function MoviesList() {
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
                                                <i className="fal fa-th-large"></i>
                                            </li>
                                            <li>
                                                <i className="fal fa-th-list"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-area">
                                    <div className="tab-item active">
                                        <div className="row mb-10 justify-content-center">
                                            <div className="col-sm-6 col-lg-6">
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/movie/movie-1.jpg" alt="movie" />
                                                        </a>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <NavLink to="/movie-details">The Walking Dead</NavLink>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">5.0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6">
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/movie/movie-2.jpg" alt="movie" />
                                                        </a>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <a href="#!">Godzilla Vs King Kong</a>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">5.0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6">
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/movie/movie-3.jpg" alt="movie" />
                                                        </a>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <a href="#!">Mythic Quest Ravens</a>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">5.0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6">
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/movie/movie-4.jpg" alt="movie" />
                                                        </a>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <a href="#!">Wanda Vision</a>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">5.0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6">
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/movie/movie-5.jpg" alt="movie" />
                                                        </a>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <a href="#!">Irregular</a>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">5.0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6">
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/movie/movie-6.jpg" alt="movie" />
                                                        </a>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <a href="#!">Raya and Last Dragon</a>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">5.0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6">
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/movie/movie-3.jpg" alt="movie" />
                                                        </a>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <a href="#!">Mythic Quest Ravens</a>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">5.0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6">
                                                <div className="movie-grid">
                                                    <div className="movie-thumb c-thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/movie/movie-4.jpg" alt="movie" />
                                                        </a>
                                                    </div>
                                                    <div className="movie-content">
                                                        <h5 className="title m-0">
                                                            <a href="#!">Wanda Vision</a>
                                                        </h5>
                                                        <ul className="movie-rating-percent">
                                                            <li>
                                                                <i className="fal fa-shopping-cart"></i>
                                                                <span className="content">88.8k</span>
                                                            </li>
                                                            <li>
                                                                <i className="fal fa-star"></i>
                                                                <span className="content">5.0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-item">
                                        <div className="movie-area mb-10">
                                            <div className="movie-list">
                                                <div className="movie-thumb c-thumb">
                                                    <a href="movie-details.html" className="w-100 h-100">
                                                        <img src="assets/img/movie/movie-list-1.jpg" alt="movie" />
                                                    </a>
                                                </div>
                                                <div className="movie-content bg-one">
                                                    <h5 className="title">
                                                        <a href="movie-details.html">The Walking Dead</a>
                                                    </h5>
                                                    <p className="duration">2h 20 min</p>
                                                    <div className="movie-tags">
                                                        <a href="#!">action</a>
                                                        <a href="#!">adventure</a>
                                                        <a href="#!">drama</a>
                                                    </div>
                                                    <div className="release">
                                                        <span>Release Date : </span> <a href="#!"> Feb 13, 2023</a>
                                                    </div>
                                                    <ul className="movie-rating-percent">
                                                        <li>
                                                            <i className="fal fa-shopping-cart"></i>
                                                            <span className="content">88.8k</span>
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-star"></i>
                                                            <span className="content">5.0</span>
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
                                                                <a href="#!">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-ticket"></i>
                                                                    </div>
                                                                    <span>Book Ticket</span>
                                                                </a>
                                                            </div>
                                                            <div className="react-item">
                                                                <a href="https://www.youtube.com/watch?v=uyNh0RPiLyI" className="popup-video video-popup">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-play-circle"></i>
                                                                    </div>
                                                                    <span>Watch Trailer</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="movie-list">
                                                <div className="movie-thumb c-thumb">
                                                    <a href="movie-details.html" className="w-100 h-100">
                                                        <img src="assets/img/movie/movie-list-2.jpg" alt="movie" />
                                                    </a>
                                                </div>
                                                <div className="movie-content bg-one">
                                                    <h5 className="title">
                                                        <a href="movie-details.html">The Walking Dead</a>
                                                    </h5>
                                                    <p className="duration">2h 20 min</p>
                                                    <div className="movie-tags">
                                                        <a href="#!">action</a>
                                                        <a href="#!">adventure</a>
                                                        <a href="#!">drama</a>
                                                    </div>
                                                    <div className="release">
                                                        <span>Release Date : </span> <a href="#!"> Feb 13, 2023</a>
                                                    </div>
                                                    <ul className="movie-rating-percent">
                                                        <li>
                                                            <i className="fal fa-shopping-cart"></i>
                                                            <span className="content">88.8k</span>
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-star"></i>
                                                            <span className="content">5.0</span>
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
                                                                <a href="#!">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-ticket"></i>
                                                                    </div>
                                                                    <span>Book Ticket</span>
                                                                </a>
                                                            </div>
                                                            <div className="react-item">
                                                                <a href="https://www.youtube.com/watch?v=uyNh0RPiLyI" className="popup-video video-popup">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-play-circle"></i>
                                                                    </div>
                                                                    <span>Watch Trailer</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="movie-list">
                                                <div className="movie-thumb c-thumb">
                                                    <a href="movie-details.html" className="w-100 h-100">
                                                        <img src="assets/img/movie/movie-list-3.jpg" alt="movie" />
                                                    </a>
                                                </div>
                                                <div className="movie-content bg-one">
                                                    <h5 className="title">
                                                        <a href="movie-details.html">The Walking Dead</a>
                                                    </h5>
                                                    <p className="duration">2h 20 min</p>
                                                    <div className="movie-tags">
                                                        <a href="#!">action</a>
                                                        <a href="#!">adventure</a>
                                                        <a href="#!">drama</a>
                                                    </div>
                                                    <div className="release">
                                                        <span>Release Date : </span> <a href="#!"> Feb 13, 2023</a>
                                                    </div>
                                                    <ul className="movie-rating-percent">
                                                        <li>
                                                            <i className="fal fa-shopping-cart"></i>
                                                            <span className="content">88.8k</span>
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-star"></i>
                                                            <span className="content">5.0</span>
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
                                                                <a href="#!">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-ticket"></i>
                                                                    </div>
                                                                    <span>Book Ticket</span>
                                                                </a>
                                                            </div>
                                                            <div className="react-item">
                                                                <a href="https://www.youtube.com/watch?v=uyNh0RPiLyI" className="popup-video video-popup">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-play-circle"></i>
                                                                    </div>
                                                                    <span>Watch Trailer</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="movie-list">
                                                <div className="movie-thumb c-thumb">
                                                    <a href="movie-details.html" className="w-100 h-100">
                                                        <img src="assets/img/movie/movie-list-4.jpg" alt="movie" />
                                                    </a>
                                                </div>
                                                <div className="movie-content bg-one">
                                                    <h5 className="title">
                                                        <a href="movie-details.html">The Walking Dead</a>
                                                    </h5>
                                                    <p className="duration">2h 20 min</p>
                                                    <div className="movie-tags">
                                                        <a href="#!">action</a>
                                                        <a href="#!">adventure</a>
                                                        <a href="#!">drama</a>
                                                    </div>
                                                    <div className="release">
                                                        <span>Release Date : </span> <a href="#!"> Feb 13, 2023</a>
                                                    </div>
                                                    <ul className="movie-rating-percent">
                                                        <li>
                                                            <i className="fal fa-shopping-cart"></i>
                                                            <span className="content">88.8k</span>
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-star"></i>
                                                            <span className="content">5.0</span>
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
                                                                <a href="#!">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-ticket"></i>
                                                                    </div>
                                                                    <span>Book Ticket</span>
                                                                </a>
                                                            </div>
                                                            <div className="react-item">
                                                                <a href="https://www.youtube.com/watch?v=uyNh0RPiLyI" className="popup-video video-popup">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-play-circle"></i>
                                                                    </div>
                                                                    <span>Watch Trailer</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="movie-list">
                                                <div className="movie-thumb c-thumb">
                                                    <a href="movie-details.html" className="w-100 h-100">
                                                        <img src="assets/img/movie/movie-list-5.jpg" alt="movie" />
                                                    </a>
                                                </div>
                                                <div className="movie-content bg-one">
                                                    <h5 className="title">
                                                        <a href="movie-details.html">The Walking Dead</a>
                                                    </h5>
                                                    <p className="duration">2h 20 min</p>
                                                    <div className="movie-tags">
                                                        <a href="#!">action</a>
                                                        <a href="#!">adventure</a>
                                                        <a href="#!">drama</a>
                                                    </div>
                                                    <div className="release">
                                                        <span>Release Date : </span> <a href="#!"> Feb 13, 2023</a>
                                                    </div>
                                                    <ul className="movie-rating-percent">
                                                        <li>
                                                            <i className="fal fa-shopping-cart"></i>
                                                            <span className="content">88.8k</span>
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-star"></i>
                                                            <span className="content">5.0</span>
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
                                                                <a href="#!">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-ticket"></i>
                                                                    </div>
                                                                    <span>Book Ticket</span>
                                                                </a>
                                                            </div>
                                                            <div className="react-item">
                                                                <a href="https://www.youtube.com/watch?v=uyNh0RPiLyI" className="popup-video video-popup">
                                                                    <div className="thumb">
                                                                        <i className="fal fa-play-circle"></i>
                                                                    </div>
                                                                    <span>Watch Trailer</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
