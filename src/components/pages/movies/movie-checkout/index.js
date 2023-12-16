import Loading from "../../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { NavLink } from "react-router-dom";
function Movie_Checkout() {
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
                <title>Checkout | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section
                    class="details-banner hero-area seat-plan-banner"
                    style={{
                        backgroundImage: "url('assets/img/banner/banner-movie-details.jpg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div class="container">
                        <div class="details-banner-wrapper">
                            <div class="details-banner-content style-two">
                                <h3 class="title">Irregular</h3>
                                <div class="tags">
                                    <a href="#">MOVIE</a>
                                    <a href="#">2D</a>
                                    <a href="#">3D</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="page-title bg-one">
                    <div class="container">
                        <div class="page-title-area">
                            <div class="item md-order-1">
                                <a href="movie-ticket-plan.html" class="custom-button back-button">
                                    {" "}
                                    <i class="far fa-reply"></i> Change Plan{" "}
                                </a>
                            </div>
                            <div class="item date-item">
                                <span class="date">FRI 14, 2023</span>
                                <select class="select-bar">
                                    <option value="sc1">07:40</option>
                                    <option value="sc2">09:40</option>
                                    <option value="sc3">11:40</option>
                                    <option value="sc4">13:40</option>
                                    <option value="sc5">15:50</option>
                                    <option value="sc6">19:50</option>
                                </select>
                            </div>
                            <div class="item">
                                <small> TIME LEFT </small>
                                <span class="h3 font-weight-bold"> 09:00 </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="movie-facility padding-bottom padding-top">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="checkout-widget d-flex flex-wrap align-items-center justify-cotent-between">
                                    <div class="title-area">
                                        <h5 class="title">Already Have An Account?</h5>
                                        <p>It is a long established fact that a reader will be distracted!</p>
                                    </div>
                                    <a href="#" class="sign-in-area">
                                        {" "}
                                        <i class="fal fa-user"></i>
                                        <span>Login</span>{" "}
                                    </a>
                                </div>
                                <div class="checkout-widget checkout-contact">
                                    <h5 class="title">Billing Info</h5>
                                    <form class="checkout-contact-form">
                                        <div class="form-group">
                                            <input type="text" placeholder="Full Name" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" placeholder="Enter email" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" placeholder="Enter Phone" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" placeholder="Enter address " />
                                        </div>
                                        <div class="form-group">
                                            <input type="submit" value="Continue" class="custom-button" />
                                        </div>
                                    </form>
                                </div>
                                <div class="checkout-widget checkout-contact">
                                    <h5 class="title">Promo Code</h5>
                                    <form class="checkout-contact-form">
                                        <div class="form-group">
                                            <input type="text" placeholder="Enter promo code" />
                                        </div>
                                        <div class="form-group">
                                            <input type="submit" value="Apply" class="custom-button" />
                                        </div>
                                    </form>
                                </div>
                                <div class="checkout-widget checkout-card mb-0">
                                    <h5 class="title">Payment Option</h5>
                                    <ul class="payment-option">
                                        <li class="active">
                                            <a href="#">
                                                <i class="fas fa-credit-card-front"></i>
                                                <span> Card</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fab fa-cc-paypal"></i>
                                                <span>paypal</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fab fa-cc-stripe"></i>
                                                <span>stripe</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fab fa-cc-apple-pay"></i>
                                                <span>Apple</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fab fa-cc-amazon-pay"></i>
                                                <span>Amazon</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <h6 class="subtitle">Enter Your Card Details</h6>
                                    <form class="payment-card-form">
                                        <div class="form-group w-100">
                                            <label for="card1">Name on the Card</label>
                                            <input type="text" id="card1" />
                                            <div class="right-icon">
                                                <i class="flaticon-lock"></i>
                                            </div>
                                        </div>
                                        <div class="form-group w-100">
                                            <label for="card2"> Card Number</label>
                                            <input type="text" id="card2" />
                                        </div>
                                        <div class="form-group">
                                            <label for="card3">Expiration</label>
                                            <input type="text" id="card3" placeholder="MM/YY" />
                                        </div>
                                        <div class="form-group">
                                            <label for="card4">CVV</label>
                                            <input type="text" id="card4" placeholder="CVV" />
                                        </div>
                                        <div class="form-group check-group">
                                            <input id="card5" type="checkbox" checked />
                                            <label for="card5">
                                                <span class="title">Save Card Info For Future Payment</span>
                                                <span class="info">It is a long established fact that a reader will be distracted by the readable content.</span>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <input type="submit" class="custom-button" value="confirm payment" />
                                        </div>
                                    </form>
                                    <p class="notice">
                                        By clicking this payment button you agree with our <a href="#">terms and conditions</a>.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="booking-summery bg-one side-shape">
                                    <h4 class="title">booking summery</h4>
                                    <ul>
                                        <li>
                                            <h6 class="subtitle">Irregular</h6>
                                            <span class="info">Movie-3d</span>
                                        </li>
                                        <li>
                                            <h6 class="subtitle">
                                                <span>Cine World</span>
                                                <span>04</span>
                                            </h6>
                                            <div class="info">
                                                <span>14 APR FRI, 7:00 PM</span> <span>Tickets</span>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 class="subtitle mb-0">
                                                <span>Tickets Price</span>
                                                <span>$200</span>
                                            </h6>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <h6 class="subtitle">
                                                <span>package</span>
                                                <span>$80</span>
                                            </h6>
                                            <span class="info">
                                                <span>3 star package</span>
                                            </span>
                                        </li>
                                        <li>
                                            <h6 class="subtitle">
                                                <span>food & soft drink</span>
                                            </h6>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <span class="info">
                                                <span>price</span>
                                                <span>$280</span>
                                            </span>
                                            <span class="info">
                                                <span>vat</span>
                                                <span>$10</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="proceed-area text-center">
                                    <h6 class="subtitle">
                                        <span> Pay Amount</span>
                                        <span>$290</span>
                                    </h6>
                                    <a href="#" class="custom-button">
                                        confirm payment
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default Movie_Checkout;
