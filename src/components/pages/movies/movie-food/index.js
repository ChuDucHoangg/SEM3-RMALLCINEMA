import Loading from "../../../layouts/loading";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import Pagination from "../../../layouts/pagination";
import { useMovieContext } from "../../../../context/MovieContext";
function MovieFood() {
    const navigate = useNavigate();
    const { movieData, setFoods } = useMovieContext();
    const { movieDetails, selectedSeats, addFoods } = movieData;

    const [loading, setLoading] = useState(false);
    const [food, setFood] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [orderFood, setOrderFood] = useState([]);
    const [finalTotal, setFinalTotal] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

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

        if (existingProductIndex !== -1) {
            // If the product exists, update the quantity
            const updatedOrderFoods = [...orderFood];
            updatedOrderFoods[existingProductIndex] = {
                ...updatedOrderFoods[existingProductIndex],
                quantity: quantity,
            };
            setOrderFood(updatedOrderFoods);
            setFoods(updatedOrderFoods);
        } else {
            // If the product doesn't exist, add a new entry to the order
            const updatedOrderFoods = [...orderFood, { id, foodName, quantity, price }];
            setOrderFood(updatedOrderFoods);
            setFoods(updatedOrderFoods);
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
                                                            <h6 className="o-title mt-0">30%</h6>
                                                            <span>off</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid-content">
                                                        <h5 className="subtitle">
                                                            <p>{item.name}</p>
                                                        </h5>
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
                                                            <button type="button" className="custom-button" onClick={() => handleAddFood(item.id, item.name, quantities[item.id] || 1, item.price)}>
                                                                <i className="fal fa-shopping-cart"></i> add
                                                            </button>
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
                                            <h6 className="subtitle">Movie name</h6>
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
                                    <NavLink to="/checkout" className="custom-button">
                                        confirm payment
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
export default MovieFood;
