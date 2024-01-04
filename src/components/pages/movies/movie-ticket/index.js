import Loading from "../../../layouts/loading";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { Link, useParams } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { format } from "date-fns";
import { useMovieContext } from "../../../../context/MovieContext";
function MovieTicket() {
    const { id } = useParams();
    const { movieData, updateSelectShow } = useMovieContext();
    const { movieDetails } = movieData;
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState([]);

    const [windowWarning, setWindowWarning] = useState(false);
    const [selectedShowCode, setSelectedShowCode] = useState(null);
    const [selectedShowStartTime, setSelectedShowStartTime] = useState(null);

    const handleShowTimeClick = (showCode, startTime) => {
        setWindowWarning(!windowWarning);
        setSelectedShowCode(showCode);
        setSelectedShowStartTime(startTime);
    };

    const loadShow = useCallback(async () => {
        try {
            const showResponse = await api.get(url.SHOW.BY_MOVIE + `/${id}`);
            setShow(showResponse.data);
        } catch (error) {}
    }, [id]);

    useEffect(() => {
        loadShow();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loadShow]);

    const handleSelectShow = (showId) => {
        updateSelectShow(showId);
    };

    return (
        <>
            <Helmet>
                <title>Ticket | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}

            <Layout>
                <section className={`window-warning ${windowWarning ? "" : "inActive"}`}>
                    <div className="lay"></div>
                    <div className="warning-item">
                        <h6 className="subtitle">Show Time: {selectedShowStartTime}</h6>
                        <h4 className="title">Book Your Seats</h4>
                        <div className="thumb">
                            <img src="assets/img/movie/tt.png" alt="movie" />
                        </div>
                        <Link to={`/movie-seat/${selectedShowCode}`} className="custom-button seatPlanButton">
                            Show Seat Plans<i className="fal fa-long-arrow-alt-right"></i>
                        </Link>
                    </div>
                </section>

                <section
                    className="details-banner hero-area"
                    style={{
                        backgroundImage: `url(${movieDetails.cover_image})`,
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="details-banner-wrapper">
                            <div className="details-banner-content">
                                <h3 className="title">{movieDetails.title}</h3>
                                <div className="tags">{movieDetails && movieDetails.genres && movieDetails.genres.map((genre, genreIndex) => <p key={genreIndex}>{genre.name}</p>)}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="book-section bg-one">
                    <div className="container">
                        <form className="ticket-search-form two">
                            <div className="form-group">
                                <div className="thumb">
                                    <img src="assets/img/ticket/city.png" alt="ticket" />
                                </div>
                                <span className="type">city</span>
                                <select className="select-bar">
                                    <option value="london">New York</option>
                                    <option value="dhaka">California</option>
                                    <option value="rosario">Texas</option>
                                    <option value="madrid">Florida</option>
                                    <option value="koltaka">Nevada</option>
                                    <option value="rome">Oregon</option>
                                    <option value="khoksa">Ohio</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="thumb">
                                    <img src="assets/img/ticket/date.png" alt="ticket" />
                                </div>
                                <span className="type">date</span>
                                <select className="select-bar">
                                    <option value="11/04/2023">11/04/2023</option>
                                    <option value="10/04/2023">10/04/2023</option>
                                    <option value="09/04/2023">09/04/2023</option>
                                    <option value="08/04/2023">08/04/2023</option>
                                    <option value="07/04/2023">07/04/2023</option>
                                    <option value="06/04/2023">06/04/2023</option>
                                    <option value="05/04/2023">05/04/2023</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="thumb">
                                    <img src="assets/img/ticket/cinema.png" alt="ticket" />
                                </div>
                                <span className="type">movie</span>
                                <select className="select-bar">
                                    <option value="Avatar">Avatar</option>
                                    <option value="Inception">Inception</option>
                                    <option value="Parasite">Parasite</option>
                                    <option value="Joker">Joker</option>
                                    <option value="Searching">Searching</option>
                                    <option value="Coco">Coco</option>
                                    <option value="Lion">Lion</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="thumb">
                                    <img src="assets/img/ticket/experience.png" alt="ticket" />
                                </div>
                                <span className="type">Experience</span>
                                <select className="select-bar">
                                    <option value="2D">2D</option>
                                    <option value="3D">3D</option>
                                    <option value="4D">4D</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="thumb">
                                    <button type="submit" className="filter-btn">
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                <div className="ticket-plan-section padding-bottom padding-top">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12 mb-5 mb-lg-0">
                                {show.length > 0 ? (
                                    <ul className="seat-plan-wrapper">
                                        {show.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="movie-name">
                                                        <div className="icons">
                                                            <i className="fal fa-calendar"></i>
                                                            <i className="fas fa-calendar"></i>
                                                        </div>
                                                        <Link to={`/movie-seat/${item.showCode}`} className="name">
                                                            {format(new Date(item.startDate), "HH:mm:ss dd/MM/yyyy")}
                                                        </Link>
                                                    </div>
                                                    <div className="location-icon">
                                                        <i className="far fa-globe-asia"></i> {item.language}
                                                    </div>
                                                    <div className="movie-schedule">
                                                        {/* <div className="item" onClick={() => handleShowTimeClick(item.showCode, format(new Date(item.startDate), "HH:mm:ss dd/MM/yyyy"))}>
                                                            Buy
                                                        </div> */}
                                                        <div
                                                            className="item"
                                                            onClick={() => {
                                                                handleSelectShow(item.id);
                                                                handleShowTimeClick(item.showCode, format(new Date(item.startDate), "HH:mm:ss dd/MM/yyyy"));
                                                            }}
                                                        >
                                                            Buy
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p>There are currently no shows for this movie. Please come back later.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default MovieTicket;
