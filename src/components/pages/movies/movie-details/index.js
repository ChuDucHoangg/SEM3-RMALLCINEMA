import Loading from "../../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { NavLink } from "react-router-dom";
function Movie_Details() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);
    return (
        <>
            <Helmet>
                <title>Movie | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section
                    className="details-banner"
                    style={{
                        backgroundImage: "url('assets/img/banner/banner-movie-details.jpg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="details-banner-wrapper">
                            <div className="details-banner-thumb">
                                <img src="assets/img/movie/movie-list-5.jpg" alt="movie" />
                                <a href="https://www.youtube.com/watch?v=uyNh0RPiLyI" className="video-button video-popup">
                                    <i className="fal fa-play"></i>
                                </a>
                            </div>
                            <div className="details-banner-content offset-lg-4">
                                <h3 className="title">Irregular</h3>
                                <div className="tags">
                                    <a href="#">English</a>
                                    <a href="#">France</a>
                                    <a href="#">Italy</a>
                                    <a href="#">Germany</a>
                                </div>
                                <a href="#" className="button">
                                    horror
                                </a>
                                <div className="social-and-duration">
                                    <div className="duration-area">
                                        <div className="item">
                                            <i className="fal fa-calendar-alt"></i>
                                            <span>12 Feb, 2023</span>
                                        </div>
                                        <div className="item">
                                            <i className="fal fa-clock"></i>
                                            <span>2h 20min</span>
                                        </div>
                                    </div>
                                    <ul className="social-share">
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-pinterest-p"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-google-plus-g"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="book-section">
                    <div className="container">
                        <div className="book-wrapper offset-lg-4">
                            <div className="left-side">
                                <div className="item">
                                    <div className="item-header">
                                        <div className="thumb">
                                            <i className="fal fa-shopping-cart"></i>
                                        </div>
                                        <div className="counter-area">
                                            <span className="counter-item odometer" data-odometer-final="92">
                                                0
                                            </span>
                                            <span>k+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="item-header">
                                        <div className="thumb">
                                            <i className="fal fa-heart"></i>
                                        </div>
                                        <div className="counter-area">
                                            <span className="counter-item odometer" data-odometer-final="80">
                                                0
                                            </span>
                                            <span>k+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="item-header">
                                        <h5 className="title">5.0</h5>
                                        <div className="rated">
                                            <i className="fas fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="item-header">
                                        <div className="rated rate-it">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                        </div>
                                        <h5 className="title">0.0</h5>
                                    </div>
                                </div>
                            </div>
                            <NavLink to="/movie-ticket" className="custom-button">
                                book tickets
                            </NavLink>
                        </div>
                    </div>
                </section>

                <section className="movie-details-section padding-top padding-bottom">
                    <div className="container">
                        <div className="row justify-content-center flex-wrap-reverse mb--50">
                            <div className="col-lg-9 mb-50">
                                <div className="movie-details">
                                    <h3 className="title">photos</h3>
                                    <div className="details-photos owl-carousel">
                                        <div className="thumb">
                                            <a href="assets/img/movie/movie-1.jpg" className="img-pop">
                                                <img src="assets/img/movie/movie-1.jpg" alt="movie" />
                                            </a>
                                        </div>
                                        <div className="thumb">
                                            <a href="assets/img/movie/movie-2.jpg" className="img-pop">
                                                <img src="assets/img/movie/movie-2.jpg" alt="movie" />
                                            </a>
                                        </div>
                                        <div className="thumb">
                                            <a href="assets/img/movie/movie-3.jpg" className="img-pop">
                                                <img src="assets/img/movie/movie-3.jpg" alt="movie" />
                                            </a>
                                        </div>
                                        <div className="thumb">
                                            <a href="assets/img/movie/movie-1.jpg" className="img-pop">
                                                <img src="assets/img/movie/movie-1.jpg" alt="movie" />
                                            </a>
                                        </div>
                                        <div className="thumb">
                                            <a href="assets/img/movie/movie-2.jpg" className="img-pop">
                                                <img src="assets/img/movie/movie-2.jpg" alt="movie" />
                                            </a>
                                        </div>
                                        <div className="thumb">
                                            <a href="assets/img/movie/movie-3.jpg" className="img-pop">
                                                <img src="assets/img/movie/movie-3.jpg" alt="movie" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="tab summery-review">
                                        <ul className="tab-menu">
                                            <li className="active">description</li>
                                            <li>
                                                review <span>10</span>
                                            </li>
                                        </ul>
                                        <div className="tab-area">
                                            <div className="tab-item active">
                                                <div className="item">
                                                    <h5 className="sub-title">There are many variations of passages</h5>
                                                    <p>
                                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or
                                                        randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                                                        anything embarrassing hidden in the middle of text.
                                                    </p>
                                                    <p>
                                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or
                                                        randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                                                        anything embarrassing hidden in the middle of text.
                                                    </p>
                                                    <div className="widget-tags mt-5">
                                                        <p>Tags :</p>
                                                        <ul>
                                                            <li>
                                                                <a href="#">2D</a>
                                                            </li>
                                                            <li>
                                                                <a href="#">3D</a>
                                                            </li>
                                                            <li>
                                                                <a href="#">MOVIE</a>
                                                            </li>
                                                            <li>
                                                                <a href="#">2023</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="item">
                                                    <div className="header">
                                                        <h5 className="sub-title">movie cast</h5>
                                                        <div className="navigation">
                                                            <div className="cast-prev">
                                                                <i className="flaticon-double-right-arrows-angles"></i>
                                                            </div>
                                                            <div className="cast-next">
                                                                <i className="flaticon-double-right-arrows-angles"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="casting-slider owl-carousel">
                                                        <div className="cast-item">
                                                            <div className="cast-thumb">
                                                                <a href="#">
                                                                    <img src="assets/img/cast/cast-1.jpg" alt="cast" />
                                                                </a>
                                                            </div>
                                                            <div className="cast-content">
                                                                <h6 className="cast-title">
                                                                    <a href="#">Thoma Michels</a>
                                                                </h6>
                                                                <span className="cate">actress</span>
                                                                <p>As Position Name</p>
                                                            </div>
                                                        </div>
                                                        <div className="cast-item">
                                                            <div className="cast-thumb">
                                                                <a href="#">
                                                                    <img src="assets/img/cast/cast-2.jpg" alt="cast" />
                                                                </a>
                                                            </div>
                                                            <div className="cast-content">
                                                                <h6 className="cast-title">
                                                                    <a href="#">Wayne Gould</a>
                                                                </h6>
                                                                <span className="cate">actor</span>
                                                                <p>As Position Name</p>
                                                            </div>
                                                        </div>
                                                        <div className="cast-item">
                                                            <div className="cast-thumb">
                                                                <a href="#">
                                                                    <img src="assets/img/cast/cast-3.jpg" alt="cast" />
                                                                </a>
                                                            </div>
                                                            <div className="cast-content">
                                                                <h6 className="cast-title">
                                                                    <a href="#">Theodore Trotman</a>
                                                                </h6>
                                                                <span className="cate">actress</span>
                                                                <p>As Position Name</p>
                                                            </div>
                                                        </div>
                                                        <div className="cast-item">
                                                            <div className="cast-thumb">
                                                                <a href="#">
                                                                    <img src="assets/img/cast/cast-4.jpg" alt="cast" />
                                                                </a>
                                                            </div>
                                                            <div className="cast-content">
                                                                <h6 className="cast-title">
                                                                    <a href="#">Julie Martinez</a>
                                                                </h6>
                                                                <span className="cate">actor</span>
                                                                <p>As Position Name</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item">
                                                    <div className="header">
                                                        <h5 className="sub-title">movie crew</h5>
                                                        <div className="navigation">
                                                            <div className="cast-prev-2">
                                                                <i className="flaticon-double-right-arrows-angles"></i>
                                                            </div>
                                                            <div className="cast-next-2">
                                                                <i className="flaticon-double-right-arrows-angles"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="casting-slider-two owl-carousel">
                                                        <div className="cast-item">
                                                            <div className="cast-thumb">
                                                                <a href="#">
                                                                    <img src="assets/img/cast/cast-5.jpg" alt="cast" />
                                                                </a>
                                                            </div>
                                                            <div className="cast-content">
                                                                <h6 className="cast-title">
                                                                    <a href="#">Jessica Hatcher</a>
                                                                </h6>
                                                                <span className="cate">actor</span>
                                                            </div>
                                                        </div>
                                                        <div className="cast-item">
                                                            <div className="cast-thumb">
                                                                <a href="#">
                                                                    <img src="assets/img/cast/cast-6.jpg" alt="cast" />
                                                                </a>
                                                            </div>
                                                            <div className="cast-content">
                                                                <h6 className="cast-title">
                                                                    <a href="#">George Reyer</a>
                                                                </h6>
                                                                <span className="cate">Director</span>
                                                            </div>
                                                        </div>
                                                        <div className="cast-item">
                                                            <div className="cast-thumb">
                                                                <a href="#">
                                                                    <img src="assets/img/cast/cast-7.jpg" alt="cast" />
                                                                </a>
                                                            </div>
                                                            <div className="cast-content">
                                                                <h6 className="cast-title">
                                                                    <a href="#">Jonathan Douglas</a>
                                                                </h6>
                                                                <span className="cate">producer</span>
                                                            </div>
                                                        </div>
                                                        <div className="cast-item">
                                                            <div className="cast-thumb">
                                                                <a href="#">
                                                                    <img src="assets/img/cast/cast-8.jpg" alt="cast" />
                                                                </a>
                                                            </div>
                                                            <div className="cast-content">
                                                                <h6 className="cast-title">
                                                                    <a href="#">Virginia Ellis</a>
                                                                </h6>
                                                                <span className="cate">producer</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-item">
                                                <div className="movie-review-item">
                                                    <div className="author">
                                                        <div className="thumb">
                                                            <a href="#">
                                                                <img src="assets/img/cast/cast-2.jpg" alt="cast" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movie-review-content">
                                                        <div className="movie-review-info">
                                                            <h6 className="subtitle">
                                                                <a href="#">Thomas E Criswell</a>
                                                            </h6>
                                                            <span className="reply-date">
                                                                <i className="fal fa-clock"></i> 1 hour ago{" "}
                                                            </span>
                                                            <div className="review">
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                            </div>
                                                        </div>
                                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                        <div className="review-meta">
                                                            <a href="#">
                                                                {" "}
                                                                <i className="fal fa-thumbs-up"></i>
                                                                <span>10</span>{" "}
                                                            </a>
                                                            <a href="#" className="dislike">
                                                                {" "}
                                                                <i className="fal fa-thumbs-down"></i>
                                                                <span>02</span>{" "}
                                                            </a>
                                                            <a href="#">
                                                                {" "}
                                                                <i className="fal fa-flag"></i> <span>Report Review</span>{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="movie-review-item">
                                                    <div className="author">
                                                        <div className="thumb">
                                                            <a href="#">
                                                                <img src="assets/img/cast/cast-1.jpg" alt="cast" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movie-review-content">
                                                        <div className="movie-review-info">
                                                            <h6 className="subtitle">
                                                                <a href="#">Thomas E Criswell</a>
                                                            </h6>
                                                            <span className="reply-date">
                                                                <i className="fal fa-clock"></i> 1 hour ago{" "}
                                                            </span>
                                                            <div className="review">
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                            </div>
                                                        </div>
                                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                        <div className="review-meta">
                                                            <a href="#">
                                                                {" "}
                                                                <i className="fal fa-thumbs-up"></i>
                                                                <span>10</span>{" "}
                                                            </a>
                                                            <a href="#" className="dislike">
                                                                {" "}
                                                                <i className="fal fa-thumbs-down"></i>
                                                                <span>02</span>{" "}
                                                            </a>
                                                            <a href="#">
                                                                {" "}
                                                                <i className="fal fa-flag"></i> <span>Report Review</span>{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="movie-review-item">
                                                    <div className="author">
                                                        <div className="thumb">
                                                            <a href="#">
                                                                <img src="assets/img/cast/cast-2.jpg" alt="cast" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movie-review-content">
                                                        <div className="movie-review-info">
                                                            <h6 className="subtitle">
                                                                <a href="#">Thomas E Criswell</a>
                                                            </h6>
                                                            <span className="reply-date">
                                                                <i className="fal fa-clock"></i> 1 hour ago{" "}
                                                            </span>
                                                            <div className="review">
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                            </div>
                                                        </div>
                                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                        <div className="review-meta">
                                                            <a href="#">
                                                                {" "}
                                                                <i className="fal fa-thumbs-up"></i>
                                                                <span>10</span>{" "}
                                                            </a>
                                                            <a href="#" className="dislike">
                                                                {" "}
                                                                <i className="fal fa-thumbs-down"></i>
                                                                <span>02</span>{" "}
                                                            </a>
                                                            <a href="#">
                                                                {" "}
                                                                <i className="fal fa-flag"></i> <span>Report Review</span>{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="movie-review-item">
                                                    <div className="author">
                                                        <div className="thumb">
                                                            <a href="#">
                                                                <img src="assets/img/cast/cast-3.jpg" alt="cast" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movie-review-content">
                                                        <div className="movie-review-info">
                                                            <h6 className="subtitle">
                                                                <a href="#">Thomas E Criswell</a>
                                                            </h6>
                                                            <span className="reply-date">
                                                                <i className="fal fa-clock"></i> 1 hour ago{" "}
                                                            </span>
                                                            <div className="review">
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                                <i className="fal fa-star"></i>
                                                            </div>
                                                        </div>
                                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                        <div className="review-meta">
                                                            <a href="#">
                                                                {" "}
                                                                <i className="fal fa-thumbs-up"></i>
                                                                <span>10</span>{" "}
                                                            </a>
                                                            <a href="#" className="dislike">
                                                                {" "}
                                                                <i className="fal fa-thumbs-down"></i>
                                                                <span>02</span>{" "}
                                                            </a>
                                                            <a href="#">
                                                                {" "}
                                                                <i className="fal fa-flag"></i> <span>Report Review</span>{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="load-more text-center">
                                                    <a href="#" className="custom-button transparent">
                                                        load more
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-10 col-md-6 mb-50">
                                <div className="widget-1 widget-offer">
                                    <h3 className="title">TODAY OFFER</h3>
                                    <div className="offer-body">
                                        <div className="offer-item">
                                            <div className="thumb">
                                                <img src="assets/img/sidebar/offer-1.png" alt="sidebar" />
                                            </div>
                                            <div className="content">
                                                <h6>
                                                    <a href="#">Brand Card Cashback Offer</a>
                                                </h6>
                                                <p>It is a long established fact that a reader will be distracted</p>
                                            </div>
                                        </div>
                                        <div className="offer-item">
                                            <div className="thumb">
                                                <img src="assets/img/sidebar/offer-2.png" alt="sidebar" />
                                            </div>
                                            <div className="content">
                                                <h6>
                                                    <a href="#">Online Payment Offer</a>
                                                </h6>
                                                <p>It is a long established fact that a reader will be distracted</p>
                                            </div>
                                        </div>
                                        <div className="offer-item">
                                            <div className="thumb">
                                                <img src="assets/img/sidebar/offer-3.png" alt="sidebar" />
                                            </div>
                                            <div className="content">
                                                <h6>
                                                    <a href="#">Bank Payment Cashback</a>
                                                </h6>
                                                <p>It is a long established fact that a reader will be distracted</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-1 widget-banner">
                                    <div className="widget-1-body">
                                        <a href="#">
                                            <img src="assets/img/sidebar/banner/banner-1.jpg" alt="banner" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
export default Movie_Details;
