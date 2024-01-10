import Loading from "../../../layouts/loading";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { Link, useParams } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { format, addDays, isBefore, subMinutes } from "date-fns";
import { useMovieContext } from "../../../../context/MovieContext";
import Select from "react-select";

function MovieTicket() {
    const { id } = useParams();
    const { movieData, updateSelectShow } = useMovieContext();
    const { movieDetails } = movieData;
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState([]);
    const [language, setLanguage] = useState([]);

    const [dateOptions, setDateOptions] = useState([]);

    const [windowWarning, setWindowWarning] = useState(false);
    const [selectedShowCode, setSelectedShowCode] = useState(null);
    const [selectedShowStartTime, setSelectedShowStartTime] = useState(null);
    const currentDateTime = new Date();

    const handleShowTimeClick = (showCode, startTime) => {
        setWindowWarning(!windowWarning);
        setSelectedShowCode(showCode);
        setSelectedShowStartTime(startTime);
    };

    const loadShow = useCallback(
        async (from, language) => {
            try {
                let apiUrl = `${url.SHOW.BY_MOVIE}/${id}`;
                if (from) {
                    apiUrl += `?from=${from}`;
                }
                if (language) {
                    apiUrl += `${from ? "&" : "?"}language=${language}`;
                }

                const showResponse = await api.get(apiUrl);
                const languageResponse = await api.get(url.LANGUAGE.LIST);

                setShow(showResponse.data);
                setLanguage(languageResponse.data);
            } catch (error) {}
        },
        [id]
    );

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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const from = event.target.elements.from.value;
        const language = event.target.elements.language.value;

        if (from || language) {
            loadShow(from, language);
        }
    };

    // Get the current date
    useEffect(() => {
        const currentDate = new Date();

        //
        const newOptions = Array.from({ length: 6 }, (_, index) => {
            const date = addDays(currentDate, index);
            return {
                value: format(date, "yyyy-MM-dd"),
                label: format(date, "dd/MM/yyyy"),
            };
        });

        setDateOptions(newOptions);
    }, []);

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            background: "transparent",
            minWidth: "180px",
            border: "none",
            height: "45px",
            boxShadow: state.isFocused ? "none" : provided.boxShadow,
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            display: "none",
        }),
        input: (provided, state) => ({
            ...provided,
            margin: "0",
            padding: "0",
            fontWeight: "400",
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: "0 8px",
            color: "#fff",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "#fff",
        }),
        menu: (provided, state) => ({
            ...provided,
            background: "#001232",
            color: "#fff",
            fontWeight: "400",
            boxShadow: "0px 0 20px 0 rgba(0, 0, 0, 0.5)",
        }),
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
                        <form className="ticket-search-form two" onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <div className="thumb">
                                    <img src="assets/img/ticket/date.png" alt="ticket" />
                                </div>
                                <span className="type">date</span>

                                <Select name="from" placeholder="Select date" options={dateOptions} isSearchable={false} styles={customSelectStyles} />
                            </div>

                            <div className="form-group">
                                <div className="thumb">
                                    <img src="assets/img/ticket/cinema.png" alt="ticket" />
                                </div>
                                <span className="type">language</span>

                                <Select
                                    name="language"
                                    placeholder="Select language"
                                    options={language.map((item, index) => ({
                                        value: item.name,
                                        label: item.name,
                                    }))}
                                    isSearchable={false}
                                    styles={customSelectStyles}
                                />
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
                            {/* <div className="col-lg-12 mb-5 mb-lg-0">
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
                                                        <div
                                                            className="item"
                                                            onClick={() => {
                                                                handleSelectShow(item.id);
                                                                handleShowTimeClick(item.showCode, format(new Date(item.startDate), "HH:mm:ss dd/MM/yyyy"));
                                                            }}
                                                        >
                                                            Book
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p>There are currently no shows for this movie. Please come back later.</p>
                                )}
                            </div> */}
                            <div className="col-lg-12 mb-5 mb-lg-0">
                                {show.length > 0 ? (
                                    <ul className="seat-plan-wrapper">
                                        {show.map((item, index) => {
                                            const showStartDate = new Date(item.startDate);

                                            // Kiểm tra nếu showStartDate là trước 30 phút so với thời điểm hiện tại
                                            const isShowClosed = isBefore(currentDateTime, subMinutes(showStartDate, 30));

                                            return (
                                                <li key={index}>
                                                    {isShowClosed ? (
                                                        <div className="movie-name">
                                                            <div className="icons">
                                                                <i className="fal fa-calendar"></i>
                                                                <i className="fas fa-calendar"></i>
                                                            </div>
                                                            <Link to={`/movie-seat/${item.showCode}`} className="name">
                                                                {format(showStartDate, "HH:mm:ss dd/MM/yyyy")}
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                        <div className="movie-name">
                                                            <div className="icons">
                                                                <i className="fal fa-calendar"></i>
                                                            </div>
                                                            <p className="name">{format(showStartDate, "HH:mm:ss dd/MM/yyyy")}</p>
                                                        </div>
                                                    )}
                                                    <div className="location-icon">
                                                        <i className="far fa-globe-asia"></i> {item.language}
                                                    </div>
                                                    <div className="movie-schedule">
                                                        {isShowClosed ? (
                                                            <div
                                                                className="item"
                                                                onClick={() => {
                                                                    handleSelectShow(item.id);
                                                                    handleShowTimeClick(item.showCode, format(showStartDate, "HH:mm:ss dd/MM/yyyy"));
                                                                }}
                                                            >
                                                                Book
                                                            </div>
                                                        ) : (
                                                            <div>Show has closed</div>
                                                        )}
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
