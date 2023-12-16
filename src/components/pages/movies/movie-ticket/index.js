import Loading from "../../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import { NavLink } from "react-router-dom";
function Movie_Ticket() {
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
                <title>Ticket | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section className="window-warning inActive">
                    <div className="lay"></div>
                    <div className="warning-item">
                        <h6 className="subtitle">Show Time : 07:40</h6>
                        <h4 className="title">Book Your Seats</h4>
                        <div className="thumb">
                            <img src="assets/img/movie/tt.png" alt="movie" />
                        </div>
                        <NavLink to="/movie-seat" className="custom-button seatPlanButton">
                            Show Seat Plans<i className="fal fa-long-arrow-alt-right"></i>
                        </NavLink>
                    </div>
                </section>

                <section
                    className="details-banner hero-area"
                    style={{
                        backgroundImage: "url('assets/img/banner/banner-movie-details.jpg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="details-banner-wrapper">
                            <div className="details-banner-content">
                                <h3 className="title">Irregular</h3>
                                <div className="tags">
                                    <a href="#">English</a>
                                    <a href="#">France</a>
                                    <a href="#">Germany</a>
                                    <a href="#">Italy</a>
                                </div>
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
                                <ul className="seat-plan-wrapper">
                                    <li>
                                        <div className="movie-name">
                                            <div className="icons">
                                                <i className="far fa-heart"></i>
                                                <i className="fas fa-heart"></i>
                                            </div>
                                            <a href="#" className="name">
                                                Cine World
                                            </a>
                                        </div>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt"></i> London
                                        </div>
                                        <div className="movie-schedule">
                                            <div className="item">07:40</div>
                                            <div className="item">09:40</div>
                                            <div className="item active">11:40</div>
                                            <div className="item">13:40</div>
                                            <div className="item">15:50</div>
                                            <div className="item">19:50</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="movie-name">
                                            <div className="icons">
                                                <i className="far fa-heart"></i>
                                                <i className="fas fa-heart"></i>
                                            </div>
                                            <a href="#" className="name">
                                                Cine Mark
                                            </a>
                                        </div>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt"></i> Germany
                                        </div>
                                        <div className="movie-schedule">
                                            <div className="item">07:40</div>
                                            <div className="item">09:40</div>
                                            <div className="item active">11:40</div>
                                            <div className="item">13:40</div>
                                            <div className="item">15:50</div>
                                            <div className="item">19:50</div>
                                        </div>
                                    </li>
                                    <li className="active">
                                        <div className="movie-name">
                                            <div className="icons">
                                                <i className="far fa-heart"></i>
                                                <i className="fas fa-heart"></i>
                                            </div>
                                            <a href="#" className="name">
                                                Wanda Cinemas
                                            </a>
                                        </div>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt"></i> France
                                        </div>
                                        <div className="movie-schedule">
                                            <div className="item">07:40</div>
                                            <div className="item">09:40</div>
                                            <div className="item active">11:40</div>
                                            <div className="item">13:40</div>
                                            <div className="item">15:50</div>
                                            <div className="item">19:50</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="movie-name">
                                            <div className="icons">
                                                <i className="far fa-heart"></i>
                                                <i className="fas fa-heart"></i>
                                            </div>
                                            <a href="#" className="name">
                                                box park
                                            </a>
                                        </div>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt"></i> New York
                                        </div>
                                        <div className="movie-schedule">
                                            <div className="item">07:40</div>
                                            <div className="item">09:40</div>
                                            <div className="item active">11:40</div>
                                            <div className="item">13:40</div>
                                            <div className="item">15:50</div>
                                            <div className="item">19:50</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="movie-name">
                                            <div className="icons">
                                                <i className="far fa-heart"></i>
                                                <i className="fas fa-heart"></i>
                                            </div>
                                            <a href="#" className="name">
                                                Cineplex Entertainment
                                            </a>
                                        </div>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt"></i> Texas
                                        </div>
                                        <div className="movie-schedule">
                                            <div className="item">07:40</div>
                                            <div className="item">09:40</div>
                                            <div className="item active">11:40</div>
                                            <div className="item">13:40</div>
                                            <div className="item">15:50</div>
                                            <div className="item">19:50</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="movie-name">
                                            <div className="icons">
                                                <i className="far fa-heart"></i>
                                                <i className="fas fa-heart"></i>
                                            </div>
                                            <a href="#" className="name">
                                                Siverbird
                                            </a>
                                        </div>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt"></i> Nevada
                                        </div>
                                        <div className="movie-schedule">
                                            <div className="item">07:40</div>
                                            <div className="item">09:40</div>
                                            <div className="item active">11:40</div>
                                            <div className="item">13:40</div>
                                            <div className="item">15:50</div>
                                            <div className="item">19:50</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default Movie_Ticket;
