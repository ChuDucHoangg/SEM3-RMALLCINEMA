import Loading from "../../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { NavLink } from "react-router-dom";
function MovieSeat() {
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
                <title>Seat | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section
                    className="details-banner hero-area seat-plan-banner"
                    style={{
                        backgroundImage: "url('assets/img/banner/banner-movie-details.jpg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="details-banner-wrapper">
                            <div className="details-banner-content style-two">
                                <h3 className="title">Irregular</h3>
                                <div className="tags">
                                    <a href="#!">MOVIE</a>
                                    <a href="#!">2D</a>
                                    <a href="#!">3D</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="page-title bg-one">
                    <div className="container">
                        <div className="page-title-area">
                            <div className="item md-order-1">
                                <a href="movie-ticket-plan.html" className="custom-button back-button">
                                    <i className="far fa-reply"></i> Change Plan
                                </a>
                            </div>
                            <div className="item date-item">
                                <span className="date">FRI 14, 2023</span>
                                <select className="select-bar">
                                    <option value="sc1">07:40</option>
                                    <option value="sc2">09:40</option>
                                    <option value="sc3">11:40</option>
                                    <option value="sc4">13:40</option>
                                    <option value="sc5">15:50</option>
                                    <option value="sc6">19:50</option>
                                </select>
                            </div>
                            <div className="item">
                                <small> TIME LEFT </small>
                                <span className="h3 font-weight-bold"> 09:00 </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="seat-plan-section padding-bottom padding-top">
                    <div className="container">
                        <div className="screen-area">
                            <h4 className="screen">theater</h4>
                            <div className="screen-thumb">
                                <img src="assets/img/movie/theater.png" alt="movie" />
                            </div>
                            <h5 className="subtitle">single seat plan</h5>
                            <div className="screen-wrapper">
                                <ul className="seat-area">
                                    <li className="seat-line">
                                        <span>H</span>
                                        <ul className="seat--area">
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h1</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h2</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h3</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h4</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h5</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h6</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h7</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h8</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h9</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">h10</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g11</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g12</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g13</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g14</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>H</span>
                                    </li>
                                    <li className="seat-line">
                                        <span>G</span>
                                        <ul className="seat--area">
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g1</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g2</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g3</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g4</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g5</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g6</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g7</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g8</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g9</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g10</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g11</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g12</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g13</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">g14</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>G</span>
                                    </li>
                                    <li className="seat-line">
                                        <span>f</span>
                                        <ul className="seat--area">
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f1</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f2</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f3</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f4</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f5</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f6</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f7</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f8</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f9</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f10</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f11</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f12</span>
                                                    </li>
                                                    <li className="single-seat seat-free">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f13</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="single-seat__custom" name="single-seat" />
                                                        <span className="sit-num">f14</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>f</span>
                                    </li>
                                </ul>
                            </div>
                            <h5 className="subtitle">double seat plan</h5>
                            <div className="screen-wrapper">
                                <ul className="seat-area couple">
                                    <li className="seat-line">
                                        <span>e</span>
                                        <ul className="seat--area">
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">e1 e2</span>
                                                    </li>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">e3 e4</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">e5 e6</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">e7 e8</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">e9 e10</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">e11 e12</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">e13 e14</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>e</span>
                                    </li>
                                    <li className="seat-line">
                                        <span>d</span>
                                        <ul className="seat--area">
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">d1 d2</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">d3 d4</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">d5 d6</span>
                                                    </li>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num booked-bg">d7 d8</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">d9 d10</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">d11 d12</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">d13 d14</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>d</span>
                                    </li>
                                    <li className="seat-line">
                                        <span>c</span>
                                        <ul className="seat--area">
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">c1 c2</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">c3 c4</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">c5 c6</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">c7 c8</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">c9 c10</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">c11 c12</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">c13 c14</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>c</span>
                                    </li>
                                    <li className="seat-line">
                                        <span>b</span>
                                        <ul className="seat--area">
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">b1 b2</span>
                                                    </li>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">b3 b4</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">b5 b6</span>
                                                    </li>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">b7 b8</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">b9 b10</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">b11 b12</span>
                                                    </li>
                                                    <li className="single-seat">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">b13 b14</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>b</span>
                                    </li>
                                    <li className="seat-line">
                                        <span>a</span>
                                        <ul className="seat--area">
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num booked-bg">a1 a2</span>
                                                    </li>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">a3 a4</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">a5 a6</span>
                                                    </li>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">a7 a8</span>
                                                    </li>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">a9 a10</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="front-seat">
                                                <ul>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num booked-bg">a11</span>
                                                    </li>
                                                    <li className="single-seat seat-free-two">
                                                        <input type="checkbox" className="two-seat__custom" name="two-seat" />
                                                        <span className="sit-num">a12</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span>a</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="proceed-book">
                            <div className="proceed-to-book">
                                <div className="book-item">
                                    <span>Your Selected Seat</span>
                                    <h3 className="title">a1, a2</h3>
                                </div>
                                <div className="book-item">
                                    <span>total price</span>
                                    <h3 className="title">$200</h3>
                                </div>
                                <div className="book-item">
                                    <NavLink to="/movie-food" className="custom-button">
                                        checkout now
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default MovieSeat;
