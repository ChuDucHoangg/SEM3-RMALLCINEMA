import Loading from "../../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { PayPalButton } from "react-paypal-button-v2";
import { useMovieContext } from "../../../../context/MovieContext";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { getDecodedToken } from "../../../../utils/auth";

function MovieCheckout() {
    const navigate = useNavigate();

    const { movieData, setMessageContext } = useMovieContext();
    const { movieDetails, selectedSeats, addFoods } = movieData;

    const decodedToken = getDecodedToken();

    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");
    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    // Decode the token
    const userInfo = {
        fullName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        userEmail: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
    };

    // Select payment method
    const handlePaymentMethodClick = (method) => {
        setSelectedPaymentMethod(method);
    };

    // Paypal
    const handlePaymentSuccess = async (details, data) => {
        // console.log("Payment success:", details);
        // console.log("Payment data:", data);

        try {
            if (decodedToken) {
                // Create Order form context
                const orderData = {
                    orderCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
                    showId: movieData.movieDetails.id,
                    userId: userInfo.userId,
                    total: calculateTotal(movieData.selectedSeats.length, movieData.addFoods),
                    discountAmount: 0,
                    discountCode: "",
                    finalTotal: calculateFinalTotal(calculateTotal(movieData.selectedSeats.length, movieData.addFoods), 0),
                    paymentMethod: selectedPaymentMethod,
                    tickets: movieData.selectedSeats.map((seat) => ({ orderId: 0, seatId: seat })),
                    foods: movieData.addFoods.map((food) => ({ id: food.id, quantity: food.quantity })),
                };

                await api.post(url.ORDER.CREATE, orderData);

                movieData.setMovieDetails();
            }
        } catch (error) {
            console.error("Error:", error);
        }

        setMessageContext("Payment Success!");
        navigate("/checkout/result");
    };

    const handlePaymentCancel = (data) => {
        console.log("Payment canceled:", data);

        setMessageContext("Payment canceled.");
        navigate("/checkout/result");
    };

    const handlePaymentError = (err) => {
        console.error("Payment error:", err);

        setMessageContext("Payment encountered an error.");
        navigate("/checkout/result");
    };

    // Global variable for ticket price per seat
    const seatPrice = 10;

    // Function to calculate the total seat fees
    const calculateSeatFees = (seats) => {
        return seats.length * seatPrice;
    };

    // Function to calculate total order value
    // const calculateTotal = (numSeats, foods) => {
    //     const foodTotal = foods.reduce((total, food) => total + food.price * food.quantity, 0);
    //     return numSeats * seatPrice + foodTotal;
    // };

    const calculateTotal = (numSeats, foods) => {
        if (!foods) {
            return numSeats * seatPrice;
        }

        const foodTotal = foods.reduce((total, food) => total + food.price * food.quantity, 0);
        return numSeats * seatPrice + foodTotal;
    };

    // Function to calculate the total final value (after applying the discount)
    const calculateFinalTotal = (total, discountAmount) => {
        return total - discountAmount;
    };

    useEffect(() => {
        // When there is a change in the data (e.g. selectedSeats, addFoods), update the finalTotal value
        const newFinalTotal = calculateFinalTotal(calculateTotal(movieData.selectedSeats.length, movieData.addFoods), 0);
        setFinalTotal(newFinalTotal);
    }, [movieData.selectedSeats, movieData.addFoods]);

    return (
        <>
            <Helmet>
                <title>Checkout | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section
                    className="details-banner hero-area seat-plan-banner"
                    style={{
                        backgroundImage: `url(${movieDetails.cover_image})`,
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="details-banner-wrapper">
                            <div className="details-banner-content style-two">
                                <h3 className="title">{movieDetails.title}</h3>
                                <div className="tags">{movieDetails && movieDetails.genres && movieDetails.genres.map((genre, genreIndex) => <p key={genreIndex}>{genre.name}</p>)}</div>
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
                                <div className="checkout-widget checkout-contact">
                                    <h5 className="title">Billing Info</h5>
                                    <form className="checkout-contact-form">
                                        <div className="form-group">
                                            <input type="text" value={userInfo.fullName} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" value={userInfo.userEmail} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" placeholder="Enter phone" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" placeholder="Enter address " />
                                        </div>
                                        {/* <div className="form-group">
                                            <input type="submit" value="Continue" className="custom-button" />
                                        </div> */}
                                    </form>
                                </div>
                                <div className="checkout-widget checkout-contact">
                                    <h5 className="title">Promo Code</h5>
                                    <form className="checkout-contact-form">
                                        <div className="form-group">
                                            <input type="text" placeholder="Enter promo code" />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Apply" className="custom-button" />
                                        </div>
                                    </form>
                                </div>
                                <div className="checkout-widget checkout-card mb-0">
                                    <h5 className="title">Payment Option</h5>
                                    <ul className="payment-option">
                                        <li className={selectedPaymentMethod === "paypal" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("paypal")}>
                                                <img src="assets/img/payment/paypal.png" alt="" />
                                                <span> Paypal</span>
                                            </p>
                                        </li>

                                        <li className={selectedPaymentMethod === "applePay" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("applePay")}>
                                                <img src="assets/img/payment/apple-pay.png" alt="" className="icon" />
                                                <span>Apple Pay</span>
                                            </p>
                                        </li>
                                        <li className={selectedPaymentMethod === "zaloPay" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("zaloPay")}>
                                                <img src="assets/img/payment/zalopay.png" alt="" />
                                                <span>Zalo Pay</span>
                                            </p>
                                        </li>
                                        <li className={selectedPaymentMethod === "momo" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("momo")}>
                                                <img src="assets/img/payment/momo.png" alt="" />
                                                <span>MoMo</span>
                                            </p>
                                        </li>
                                    </ul>
                                    {/* <h6 className="subtitle">Enter Your Card Details</h6> */}
                                    {/* <form className="payment-card-form">
                                        <div className="form-group w-100">
                                            <label htmlFor="card1">Name on the Card</label>
                                            <input type="text" id="card1" />
                                            <div className="right-icon">
                                                <i className="flaticon-lock"></i>
                                            </div>
                                        </div>
                                        <div className="form-group w-100">
                                            <label htmlFor="card2"> Card Number</label>
                                            <input type="text" id="card2" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="card3">Expiration</label>
                                            <input type="text" id="card3" placeholder="MM/YY" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="card4">CVV</label>
                                            <input type="text" id="card4" placeholder="CVV" />
                                        </div>
                                        <div className="form-group check-group">
                                            <input id="card5" type="checkbox" checked />
                                            <label htmlFor="card5">
                                                <span className="title">Save Card Info For Future Payment</span>
                                                <span className="info">It is a long established fact that a reader will be distracted by the readable content.</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" className="custom-button" value="confirm payment" />
                                        </div>
                                    </form>
                                    <p className="notice">
                                        By clicking this payment button you agree with our <a href="#!">terms and conditions</a>.
                                    </p> */}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="booking-summery bg-one side-shape">
                                    <h4 className="title">booking summery</h4>
                                    <ul>
                                        <li>
                                            <h6 className="subtitle">MOVIE NAME</h6>
                                            <div className="info">
                                                <span>{movieDetails.title}</span>
                                                <span>Tickets: {selectedSeats.length}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>NUMBER OF SEATS</span>
                                            </h6>
                                            <div className="info">
                                                <span>{selectedSeats.join(", ")}</span>
                                                <span>${calculateSeatFees(movieData.selectedSeats)}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>Premiere</span>
                                            </h6>
                                            <div className="info">
                                                <span>14 APR FRI, 7:00 PM</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>food & soft drink</span>
                                            </h6>
                                            {addFoods &&
                                                addFoods.map((item, index) => (
                                                    <div className="info" key={index}>
                                                        <span className="text-default">{`${item.foodName} x${item.quantity}`}</span>
                                                        <span>{`$${item.price * item.quantity}`}</span>
                                                    </div>
                                                ))}
                                        </li>
                                    </ul>
                                </div>
                                <div className="proceed-area text-center">
                                    <h6 className="subtitle">
                                        <span> Pay Amount</span>
                                        <span>${finalTotal}</span>
                                    </h6>

                                    {selectedPaymentMethod === "paypal" && (
                                        <PayPalButton
                                            amount={finalTotal}
                                            onSuccess={(details, data) => handlePaymentSuccess(details, data)}
                                            onCancel={handlePaymentCancel}
                                            onError={handlePaymentError}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default MovieCheckout;
