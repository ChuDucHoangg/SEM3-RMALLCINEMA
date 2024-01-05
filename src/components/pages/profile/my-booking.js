import { Helmet } from "react-helmet";
import LayoutProfile from "../../layouts/profile";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../layouts/pagination";

function MyBooking() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [myBooking, setMyBooking] = useState([]);

    const loadOrder = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const orderResponse = await api.get(url.BOOKING.MY_BOOKING, config);
            setMyBooking(orderResponse.data);
        } catch (error) {}
    }, []);

    useEffect(() => {
        loadOrder();
    }, [loadOrder]);

    // Pagination
    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentItemPage = myBooking.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/my-booking?page=${pageNumber}`);
        window.scrollTo({ top: 20, left: 0, behavior: "smooth" });
    };

    return (
        <>
            <Helmet>
                <title>My Order | R Mall</title>
            </Helmet>
            <LayoutProfile>
                <div className="col-12">
                    <h2 className="profile-info__heading">My Order</h2>
                    {currentItemPage.length > 0 ? (
                        currentItemPage.map((item, index) => (
                            <div className="movie-list mb-0" key={index}>
                                <div className="movie-thumb c-thumb">
                                    <Link to={`/my-booking/detail/${item.id}`} className="w-100 h-100">
                                        <img src="assets/img/movie/movie-list-4.jpg" alt="movie" />
                                    </Link>
                                </div>
                                <div className="movie-content bg-one">
                                    <h5 className="title">
                                        <Link to={`/my-booking/detail/${item.id}`}>Doraemon</Link>
                                    </h5>
                                    <ul className="movie-rating-percent">
                                        <li>
                                            <i className="fas fa-barcode-scan"></i>
                                            <span className="content">{item.orderCode}</span>
                                        </li>
                                        <li>
                                            <i className="fas fa-money-check"></i>
                                            <span className="content">{item.paymentMethod}</span>
                                        </li>
                                        <li>
                                            <i className="far fa-coins"></i>
                                            <span className="content">${item.finalTotal}</span>
                                        </li>
                                    </ul>
                                    <div className="book-area">
                                        <div className="book-ticket">
                                            <div className="react-item">
                                                <Link to={`/my-booking/detail/${item.id}`}>
                                                    <div className="thumb">
                                                        <i className="fal fa-ticket"></i>
                                                    </div>
                                                    <span>View Ticket</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="favorite-not">
                            <img src="./assets/img/not-found.png" alt="Not Found" style={{ width: "60%" }} />
                            <p>You don't have any booking history yet.</p>
                            <a className="custom-button back-button" href="/movies">
                                <i className="far fa-reply"></i> Book ticket now
                            </a>
                        </div>
                    )}
                </div>
                <Pagination perPage={itemsPerPage} totalPage={myBooking.length} paginate={paginate} currentPage={currentPage} />
            </LayoutProfile>
        </>
    );
}

export default MyBooking;
