import { useParams } from "react-router-dom";
import Layout from "../../layouts/layout";
import html2canvas from "html2canvas";
import { Helmet } from "react-helmet";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { format } from "date-fns";
import Loading from "../../layouts/loading";
import NotFound from "./not-found";

function ThankYou() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [bookingDetail, setBookingDetail] = useState([]);
    const [error, setError] = useState(null);

    const loadBooking = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const bookingDetailResponse = await api.get(url.BOOKING.DETAIL + `/${id}`, config);
            setBookingDetail(bookingDetailResponse.data);
        } catch (error) {
            setError(true);
        }
    }, [id]);

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

    // Capture and download bill
    const captureAndDownload = () => {
        const billContent = document.getElementById("billContent");

        html2canvas(billContent).then((canvas) => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = "bill.png";
            link.click();
        });
    };

    return (
        <>
            <Helmet>
                <title>Thank You | R Mall Cinema</title>
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
                                <h2 className="title">Thank You</h2>
                           
                                <p className="col-lg-8 text-center mx-auto pt-3">
                                    We confirm that your payment has been successfully processed and tickets have been booked. A detailed confirmation email will be sent to you shortly, including
                                    ticket details.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="movie-facility padding-bottom pt-5">
                        <div className="container">
                            <div className="col-lg-5 mx-auto p-0" id="billContent">
                                <div className="booking-summery bg-one side-shape">
                                    <h4 className="title">
                                        Cinema ticket
                                        <div className="info info-user">
                                            <span>{bookingDetail.userName}</span>
                                            <span className="ml-2">#{bookingDetail.orderCode}</span>
                                        </div>
                                    </h4>
                                    <ul>
                                        <li>
                                            <h6 className="subtitle">Movie</h6>
                                            <div className="info">
                                                <span>{bookingDetail.movieName}</span>
                                            </div>
                                        </li>
                                    </ul>

                                    <ul>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>Tickets</span>
                                                <span>Quantity: {tickets.length}</span>
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
                                        <li>
                                            <h6 className="subtitle">
                                                <span>booking time</span>
                                            </h6>
                                            <span className="info">
                                                <span>{bookingDetail && bookingDetail.createdAt && format(new Date(bookingDetail.createdAt), "HH:mm:ss dd/MM/yyyy")}</span>
                                            </span>
                                        </li>
                                    </ul>

                                    <ul>
                                        <li className="mtb-custom">
                                            <h6 className="subtitle">
                                                <span>Total</span>
                                                <span>${bookingDetail.total}</span>
                                            </h6>
                                        </li>
                                        <li className="mtb-custom">
                                            <h6 className="subtitle">
                                                <span>Tiscount Amount</span>
                                                <span>${bookingDetail.discountAmount}</span>
                                            </h6>
                                        </li>
                                        <li className="mtb-custom">
                                            <h6 className="subtitle">
                                                <span>Tinal Amount</span>
                                                <span>${bookingDetail.finalTotal}</span>
                                            </h6>
                                        </li>
                                    </ul>

                                    <div className="text-center message-bottom">
                                        <p>Thank you for choosing our services. We appreciate your trust in our products.</p>
                                        <p className="text-danger ">NOTE: Please present your bill at the ticket counter.</p>
                                    </div>

                                    <div className="qrcode-wrapper">
                                        <img src={bookingDetail.qrCode} alt="qrcode" className="img-thumbnail" id="qrcode" />
                                        {/* <img src="/assets/img/qrcode.png" alt="qrcode" className="img-thumbnail" /> */}
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex align-item-center justify-content-center">
                                <button className="custom-button btn-download" onClick={captureAndDownload}>
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

export default ThankYou;
