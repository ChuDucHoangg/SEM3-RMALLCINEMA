import Loading from "../../../layouts/loading";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import Pagination from "../../../layouts/pagination";
import { useMovieContext } from "../../../../context/MovieContext";
import Swal from "sweetalert2";
function MovieFood() {
    const navigate = useNavigate();
    const { movieData, setFoods, updateSelectedSeats, setHoldingSeat } = useMovieContext();
    const { movieDetails, selectedSeats, addFoods, selectShow } = movieData;

    const [loading, setLoading] = useState(false);
    const [food, setFood] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [orderFood, setOrderFood] = useState([]);
    const [finalTotal, setFinalTotal] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const [showDescription, setShowDescription] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(2);

    const loadFood = useCallback(async () => {
        try {
            const foodResponse = await api.get(url.FOOD.LIST);
            setFood(foodResponse.data);

            const initialQuantities = {};
            foodResponse.data.forEach((item) => {
                initialQuantities[item.id] = 1; // Set default quantity to 1 for each product
            });
            setQuantities(initialQuantities);
        } catch (error) {}
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity, 10);

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    const handleAddFood = (id, foodName, quantity, price) => {
        const existingProductIndex = orderFood.findIndex((item) => item.foodName === foodName);

        // Assuming 'food' is an array containing objects with 'quantity' property
        const selectedFood = food.find((item) => item.id === id);

        if (!selectedFood) {
            // Handle the case where the selected food is not found
            console.error(`Food with id ${id} not found.`);
            return;
        }

        const availableQuantity = selectedFood.quantity || 0;
        const totalQuantity = quantity + (existingProductIndex !== -1 ? orderFood[existingProductIndex].quantity : 0);

        if (totalQuantity > availableQuantity) {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: `You can't add more than ${availableQuantity} items.`,
                confirmButtonText: "Agreed, I understand.",
            });
            return;
        }

        if (existingProductIndex !== -1) {
            // If the product exists, update the quantity
            const updatedOrderFoods = [...orderFood];
            updatedOrderFoods[existingProductIndex] = {
                ...updatedOrderFoods[existingProductIndex],
                quantity: totalQuantity,
            };
            setOrderFood(updatedOrderFoods);
            setFoods(updatedOrderFoods);
        } else {
            // If the product doesn't exist, add a new entry to the order
            if (quantity <= availableQuantity) {
                const updatedOrderFoods = [...orderFood, { id, foodName, quantity, price }];
                setOrderFood(updatedOrderFoods);
                setFoods(updatedOrderFoods);
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: `You can't add more than ${availableQuantity} items.`,
                    confirmButtonText: "Agreed, I understand.",
                });
            }
        }
    };

    const handleRemoveItem = (index) => {
        const updatedOrderFoods = [...orderFood];
        updatedOrderFoods.splice(index, 1); // Remove the item at the specified index
        setOrderFood(updatedOrderFoods);
        setFoods(updatedOrderFoods);
    };

    // Pagination
    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentItemPage = food.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/movie-food?page=${pageNumber}`);

        const scrollToHeight = window.innerHeight * 0.6;
        window.scrollTo({ top: scrollToHeight, left: 0, behavior: "smooth" });
    };

    useEffect(() => {
        loadFood();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1500);

        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get("page")) || 1;
        setCurrentPage(page);
    }, [loadFood, currentPage, navigate]);

    // Calculate the total cost of the selected seat
    const calculateSeatFees = (seats) => {
        const totalPrice = seats.reduce((acc, selectedSeat) => {
            const seatPrice = selectedSeat.price || 0;
            return acc + seatPrice;
        }, 0);

        return totalPrice;
    };

    const calculateTotal = useCallback((seats, foods) => {
        if (!foods) {
            return seats.reduce((total, seat) => total + seat.price, 0);
        }

        const seatTotal = seats.reduce((total, seat) => total + seat.price, 0);
        const foodTotal = foods.reduce((total, food) => total + food.price * food.quantity, 0);

        return seatTotal + foodTotal;
    }, []);

    // Function to calculate the total final value (after applying the discount)
    const calculateFinalTotal = (total, discountAmount) => {
        return total - discountAmount;
    };

    useEffect(() => {
        // When there is a change in the data (e.g. selectedSeats, addFoods), update the finalTotal value
        const newFinalTotal = calculateFinalTotal(calculateTotal(selectedSeats, movieData.addFoods), 0);
        setFinalTotal(newFinalTotal);
    }, [selectedSeats, movieData.addFoods, calculateFinalTotal, calculateTotal]);

    const handleToggleDescription = (index) => {
        setShowDescription((prev) => (prev === index ? null : index));
    };

    const handleCheckSeatReservation = async () => {
        const seatSelection = selectedSeats.map((seats) => seats.id);
        setSubmitting(true);
        try {
            const seatReservation = await api.post(url.SEAT.SEAT_RESERVATION + `/${selectShow.id}`, seatSelection);
            const responseData = seatReservation.data;

            if (responseData.status === true) {
                setHoldingSeat(responseData.expiresat);
                navigate("/checkout");
            } else if (responseData.status === false) {
                updateSelectedSeats([]);

                Swal.fire({
                    icon: "error",
                    title: "Sorry",
                    text: "The seat you selected is already reserved. Please choose another seat. Thank you!",
                    footer: `<a href="/movie-seat/${selectShow.showCode}">Go back to seat selection page?</a>`,
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        let countdownTimer;
        if (submitting && countdown > 0) countdownTimer = setInterval(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);
        return () => clearInterval(countdownTimer);
    }, [submitting, countdown]);

    // Check if movieDetails & selectedSeats is available
    if (!movieDetails || !selectedSeats || selectedSeats.length === 0) {
        return (
            <>
                <Helmet>
                    <title>Food | R Ticket</title>
                </Helmet>
                <Layout>
                    <div className="movie-facility padding-bottom padding-top">
                        <div className="container">
                            <div className="col-lg-4 mx-auto">
                                <div className="d-flex align-item-center justify-content-center flex-column pt-50">
                                    <img src="./assets/img/broken-robot.svg" alt="" />
                                    <div className="text-center">
                                        <p>You haven't chosen any seats yet. Please select your seat before making payment.</p>
                                        <Link to={`/movie-seat/${selectShow.showCode}`} className="custom-button btn-download mt-0">
                                            <i className="far fa-reply"></i> Back to seat selection
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
                <title>Food | R Mall Cinema</title>
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
                                <div className="section-header-3">
                                    <h2 className="title">order your food</h2>
                                    <p>
                                        Skip the lines and enjoy a seamless process – your favorite treats will be ready for you at the counter. Make the most of your cinema outing with a hassle-free
                                        food and beverage experience! 🎬🥤🍿
                                    </p>
                                </div>

                                <div className="grid--area">
                                    <div className="grid-area reset-styles">
                                        {currentItemPage.map((item, index) => (
                                            <div className="grid-item drink" key={index}>
                                                <div className="grid-inner">
                                                    <div className="grid-thumb">
                                                        <img src={item.image} alt={item.name} className="food-img" />
                                                        <div className="offer-tag">${item.price}</div>
                                                        <div className="offer-remainder">
                                                            {item.quantity === 0 ? (
                                                                <span>out stock</span>
                                                            ) : (
                                                                <>
                                                                    <h6 className="o-title mt-0">{item.quantity}</h6>
                                                                    <span>qty</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="grid-content">
                                                        <h5 className="subtitle">
                                                            <p>{item.name}</p>
                                                        </h5>

                                                        <div className="mt-3 mb-3">
                                                            <Link to="" style={{ color: "#fff" }} onClick={() => handleToggleDescription(index)}>
                                                                {showDescription === index ? "view less" : "view more"}
                                                            </Link>{" "}
                                                            <i className={`fal ${showDescription === index ? "fa-chevron-circle-up" : "fa-chevron-circle-down"}`}></i>
                                                        </div>
                                                        {showDescription === index && <p>{item.description}</p>}

                                                        <form className="cart-button">
                                                            <div className="cart-plus-minus">
                                                                <button
                                                                    type="button"
                                                                    className="qty-btn qty-btn__left"
                                                                    onClick={() => handleQuantityChange(item.id, Math.max(1, quantities[item.id] - 1))}
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    className="cart-plus-minus-box"
                                                                    type="text"
                                                                    name={`qtybutton-${item.id}`}
                                                                    value={quantities[item.id] || ""}
                                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                                />
                                                                <button type="button" className="qty-btn qty-btn__right" onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 0) + 1)}>
                                                                    +
                                                                </button>
                                                            </div>
                                                            {item.quantity === 0 ? (
                                                                <button type="button" className="custom-button disabled-btn">
                                                                    <i className="fal fa-shopping-cart"></i> add
                                                                </button>
                                                            ) : (
                                                                <button type="button" className="custom-button" onClick={() => handleAddFood(item.id, item.name, quantities[item.id] || 1, item.price)}>
                                                                    <i className="fal fa-shopping-cart"></i> add
                                                                </button>
                                                            )}
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-20">
                                        <Pagination perPage={itemsPerPage} totalPage={food.length} paginate={paginate} currentPage={currentPage} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="booking-summery bg-one side-shape">
                                    <h4 className="title">booking summery</h4>
                                    <ul>
                                        <li>
                                            <h6 className="subtitle">Movie</h6>
                                            <div className="info">
                                                <span>{movieDetails.title}</span>
                                                <span>{`Tickets: ${selectedSeats.length}`}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>Number of seats</span>
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
                                                <span>FOOD & SOFT DRINK</span>
                                            </h6>
                                            {addFoods &&
                                                addFoods.map((item, index) => (
                                                    <div className="info" key={index}>
                                                        <span className="text-default">{`${item.foodName} x${item.quantity}`}</span>
                                                        <span>
                                                            {`$${item.price * item.quantity}`}{" "}
                                                            <i className="fal fa-trash-alt" onClick={() => handleRemoveItem(index)} style={{ cursor: "pointer" }}></i>
                                                        </span>
                                                    </div>
                                                ))}
                                        </li>
                                    </ul>
                                </div>
                                <div className="proceed-area text-center">
                                    <h6 className="subtitle">
                                        <span>PAY AMOUNT</span>
                                        <span>${finalTotal}</span>
                                    </h6>
                                    {!submitting ? (
                                        <button type="button" className="custom-button" onClick={handleCheckSeatReservation}>
                                            confirm payment
                                        </button>
                                    ) : (
                                        <button type="button" className="custom-button btn-payment" disabled>
                                            <i className="fa fa-spinner fa-spin"></i> Checking...
                                        </button>
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
export default MovieFood;
