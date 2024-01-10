import { Link } from "react-router-dom";
import Layout from "../../layouts/layout";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Loading from "../../layouts/loading";
function FAQ() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            <Helmet>
                <title>FAQ | R Mall Cinema</title>
            </Helmet>

            {loading ? <Loading /> : ""}

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
                            <h2 className="title">faq</h2>
                            <ul className="breadcrumb">
                                <li>
                                    <Link to="/"> Home </Link>
                                </li>
                                <li>faq</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="faq-section padding-top">
                    <div className="container">
                        <div className="section-header-3">
                            <span className="cate">NEED ANY HELP?</span>
                            <h2 className="title">Frequently Asked Questions</h2>
                            <p>
                                Welcome to our FAQ corner! Below are some frequently asked questions you may need to know for a smoother ticket purchasing experience. If you don't find the answer to
                                your question, please contact us via our Contact page.
                            </p>
                        </div>
                        <div className="faq-area padding-bottom">
                            <div className="faq-wrapper">
                                <div className="faq-item open">
                                    <div className="faq-title">
                                        <h6 className="title">How to buy tickets on your website?</h6>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content" style={{ display: "block" }}>
                                        <p>To buy tickets, simply visit our movie page, select your favorite movie and follow the instructions on the ticket booking page.</p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h6 className="title">How can I pay?</h6>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>We accept payment by credit/debit card and some other popular online payment methods. Make sure you choose the method that is most convenient for you.</p>
                                    </div>
                                </div>
                                <div className="faq-item active">
                                    <div className="faq-title">
                                        <h6 className="title">How to receive tickets after purchasing?</h6>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content" style={{ display: "none" }}>
                                        <p>
                                            After successful payment, your tickets will be sent via email provided during the booking process. You can also download tickets directly from your account
                                            on the website.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h6 className="title">I lost my ticket. How to get it back?</h6>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>If you lose your ticket, please contact us as soon as possible. We will check and reissue your tickets according to the verification process.</p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h6 className="title">How do I make sure my booking is successful?</h6>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Once you have completed your payment, you will receive an email confirming your booking with movie ticket details. If you do not receive the email, please
                                            check the My Reservations page in your account again. you or contact us.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h6 className="title">Can I apply an offer or discount code when booking tickets?</h6>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            You can apply your offer or discount code during the checkout process. Be sure to enter the code in the appropriate box before completing the transaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default FAQ;
