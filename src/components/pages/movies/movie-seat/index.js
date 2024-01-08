import Loading from "../../../layouts/loading";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { NavLink, useParams } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { useMovieContext } from "../../../../context/MovieContext";
import Swal from "sweetalert2";
import NotFound from "../../other/not-found";
function MovieSeat() {
    const { showCode } = useParams();
    const { movieData, updateSelectedSeats } = useMovieContext();
    const { movieDetails } = movieData;

    const [loading, setLoading] = useState(false);
    const [seat, setSeat] = useState([]);
    const [selectSeats, setSelectSeats] = useState([]);

    const loadSeat = useCallback(async () => {
        try {
            const seatResponse = await api.get(url.SEAT.BY_SHOW + `/${showCode}`);
            const seatData = seatResponse.data;

            // Use reduce to combine data by rowNumber
            const groupedSeats = seatData.reduce((acc, seat) => {
                const { rowNumber } = seat;

                if (!acc[rowNumber]) {
                    // If there is no key with rowNumber, create a new key and set the value to an array containing seats
                    acc[rowNumber] = [seat];
                } else {
                    // If there is already a key with rowNumber, add seat to the corresponding array
                    acc[rowNumber].push(seat);
                }

                return acc;
            }, {});

            setSeat(groupedSeats);
        } catch (error) {
            console.error("Error loading seats:", error);
        }
    }, [showCode]);

    useEffect(() => {
        loadSeat();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loadSeat]);

    useEffect(() => {
        updateSelectedSeats(selectSeats);
        // eslint-disable-next-line
    }, [selectSeats]);

    const handleSeatSelect = (rowNumber, seatNumber) => {
        if (seat && seat[rowNumber] && Array.isArray(seat[rowNumber])) {
            const selectedSeat = seat[rowNumber].find((item) => item.seatNumber === seatNumber);

            if (selectedSeat) {
                const seatId = selectedSeat.id;
                const seatPrice = selectedSeat.price;

                if (selectSeats.some((s) => s.id === seatId)) {
                    // If the seat is already selected, remove it from the selectSeats list
                    setSelectSeats(selectSeats.filter((selectedSeat) => selectedSeat.id !== seatId));
                } else if (selectSeats.length < 5) {
                    // If the total number of selected seats is less than 5, add it to the selectSeats list
                    setSelectSeats([...selectSeats, { id: seatId, price: seatPrice }]);
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "You can only select a maximum of 5 seats.",
                        confirmButtonText: "Agreed, I understand.",
                    });
                }
            } else {
                console.error("Invalid seat number.");
            }
        }
        updateSelectedSeats(selectSeats);
    };

    // Calculate the total cost of the selected seat
    const calculateTotalPriceSeat = () => {
        const totalPrice = selectSeats.reduce((acc, selectedSeat) => {
            const seatPrice = selectedSeat.price || 0;
            return acc + seatPrice;
        }, 0);

        return totalPrice;
    };

    return (
        <>
            <Helmet>
                <title>Seat | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            {Object.keys(seat).length > 0 ? (
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
                                    <div className="tags">
                                        {movieDetails.genres.map((genre, genreIndex) => (
                                            <p key={genreIndex}>{genre.name}</p>
                                        ))}
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
                                        {Object.keys(seat)
                                            .filter((rowNumber) => seat[rowNumber].some((item) => item.seatTypeId === 1))
                                            .map((rowNumber) => (
                                                <div key={rowNumber}>
                                                    {seat[rowNumber].length > 0 && (
                                                        <>
                                                            <ul className="seat--area">
                                                                <li className="seat-line">
                                                                    <span>{String.fromCharCode(65 + parseInt(rowNumber, 10))}</span>
                                                                    <li className="front-seat">
                                                                        <ul>
                                                                            {seat[rowNumber]
                                                                                .filter((item) => item.seatTypeId === 1)
                                                                                .map((item, index) => (
                                                                                    <li key={index} className={`single-seat ${item.isBooked ? "checked" : ""}`}>
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            className="single-seat__custom"
                                                                                            name="single-seat"
                                                                                            checked={item.isBooked || selectSeats.some((selectedSeat) => selectedSeat.id === item.id)}
                                                                                            onChange={() => handleSeatSelect(rowNumber, item.seatNumber)}
                                                                                            disabled={item.isBooked}
                                                                                        />
                                                                                        <span className="sit-num">{item.seatNumber}</span>
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </li>
                                                                    <span>{String.fromCharCode(65 + parseInt(rowNumber, 10))}</span>
                                                                </li>
                                                            </ul>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                    </ul>
                                </div>

                                <h5 className="subtitle">VIP seat plan</h5>
                                <div className="screen-wrapper">
                                    <ul className="seat-area">
                                        {Object.keys(seat)
                                            .filter((rowNumber) => seat[rowNumber].some((item) => item.seatTypeId === 2))
                                            .map((rowNumber) => (
                                                <div key={rowNumber}>
                                                    {seat[rowNumber].length > 0 && (
                                                        <>
                                                            <ul className="seat--area">
                                                                <li className="seat-line">
                                                                    <span>{String.fromCharCode(65 + parseInt(rowNumber, 10))}</span>
                                                                    <li className="front-seat">
                                                                        <ul>
                                                                            {seat[rowNumber]
                                                                                .filter((item) => item.seatTypeId === 2)
                                                                                .map((item, index) => (
                                                                                    <li key={index} className="single-seat">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            className="single-seat__custom"
                                                                                            name="single-seat"
                                                                                            // checked={item.isBooked || selectSeats.includes(item.id)}
                                                                                            // onChange={() => handleSeatSelect(item.id)}
                                                                                            checked={item.isBooked || selectSeats.some((selectedSeat) => selectedSeat.id === item.id)}
                                                                                            onChange={() => handleSeatSelect(rowNumber, item.seatNumber)}
                                                                                            disabled={item.isBooked}
                                                                                        />
                                                                                        <span className="sit-num">{item.seatNumber}</span>
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </li>
                                                                    <span>{String.fromCharCode(65 + parseInt(rowNumber, 10))}</span>
                                                                </li>
                                                            </ul>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                    </ul>
                                </div>

                                <h5 className="subtitle">double seat plan</h5>
                                <div className="screen-wrapper">
                                    <ul className="seat-area couple">
                                        {Object.keys(seat)
                                            .filter((rowNumber) => seat[rowNumber].some((item) => item.seatTypeId === 3))
                                            .map((rowNumber) => (
                                                <div key={rowNumber}>
                                                    {seat[rowNumber].length > 0 && (
                                                        <>
                                                            <ul className="seat--area">
                                                                <li className="seat-line">
                                                                    <span>{String.fromCharCode(65 + parseInt(rowNumber, 10))}</span>
                                                                    <li className="front-seat">
                                                                        <ul>
                                                                            {seat[rowNumber]
                                                                                .filter((item) => item.seatTypeId === 3)
                                                                                .map((item, index) => (
                                                                                    <li key={index} className="single-seat">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            className="two-seat__custom"
                                                                                            name="two-seat"
                                                                                            checked={item.isBooked || selectSeats.some((selectedSeat) => selectedSeat.id === item.id)}
                                                                                            onChange={() => handleSeatSelect(rowNumber, item.seatNumber)}
                                                                                            disabled={item.isBooked}
                                                                                        />
                                                                                        <span className="sit-num">{item.seatNumber}</span>
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </li>
                                                                    <span>{String.fromCharCode(65 + parseInt(rowNumber, 10))}</span>
                                                                </li>
                                                            </ul>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="proceed-book" style={{ display: selectSeats.length > 0 ? "block" : "none" }}>
                                <div className="proceed-to-book">
                                    <div className="book-item">
                                        <span>Your Selected Seat</span>
                                        <h3 className="title">{selectSeats.map((selectedSeat) => selectedSeat.id).join(", ")}</h3>
                                    </div>

                                    <div className="book-item">
                                        <span>Total Price</span>
                                        <h3 className="title">${calculateTotalPriceSeat()}</h3>
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
            ) : (
                <NotFound />
            )}
        </>
    );
}
export default MovieSeat;
