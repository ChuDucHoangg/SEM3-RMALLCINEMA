import Loading from "../../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { NavLink } from "react-router-dom";
function MovieFood() {
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
                <title>Food | R Mall Cinema</title>
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
                                    {" "}
                                    <i className="far fa-reply"></i> Change Plan{" "}
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

                <div className="movie-facility padding-bottom padding-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="section-header-3">
                                    <span className="cate">Food</span>
                                    <h2 className="title">order your food</h2>
                                    <p>It is a long established fact that a reader will be distracted by the readable content</p>
                                </div>
                                <div className="grid--area">
                                    <ul className="filter">
                                        <li data-filter="*" className="active">
                                            all
                                        </li>
                                        <li data-filter=".package">package</li>
                                        <li data-filter=".drink">drink</li>
                                        <li data-filter=".popcorn">popcorn</li>
                                    </ul>
                                    <div className="grid-area">
                                        <div className="grid-item package popcorn">
                                            <div className="grid-inner">
                                                <div className="grid-thumb">
                                                    <img src="assets/img/movie/drink.jpg" alt="movie/popcorn" />
                                                    <div className="offer-tag">$80</div>
                                                    <div className="offer-remainder">
                                                        <h6 className="o-title mt-0">30%</h6>
                                                        <span>off</span>
                                                    </div>
                                                </div>
                                                <div className="grid-content">
                                                    <h5 className="subtitle">
                                                        <a href="#0">Popcon,Drink</a>
                                                    </h5>
                                                    <form className="cart-button">
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" type="text" name="qtybutton" value="2" />
                                                        </div>
                                                        <button type="submit" className="custom-button">
                                                            <i className="fal fa-shopping-cart"></i> add
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-item drink">
                                            <div className="grid-inner">
                                                <div className="grid-thumb">
                                                    <img src="assets/img/movie/food.jpg" alt="movie/popcorn" />
                                                    <div className="offer-tag">$80</div>
                                                    <div className="offer-remainder">
                                                        <h6 className="o-title mt-0">30%</h6>
                                                        <span>off</span>
                                                    </div>
                                                </div>
                                                <div className="grid-content">
                                                    <h5 className="subtitle">
                                                        <a href="#0">Popcon,Drink</a>
                                                    </h5>
                                                    <form className="cart-button">
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" type="text" name="qtybutton" value="2" />
                                                        </div>
                                                        <button type="submit" className="custom-button">
                                                            <i className="fal fa-shopping-cart"></i> add
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-item package">
                                            <div className="grid-inner">
                                                <div className="grid-thumb">
                                                    <img src="assets/img/movie/drink.jpg" alt="movie/popcorn" />
                                                    <div className="offer-tag">$80</div>
                                                    <div className="offer-remainder">
                                                        <h6 className="o-title mt-0">30%</h6>
                                                        <span>off</span>
                                                    </div>
                                                </div>
                                                <div className="grid-content">
                                                    <h5 className="subtitle">
                                                        <a href="#0">Popcon,Drink</a>
                                                    </h5>
                                                    <form className="cart-button">
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" type="text" name="qtybutton" value="2" />
                                                        </div>
                                                        <button type="submit" className="custom-button">
                                                            <i className="fal fa-shopping-cart"></i> add
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-item drink popcorn">
                                            <div className="grid-inner">
                                                <div className="grid-thumb">
                                                    <img src="assets/img/movie/food.jpg" alt="movie/popcorn" />
                                                    <div className="offer-tag">$80</div>
                                                    <div className="offer-remainder">
                                                        <h6 className="o-title mt-0">30%</h6>
                                                        <span>off</span>
                                                    </div>
                                                </div>
                                                <div className="grid-content">
                                                    <h5 className="subtitle">
                                                        <a href="#0">Popcon,Drink</a>
                                                    </h5>
                                                    <form className="cart-button">
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" type="text" name="qtybutton" value="2" />
                                                        </div>
                                                        <button type="submit" className="custom-button">
                                                            <i className="fal fa-shopping-cart"></i> add
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="booking-summery bg-one side-shape">
                                    <h4 className="title">booking summery</h4>
                                    <ul>
                                        <li>
                                            <h6 className="subtitle">Irregular</h6>
                                            <span className="info">Movie-3d</span>
                                        </li>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>Cine World</span>
                                                <span>04</span>
                                            </h6>
                                            <div className="info">
                                                <span>14 APR FRI, 7:00 PM</span> <span>Tickets</span>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="subtitle mb-0">
                                                <span>Tickets Price</span>
                                                <span>$200</span>
                                            </h6>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>package</span>
                                                <span>$80</span>
                                            </h6>
                                            <span className="info">
                                                <span>3 star package</span>
                                            </span>
                                        </li>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>food & soft drink</span>
                                            </h6>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <span className="info">
                                                <span>price</span>
                                                <span>$280</span>
                                            </span>
                                            <span className="info">
                                                <span>vat</span>
                                                <span>$10</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="proceed-area text-center">
                                    <h6 className="subtitle">
                                        <span> Pay Amount</span>
                                        <span>$290</span>
                                    </h6>
                                    <NavLink to="/movie-checkout" className="custom-button">
                                        confirm payment
                                    </NavLink>
                                </div>
                                <div className="note">
                                    <h5 className="title">Note :</h5>
                                    <p>It is a long established fact that a reader will be distracted by the readable content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default MovieFood;
