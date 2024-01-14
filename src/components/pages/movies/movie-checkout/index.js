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
import Swal from "sweetalert2";
import { useCallback } from "react";
import { format, subMinutes } from "date-fns";
// const stripePromise = loadStripe("pk_test_51OVqT0DQZzhwaulm9QNS20I55bgkpOt6eQa1gHTm113njc8xGE3A3YoiJ5WEweMhQizzHnQGtFH0zEw8mXCYFbcB00s9xR5vEC");
const stripePromise = (async () => {
    try {
        return await loadStripe("pk_test_51OVqT0DQZzhwaulm9QNS20I55bgkpOt6eQa1gHTm113njc8xGE3A3YoiJ5WEweMhQizzHnQGtFH0zEw8mXCYFbcB00s9xR5vEC");
    } catch (err) {
        console.error(err);
        window.location.reload();
    }
})();
function MovieCheckout() {
    const navigate = useNavigate();

    const { movieData, updateSelectedSeats, setHoldingSeat } = useMovieContext();
    const { movieDetails, selectedSeats, addFoods, holdingSeat, selectShow } = movieData;

    const decodedToken = getDecodedToken();

    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("PayPal");
    const [finalTotal, setFinalTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [discountRate, setDiscountRate] = useState({});
    const [promotion, setPromotion] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(false);

    const [formData, setFormData] = useState({
        promotionCode: "",
    });

    const [formErrors, setFormErrors] = useState({
        promotionCode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
        setSelectedPromotion(false);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.promotionCode) {
            newErrors.promotionCode = "Please enter your promotion code.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

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
                    showId: selectShow.id,
                    userId: userInfo.userId,
                    total: total,
                    discountAmount: total - discountRate.data || 0,
                    discountCode: formData.promotionCode || "",
                    finalTotal: discountRate.data ? discountRate.data : finalTotal,
                    paymentMethod: selectedPaymentMethod,
                    tickets: movieData.selectedSeats.map((seat) => ({ seatId: seat.id })),
                    foods: movieData.addFoods && movieData.addFoods.length > 0 ? movieData.addFoods.map((food) => ({ id: food.id, quantity: food.quantity, price: food.price })) : [],
                };

                const orderResponse = await api.post(url.BOOKING.CREATE, orderData, config);

                // Use orderResponse.data.id instead of order.id
                navigate(`/checkout/thank-you/${orderResponse.data.orderCode}`);
                localStorage.removeItem("movie_data");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    // Credit Card
    const handleStripePaymentSuccess = async (paymentMethod) => {
        await createOrderData();
    };

    // Paypal
    const handlePaymentSuccess = async (details, data) => {
        await createOrderData();
    };

    const handlePaymentCancel = (data) => {
        console.log("Payment canceled:", data);

        navigate("/checkout/payment-error");
    };

    const handlePaymentError = (err) => {
        console.error("Payment error:", err);

        navigate("/checkout/payment-error");
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
        const isSeatsArray = Array.isArray(seats);

        const seatFees = isSeatsArray ? calculateSeatFees(seats) : 0;

        if (!foods) {
            return seatFees;
        }

        if (!isSeatsArray) {
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
        const newTotal = calculateTotal(movieData.selectedSeats, movieData.addFoods);
        setTotal(newTotal);

        const newFinalTotal = calculateFinalTotal(newTotal, discountRate.data || 0);
        setFinalTotal(newFinalTotal);
    }, [movieData.selectedSeats, movieData.addFoods, discountRate]);

    useEffect(() => {
        // When there is a change in the data (e.g. selectedSeats, addFoods), update the finalTotal value
        const newFinalTotal = calculateFinalTotal(calculateTotal(selectedSeats, movieData.addFoods), 0);
        setFinalTotal(newFinalTotal);
    }, [selectedSeats, movieData.addFoods]);

    const handleApplyDiscount = async () => {
        // e.preventDefault();

        if (validateForm()) {
            // Calculate the total based on the promotion code
            const total = calculateTotal(movieData.selectedSeats, movieData.addFoods);

            // Update formData with the calculated total
            const updatedFormData = {
                ...formData,
                total: total,
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            };

            try {
                // Construct the URL with query parameters
                const apiUrl = `${url.PROMOTION.DISCOUNT}?promotionCode=${updatedFormData.promotionCode}&total=${total}`;

                // Use the constructed URL in the API request
                const discountResponse = await api.post(apiUrl, null, config);

                if (discountResponse.status === 200) {
                    setDiscountRate(discountResponse.data);
                    Swal.fire({
                        title: "Success",
                        text: "Apply promotion successfully!",
                        icon: "success",
                    });
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        title: "Oops...",
                        text: "The discount code is incorrect, or has expired!",
                        icon: "warning",
                    });
                }
            }
        }
    };

    const handleInputFocus = (e) => {
        e.target.blur();
    };

    // Get Promotions by user
    const loadPromotion = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const promotionResponse = await api.get(url.PROMOTION.BY_USER, config);
            setPromotion(promotionResponse.data);
        } catch (error) {}
    }, []);

    useEffect(() => {
        loadPromotion();
    }, [loadPromotion]);

    const handleDivClick = (promotionCode) => {
        setFormData({
            ...formData,
            promotionCode: promotionCode,
        });
        setSelectedPromotion(true);
    };

    useEffect(() => {
        // const applyDiscount = async () => {
        if (selectedPromotion) {
            handleApplyDiscount();
            setSelectedPromotion(false);
        }

        // Invoke the function immediately
    }, [selectedPromotion, handleApplyDiscount]);

    const [time, setTime] = useState({ minutes: 5, seconds: 0 });

    const handleTimeout = () => {
        updateSelectedSeats([]);
        setHoldingSeat(null);
        Swal.fire({
            title: "Oops...",
            text: "The time to hold the seat has expired. Please try again or choose another seat.!",
            icon: "error",
        });

        navigate(`/movie-seat/${selectShow.showCode}`);
    };

    useEffect(() => {
        const expiryTimeFromApi = holdingSeat;
        const expiryDate = new Date(expiryTimeFromApi);

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const difference = Math.floor((expiryDate - currentTime) / 1000);

            const newMinutes = Math.floor(difference / 60);
            const newSeconds = difference % 60;

            if (difference <= 0) {
                clearInterval(intervalId);
                handleTimeout();
            } else {
                setTime({ minutes: newMinutes, seconds: newSeconds });
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

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
                                        <Link to={`/movie-seat/${selectShow.showCode}`} className="custom-button btn-download mt-0">
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
                            {/* <div className="item date-item">
                                <span className="date">FRI 14, 2023</span>
                            </div> */}
                            <div className="item">
                                <small> Seat holding time </small>
                                <span className="h3 font-weight-bold">
                                    {" "}
                                    {time.minutes.toString().padStart(2, "0")}:{time.seconds.toString().padStart(2, "0")}{" "}
                                </span>
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
                                            <input type="text" value={userInfo.fullName} onFocus={handleInputFocus} disabled />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" value={userInfo.userEmail} onFocus={handleInputFocus} disabled />
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
                                    <div className="checkout-contact-form">
                                        <div className="form-group">
                                            <input type="text" placeholder="Enter promo code" name="promotionCode" value={formData.promotionCode} onChange={handleChange} required />
                                            {formErrors.promotionCode && <p className="invalid-feedback">{formErrors.promotionCode}</p>}
                                        </div>
                                        <div className="form-group">
                                            <button className="custom-button btn-apply" onClick={handleApplyDiscount}>
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-3" data-toggle="modal" data-target="#promotion" style={{ cursor: "pointer", fontSize: "14px" }}>
                                        R Mall Discount <i className="fal fa-chevron-right"></i>
                                    </div>
                                    <div className="modal fade" id="promotion" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content modal-content__custom">
                                                <div className="modal-body">
                                                    <h2 className="text-center mb-4">Your discount code</h2>
                                                    {promotion.length > 0 ? (
                                                        <div className="pr-4 pl-4" style={{ overflowY: "auto", height: "620px" }}>
                                                            {promotion.map((item, index) => {
                                                                return (
                                                                    <div
                                                                        className="mt-3 mb-3"
                                                                        key={index}
                                                                        onClick={() => handleDivClick(item.promotionCode)}
                                                                        data-dismiss="modal"
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        <div className="blog-author d-flex align-items-center discount-custom mt-3">
                                                                            <div className="author-thumb my-auto">
                                                                                <img src="./assets/icons/discount-svgrepo.svg" alt="blog" />
                                                                            </div>
                                                                            <div className="author-content">
                                                                                <h5 className="title mt-2">
                                                                                    <p>{item.promotionName}</p>
                                                                                </h5>
                                                                                <span className="d-flex align-items-center discount-custom__desc" data-toggle="tooltip" data-placement="right">
                                                                                    <i className="fal fa-copy"></i> {item.promotionCode}
                                                                                </span>
                                                                            </div>
                                                                            <div className="mt-3 discount-custom__footer">
                                                                                <span className="d-flex align-items-center  discount-custom__desc">
                                                                                    <i className="fal fa-badge-percent"></i> {item.discountPercentage}%
                                                                                </span>
                                                                                <span className="d-flex align-items-center discount-custom__desc">
                                                                                    <i className="fal fa-clock"></i> {item && item.endDate && format(new Date(item.endDate), "HH:mm:ss dd/MM/yyyy")}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <div className="text-center mb-2">
                                                            <svg
                                                                viewBox="0 0 1024 1024"
                                                                fill="#ffffff"
                                                                width="200px"
                                                                height="200px"
                                                                className="icon mb-5"
                                                                version="1.1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                stroke="#ffffff"
                                                            >
                                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path
                                                                        d="M361.45 1023.91c-14.34 0-28.682-5.454-39.586-16.358L16.458 702.148c-21.84-21.84-21.84-57.348-0.016-79.172l441.16-441.158c20.48-20.48 59.956-31.526 88.092-24.636l206.536 50.646c24.588 6.062 49.332 27.854 60.19 53.004a7.998 7.998 0 0 1-4.17 10.514c-4.032 1.75-8.78-0.11-10.514-4.17-8.716-20.2-29.932-39.024-49.318-43.804L541.88 172.726c-22.886-5.624-56.3 3.75-72.968 20.402L27.754 634.288c-7.516 7.514-11.638 17.542-11.638 28.26 0 10.732 4.138 20.762 11.654 28.292l305.404 305.404c15.592 15.576 40.976 15.576 56.566-0.016l441.126-441.142c16.67-16.668 25.994-50.098 20.386-72.984l-37.336-152.266a8 8 0 0 1 5.858-9.686 8.008 8.008 0 0 1 9.672 5.876l37.336 152.264c7.014 28.588-3.796 67.298-24.606 88.106L401.05 1007.552c-10.92 10.906-25.274 16.358-39.6 16.358z"
                                                                        fill=""
                                                                    ></path>
                                                                    <path
                                                                        d="M663.934 423.986c-16.386 0-32.76-6.232-45.224-18.7-24.964-24.962-24.964-65.564-0.016-90.512 21.95-21.95 56.348-25.026 81.764-7.28a65.05 65.05 0 0 1 8.748 7.234 7.994 7.994 0 0 1 0.062 11.31c-3.11 3.138-8.17 3.186-11.308 0.078a48.916 48.916 0 0 0-6.61-5.468c-19.074-13.31-44.866-11.028-61.348 5.438-18.714 18.714-18.7 49.162 0.016 67.892 18.716 18.7 49.164 18.714 67.91-0.032 5.638-5.686 9.824-12.7 12.058-20.262 1.25-4.234 5.75-6.67 9.936-5.39a8 8 0 0 1 5.404 9.936c-2.982 10.092-8.542 19.418-16.074 27.01-12.496 12.498-28.916 18.746-45.318 18.746z"
                                                                        fill=""
                                                                    ></path>
                                                                    <path
                                                                        d="M663.824 392.026c-8.466 0-16.464-3.312-22.494-9.342a31.76 31.76 0 0 1-9.376-22.666c0.016-17.636 14.374-31.978 31.994-31.978 4.42 0 7.998 3.578 7.998 7.998s-3.578 8-7.998 8c-8.81 0-15.98 7.17-15.996 15.996a15.768 15.768 0 0 0 4.686 11.326 15.768 15.768 0 0 0 11.248 4.67h0.078a15.952 15.952 0 0 0 11.874-5.326 8 8 0 0 1 11.902 10.684 31.922 31.922 0 0 1-23.728 10.638h-0.188z"
                                                                        fill=""
                                                                    ></path>
                                                                    <path
                                                                        d="M663.95 368.03a8.002 8.002 0 0 1-7.81-6.31 8.024 8.024 0 0 1 6.138-9.514c281.864-60.692 345.6-302.204 345.6-344.116 0-4.42 3.578-8 8-8a7.994 7.994 0 0 1 7.998 8c0 43.914-66.064 296.844-358.222 359.752a8.1 8.1 0 0 1-1.704 0.188z"
                                                                        fill=""
                                                                    ></path>
                                                                    <path
                                                                        d="M738.856 192.05a7.944 7.944 0 0 1-4.592-1.454 7.99 7.99 0 0 1-1.954-11.138C836.024 31.24 989.85 0.09 1015.908 0.09h0.016c4.42 0 7.998 3.578 7.998 8s-3.578 7.998-7.998 7.998h-0.016c-23.292 0-171.98 31.774-270.508 172.542a7.934 7.934 0 0 1-6.544 3.42zM312.1 607.95c-39.694-0.016-71.984-32.322-71.984-71.986 0-39.694 32.292-71.984 71.984-72 39.696 0.016 71.986 32.306 71.986 71.984s-32.292 71.986-71.986 72.002z m0-127.992c-30.868 0.016-55.988 25.136-55.988 56.004 0 30.854 25.122 55.974 55.988 55.99 30.87-0.016 55.99-25.136 55.99-56.006 0-30.866-25.122-55.972-55.99-55.988zM488.064 783.912c-39.696-0.016-71.986-32.322-71.986-71.984 0-39.696 32.292-71.986 71.986-72.002 39.696 0.016 71.984 32.306 71.984 72.002 0 39.662-32.288 71.968-71.984 71.984z m0-127.99c-30.87 0.016-55.988 25.136-55.988 56.006 0 30.854 25.12 55.972 55.988 55.988 30.868-0.016 55.988-25.134 55.988-55.988 0-30.87-25.12-55.99-55.988-56.006zM248.114 783.912a7.996 7.996 0 0 1-5.654-13.654l303.938-303.952a7.996 7.996 0 1 1 11.308 11.31L253.77 781.568a7.976 7.976 0 0 1-5.656 2.344z"
                                                                        fill=""
                                                                    ></path>
                                                                </g>
                                                            </svg>
                                                            <p>Currently you do not have any promotions.</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="custom-button back-button border-0" data-dismiss="modal">
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                            <h6 className="subtitle">MOVIE </h6>
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
                                                <span>{selectedSeats.map((selectedSeat) => selectedSeat.seatName).join(", ")}</span>
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
                                        <span>Total</span>
                                        <span>${total}</span>
                                    </h6>
                                    <h6 className="subtitle">
                                        <span>Discount</span>
                                        <span>{`-$${(discountRate.data ? Math.abs(discountRate.data - total) : 0).toFixed(2).toLocaleString()}`}</span>
                                    </h6>
                                    <h6 className="subtitle">
                                        <span> Pay Amount</span>
                                        {/* <span>${finalTotal}</span> */}

                                        <span>${discountRate.data ? discountRate.data : finalTotal}</span>
                                    </h6>
                                    {selectedPaymentMethod === "PayPal" && (
                                        <PayPalButton
                                            amount={discountRate.data ? discountRate.data : finalTotal}
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
