import { useEffect, useState } from "react";
import Layout from "../../layouts/layout";
import Loading from "../../layouts/loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function TermsConditions() {
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
                <title>Terms & Conditions | R Mall Cinema</title>
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
                            <h2 className="title">Terms & Conditions</h2>
                            <ul className="breadcrumb">
                                <li>
                                    <Link to="/"> Home </Link>
                                </li>
                                <li>Terms & Conditions</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="padding-top padding-bottom">
                    <div className="container">
                        <div className="mb-4">
                            <h3 className="mb-4">Ticket Booking Regulations</h3>
                            <p>
                                When you make a booking on our website, you agree to comply with and accept all specific conditions of the event or service. All default ticket bookings are
                                non-refundable, unless otherwise stated by the event organizer. This helps ensure transparency and fairness in the transaction process.
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="mb-2">User Rights and Responsibilities</h3>
                            <ul className="ml-5 mt-4">
                                <li>- Users are responsible for protecting their account information and not sharing their password with anyone else.</li>
                                <li>- Use of the website is subject to laws and regulations relating to online privacy and security.</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="mb-4">Payment and Security</h3>
                            <ul className="ml-5 mt-4">
                                <li>- We are committed to ensuring payment process security and using trusted payment gateways.</li>
                                <li>- All payment information is encrypted to ensure security.</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h3 className="mb-4">User Content and the Power of Change</h3>
                            <p>
                                We are not responsible for the content that users post to the website, however, we reserve the reasonable power to remove or modify it if necessary. This is to ensure
                                that our online environment is a positive and safe place for everyone.
                            </p>
                            <p>
                                We also reserve the right to change and update the Terms and Conditions without prior notice. This highlights the importance of checking regularly so you can stay up to
                                date with changes and adjustments.
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="mb-4">Disputes and Resolution</h3>
                            <p>
                                All disputes will be resolved through mediation or according to the provisions of law. We are committed to creating a transparent and fair dispute resolution process.
                            </p>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default TermsConditions;
