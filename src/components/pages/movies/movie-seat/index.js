import Loading from "../../../layouts/loading";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { NavLink, useParams } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { useMovieContext } from "../../../../context/MovieContext";
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
        }, 1500);
    }, [loadSeat]);

    const handleSeatSelect = (seat) => {
        // Check if the seat is already selected
        if (selectSeats.includes(seat)) {
            // If yes, remove it from the selectSeats list
            setSelectSeats(selectSeats.filter((selectedSeat) => selectedSeat !== seat));
        } else {
            // If not, check if the total selected seats is less than 5
            if (selectSeats.length < 5) {
                // If yes, add it to the selectSeats list
                setSelectSeats([...selectSeats, seat]);
            } else {
                // If no, show a message or handle it accordingly
                alert("You can only select up to 5 seats.");
            }
        }

        updateSelectedSeats(selectSeats);
    };

    // const totalPrice = selectSeats.length * 10;

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
                                                                <span>{rowNumber}</span>
                                                                <li className="front-seat">
                                                                    <ul>
                                                                        {seat[rowNumber]
                                                                            .filter((item) => item.seatTypeId === 1)
                                                                            .map((item, index) => (
                                                                                <li key={index} className="single-seat">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        className="single-seat__custom"
                                                                                        name="single-seat"
                                                                                        checked={selectSeats.includes(`${item.rowNumber}${item.seatNumber}`)}
                                                                                        onChange={() => handleSeatSelect(`${item.rowNumber}${item.seatNumber}`)}
                                                                                    />
                                                                                    <span className="sit-num">{item.seatNumber}</span>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </li>
                                                                <span>{rowNumber}</span>
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
                                                                <span>{rowNumber}</span>
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
                                                                                        checked={selectSeats.includes(`${item.rowNumber}${item.seatNumber}`)}
                                                                                        onChange={() => handleSeatSelect(`${item.rowNumber}${item.seatNumber}`)}
                                                                                    />
                                                                                    <span className="sit-num">{item.seatNumber}</span>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </li>
                                                                <span>{rowNumber}</span>
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
                                                                <span>{rowNumber}</span>
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
                                                                                        checked={selectSeats.includes(`${item.rowNumber}${item.seatNumber}`)}
                                                                                        onChange={() => handleSeatSelect(`${item.rowNumber}${item.seatNumber}`)}
                                                                                    />
                                                                                    <span className="sit-num">{item.seatNumber}</span>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </li>
                                                                <span>{rowNumber}</span>
                                                            </li>
                                                        </ul>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="proceed-book">
                            <div className="proceed-to-book">
                                <div className="book-item">
                                    <span>Your Selected Seat</span>
                                    <h3 className="title">{selectSeats.join(", ")}</h3>
                                </div>
                                {/* <div className="book-item">
                                    <span>total price</span>
                                    <h3 className="title">${totalPrice}</h3>
                                </div> */}
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
