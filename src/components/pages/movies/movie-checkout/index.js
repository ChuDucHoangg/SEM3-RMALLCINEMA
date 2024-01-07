import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useMovieContext } from "../../../../context/MovieContext";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken, getDecodedToken } from "../../../../utils/auth";
import { PayPalButton } from "react-paypal-button-v2";
import GooglePayButton from "@google-pay/button-react";
import Loading from "../../../layouts/loading";
import Layout from "../../../layouts/layout";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "../../../../payment/StripePaymentForm";
const stripePromise = loadStripe("pk_test_51OVqT0DQZzhwaulm9QNS20I55bgkpOt6eQa1gHTm113njc8xGE3A3YoiJ5WEweMhQizzHnQGtFH0zEw8mXCYFbcB00s9xR5vEC");

function MovieCheckout() {
    const navigate = useNavigate();

    const { movieData, setMessageContext } = useMovieContext();
    const { movieDetails, selectedSeats, addFoods } = movieData;

    const decodedToken = getDecodedToken();

    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("PayPal");
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

    // Create order
    const createOrderData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };
        try {
            if (decodedToken) {
                const total = calculateTotal(movieData.selectedSeats, movieData.addFoods);
                const finalTotal = calculateFinalTotal(total, 0);

                const orderData = {
                    orderCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
                    showId: movieData.selectShow,
                    userId: userInfo.userId,
                    total: total,
                    discountAmount: 0,
                    discountCode: "",
                    finalTotal: finalTotal,
                    paymentMethod: selectedPaymentMethod,
                    tickets: movieData.selectedSeats.map((seat) => ({ seatId: seat.id, price: seat.price, quantity: 1 })), // Thêm quantity nếu cần
                    foods: movieData.addFoods && movieData.addFoods.length > 0 ? movieData.addFoods.map((food) => ({ id: food.id, quantity: food.quantity, price: food.price })) : [],
                };

                const orderResponse = await api.post(url.BOOKING.CREATE, orderData, config);

                // Use orderResponse.data.id instead of order.id
                navigate(`/checkout/thank-you/${orderResponse.data.id}`);
                localStorage.removeItem("movie_data");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    // Credit Card
    const handleStripePaymentSuccess = async (paymentMethod) => {
        await createOrderData();
        setMessageContext("Payment Success!");
    };

    // Paypal
    const handlePaymentSuccess = async (details, data) => {
        await createOrderData();
        setMessageContext("Payment Success!");
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

    // Calculate the total cost of the selected seat
    const calculateSeatFees = (seats) => {
        const totalPrice = seats.reduce((acc, selectedSeat) => {
            const seatPrice = selectedSeat.price || 0;
            return acc + seatPrice;
        }, 0);

        return totalPrice;
    };

    const calculateTotal = (seats, foods) => {
        const seatFees = calculateSeatFees(seats);

        if (!foods) {
            return seatFees;
        }

        const foodTotal = foods.reduce((total, food) => total + food.price * food.quantity, 0);
        return seatFees + foodTotal;
    };

    // Function to calculate the total final value (after applying the discount)
    const calculateFinalTotal = (total, discountAmount) => {
        return total - discountAmount;
    };

    useEffect(() => {
        // When there is a change in the data (e.g. selectedSeats, addFoods), update the finalTotal value
        const newFinalTotal = calculateFinalTotal(calculateTotal(selectedSeats, movieData.addFoods), 0);
        setFinalTotal(newFinalTotal);
    }, [selectedSeats, movieData.addFoods]);

    // Check if movieDetails & selectedSeats is available
    if (!movieDetails || !selectedSeats || selectedSeats.length === 0) {
        return (
            <>
                <Helmet>
                    <title>Checkout | R Mall Cinema</title>
                </Helmet>
                <Layout>
                    <div className="movie-facility padding-bottom padding-top">
                        <div className="container">
                            <div className="col-lg-4 mx-auto">
                                <div className="d-flex align-item-center justify-content-center flex-column pt-50">
                                    <img src="./assets/img/broken-robot.svg" alt="" />
                                    <div className="text-center">
                                        <p>You haven't chosen any movie yet. Please select a movie and then proceed to payment.</p>
                                        <Link to="/movies" className="custom-button btn-download mt-0">
                                            <i className="far fa-reply"></i> Back to movies page
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        );
    }

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
                                        <li className={selectedPaymentMethod === "PayPal" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("PayPal")}>
                                                <img src="assets/img/payment/paypal.png" alt="" />
                                                <span> Paypal</span>
                                            </p>
                                        </li>

                                        <li className={selectedPaymentMethod === "Apple Pay" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("Apple Pay")}>
                                                <img src="assets/img/payment/apple-pay.png" alt="" className="icon" />
                                                <span>Apple Pay</span>
                                            </p>
                                        </li>

                                        <li className={selectedPaymentMethod === "Google Pay" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("Google Pay")}>
                                                <img src="assets/img/payment/google-pay.png" alt="" />
                                                <span>Google Pay</span>
                                            </p>
                                        </li>

                                        <li className={selectedPaymentMethod === "Credit Card" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("Credit Card")}>
                                                <img src="assets/img/payment/credit-card.png" alt="" style={{ marginTop: "-20px" }} />
                                                <span style={{ marginTop: "-10px" }}>Credit Card</span>
                                            </p>
                                        </li>

                                        <li className={selectedPaymentMethod === "MoMo" ? "active" : ""}>
                                            <p onClick={() => handlePaymentMethodClick("MoMo")}>
                                                <img src="assets/img/payment/momo.png" alt="" />
                                                <span>MoMo</span>
                                            </p>
                                        </li>
                                    </ul>
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
                                                <span>{`Tickets: ${selectedSeats.length}`}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>NUMBER OF SEATS</span>
                                            </h6>
                                            <div className="info">
                                                <span>{selectedSeats.map((selectedSeat) => selectedSeat.id).join(", ")}</span>
                                                <span>${calculateSeatFees(selectedSeats)}</span>
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
                                    {selectedPaymentMethod === "PayPal" && (
                                        <PayPalButton
                                            amount={finalTotal}
                                            onSuccess={(details, data) => handlePaymentSuccess(details, data)}
                                            onCancel={handlePaymentCancel}
                                            onError={handlePaymentError}
                                        />
                                    )}

                                    {selectedPaymentMethod === "Apple Pay" && <p className="btn-coming-son mt-3">Coming soon...</p>}

                                    {selectedPaymentMethod === "Google Pay" && (
                                        <GooglePayButton
                                            environment="TEST"
                                            paymentRequest={{
                                                apiVersion: 2,
                                                apiVersionMinor: 0,
                                                allowedPaymentMethods: [
                                                    {
                                                        type: "CARD",
                                                        parameters: {
                                                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                                            allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
                                                        },
                                                        tokenizationSpecification: {
                                                            type: "PAYMENT_GATEWAY",
                                                            parameters: {
                                                                gateway: "example",
                                                            },
                                                        },
                                                    },
                                                ],
                                                merchantInfo: {
                                                    merchantId: "BCR2DN4TZKBZLYYZ",
                                                    merchantName: `for movie tickets ${movieDetails.title}`,
                                                },
                                                transactionInfo: {
                                                    totalPriceStatus: "FINAL",
                                                    totalPriceLabel: "Total",
                                                    totalPrice: `${finalTotal}`,
                                                    currencyCode: "USD",
                                                    countryCode: "US",
                                                },
                                                shippingAddressRequired: true,
                                                callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
                                            }}
                                            onLoadPaymentData={(paymentRequest) => {
                                                console.log("Success", paymentRequest);
                                            }}
                                            onPaymentAuthorized={(paymentData) => {
                                                console.log("Payment Authorised Success", paymentData);
                                                return { transactionState: "SUCCESS" };
                                            }}
                                            onPaymentDataChanged={(paymentData) => {
                                                console.log("On Payment Data Changed", paymentData);
                                                return {};
                                            }}
                                            existingPaymentMethodRequired="false"
                                            buttonType="Pay"
                                        />
                                    )}

                                    {selectedPaymentMethod === "Credit Card" && (
                                        <Elements stripe={stripePromise}>
                                            <StripePaymentForm onSuccess={handleStripePaymentSuccess} />
                                        </Elements>
                                    )}

                                    {selectedPaymentMethod === "MoMo" && <p className="btn-coming-son mt-3">Coming soon...</p>}
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
