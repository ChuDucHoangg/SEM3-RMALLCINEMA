import { Link, useParams } from "react-router-dom";
import Layout from "../../layouts/layout";
import { Helmet } from "react-helmet";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { format } from "date-fns";
import Loading from "../../layouts/loading";
import NotFound from "../../pages/other/not-found";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";

function BookingDetail() {
    const { orderCode } = useParams();
    const [bookingDetail, setBookingDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadBooking = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const bookingDetailResponse = await api.get(url.BOOKING.DETAIL + `/${orderCode}`, config);
            setBookingDetail(bookingDetailResponse.data);
        } catch (error) {
            setError(true);
        }
    }, [orderCode]);

    useEffect(() => {
        setLoading(true);

        loadBooking();

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loadBooking]);

    // Map ticket & food from API
    const tickets = bookingDetail.tickets || [];
    const foods = bookingDetail.foods || [];

    const handleDownloadBill = () => {
        const billContent = document.getElementById("billContent");

        domtoimage
            .toBlob(billContent)
            .then((blob) => {
                saveAs(blob, "bill.png");
            })
            .catch((error) => {
                console.error("Error capturing screenshot:", error);
            });
    };
    return (
        <>
            <Helmet>
                <title>Booking Detail | R Mall Cinema</title>
            </Helmet>

            {loading ? <Loading /> : ""}
            {error ? (
                <NotFound />
            ) : (
                <Layout>
                    <section
                        className="main-page-header speaker-banner"
                        style={{
                            backgroundImage: "url('assets/img/banner/banner-2.jpg')",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="container">
                            <div className="speaker-banner-content">
                                <h2 className="title">{bookingDetail.movieName}</h2>
                                <ul className="breadcrumb">
                                    <li>
                                        <Link to="/my-booking">Booking</Link>
                                    </li>
                                    <li>Booking Detail</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="movie-facility padding-bottom pt-5">
                        <div className="container">
                            <div className="col-lg-5 mx-auto p-0">
                                <div className="booking-summery bg-one side-shape col-12" id="billContent">
                                    <h4 className="title">
                                        Cinema ticket
                                        <div className="info info-user">
                                            <span>{bookingDetail.userName}</span>
                                            <span className="ml-2">#{bookingDetail.orderCode}</span>
                                        </div>
                                    </h4>
                                    <ul>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>Movie</span>
                                                <span>Room</span>
                                            </h6>
                                            <div className="info">
                                                <span>{bookingDetail.movieName}</span>
                                                <span>{bookingDetail.roomName}</span>
                                            </div>
                                        </li>
                                    </ul>

                                    <ul>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>Tickets</span>
                                                <span>Quantity:{tickets.length}</span>
                                            </h6>
                                            {tickets.map((ticket) => {
                                                return (
                                                    <div className="info" key={ticket.id}>
                                                        <span>Seat: {ticket.seatName}</span>
                                                        <span>${ticket.price}</span>
                                                    </div>
                                                );
                                            })}
                                        </li>
                                    </ul>

                                    {foods.length > 0 ? (
                                        <ul>
                                            <li>
                                                <h6 className="subtitle">
                                                    <span>food & drinks</span>
                                                </h6>

                                                {foods.map((food) => {
                                                    return (
                                                        <div className="info" key={food.id}>
                                                            <span>
                                                                {food.foodName} x{food.quantity}
                                                            </span>
                                                            <span>${food.price}</span>
                                                        </div>
                                                    );
                                                })}
                                            </li>
                                        </ul>
                                    ) : null}

                                    <ul>
                                        <li className="mtb-custom">
                                            <h6 className="subtitle">
                                                <span>booking time</span>
                                                <span>Start date</span>
                                            </h6>
                                            <span className="info">
                                                <span>{bookingDetail && bookingDetail.createdAt && format(new Date(bookingDetail.createdAt), "HH:mm:ss dd/MM/yyyy")}</span>
                                                <span>{bookingDetail && bookingDetail.startDate && format(new Date(bookingDetail.startDate), "HH:mm:ss dd/MM/yyyy")}</span>
                                            </span>
                                        </li>
                                    </ul>

                                    <ul>
                                        <li className="mtb-custom">
                                            <h6 className="subtitle">
                                                <span>SUB TOTAL</span>
                                                <span>${bookingDetail.total}</span>
                                            </h6>
                                        </li>
                                        <li className="mtb-custom">
                                            <h6 className="subtitle">
                                                <span>DISCOUNT AMOUNT</span>
                                                <span>${bookingDetail.discountAmount}</span>
                                            </h6>
                                        </li>
                                        <li className="mtb-custom">
                                            <h6 className="subtitle">
                                                <span>FINAL AMOUNT</span>
                                                <span>${bookingDetail.finalTotal}</span>
                                            </h6>
                                        </li>
                                    </ul>

                                    <div className="text-center message-bottom">
                                        <p>Thank you for choosing our services. We appreciate your trust in our products.</p>
                                        <p className="text-danger ">NOTE: Please present your bill at the ticket counter.</p>
                                    </div>

                                    <div className="qrcode-wrapper">
                                        <img src={bookingDetail.qrCode} alt="qrcode" className="img-thumbnail" />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex align-item-center justify-content-center">
                                <button className="custom-button btn-download" onClick={handleDownloadBill}>
                                    <i className="fal fa-receipt"></i> Download Bill
                                </button>
                            </div>
                        </div>
                    </section>
                </Layout>
            )}
        </>
    );
}

export default BookingDetail;
