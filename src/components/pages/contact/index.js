import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../layouts/layout";
function Contact() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);
    useEffect(() => {
        const $ = window.$;
        $(document).ready(function () {
            $(".counter-item").each(function () {
                $(this).isInViewport(function (status) {
                    if (status === "entered") {
                        for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
                            var el = document.querySelectorAll(".odometer")[i];
                            el.innerHTML = el.getAttribute("data-odometer-final");
                        }
                    }
                });
            });
            $(".social-icons li a").on("mouseover", function (e) {
                var social = $(this).parent("li");
                if (social.children("a").hasclassName("active")) {
                    social.siblings("li").children("a").removeclassName("active");
                    $(this).addclassName("active");
                } else {
                    social.siblings("li").children("a").removeclassName("active");
                    $(this).addclassName("active");
                }
            });
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>Contact Us | R Ticket</title>
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
                            <h2 className="title">contact us</h2>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li>contact us</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="contact-section padding-top">
                    <div className="contact-container">
                        <div
                            className="bg-thumb"
                            style={{
                                backgroundImage: "url('assets/img/contact/contact.jpg')",
                                backgroundSize: "cover",
                            }}
                        ></div>
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-7 col-lg-6 col-xl-5">
                                    <div className="section-header-3 left-style">
                                        <span className="cate">contact us</span>
                                        <h2 className="title">get in touch</h2>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking.</p>
                                    </div>
                                    <form method="post" action="https://themes.themewild.com/ticket/assets/php/contact.php" id="contact-form" className="contact-form">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Name <span>*</span>
                                            </label>
                                            <input type="text" placeholder="Enter Your Name" name="name" id="name" required autoFocus />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">
                                                Email <span>*</span>
                                            </label>
                                            <input type="text" placeholder="Enter Your Email" name="email" id="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject">
                                                Subject <span>*</span>
                                            </label>
                                            <input type="text" placeholder="Enter Your Subject" name="subject" id="subject" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">
                                                Message <span>*</span>
                                            </label>
                                            <textarea name="message" id="message" placeholder="Enter Your Message" required></textarea>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Send Your Message" />
                                        </div>
                                        <div className="col-md-12 my-2">
                                            <div className="form-messege text-success text-center"></div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-5 col-lg-6">
                                    <div className="padding-top padding-bottom contact-info">
                                        <div className="info-area">
                                            <div className="info-item">
                                                <div className="info-thumb">
                                                    <img src="assets/img/contact/phone.png" alt="contact" />
                                                </div>
                                                <div className="info-content">
                                                    <h6 className="title">phone</h6>
                                                    <a href="Tel:123 456 65478">+1 123 456 65478</a>
                                                </div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-thumb">
                                                    <img src="assets/img/contact/email.png" alt="contact" />
                                                </div>
                                                <div className="info-content">
                                                    <h6 className="title">Email</h6>
                                                    <a href="Mailto:example@domain.com">
                                                        <span className="__cf_email__" data-cfemail="0e6b766f637e626b4e6a61636f6760206d6163">
                                                            [email&#160;protected]
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contact-counter padding-top padding-bottom">
                    <div className="container">
                        <div className="row justify-content-center mb-30-none">
                            <div className="col-sm-6 col-md-3">
                                <div className="contact-counter-item">
                                    <div className="contact-counter-thumb">
                                        <i className="fab fa-facebook-f"></i>
                                    </div>
                                    <div className="contact-counter-content">
                                        <div className="counter-item">
                                            <h5 className="title odometer" data-odometer-final="150">
                                                0
                                            </h5>
                                            <h5 className="title">k</h5>
                                        </div>
                                        <p>Followers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <div className="contact-counter-item">
                                    <div className="contact-counter-thumb">
                                        <i className="fab fa-twitter"></i>
                                    </div>
                                    <div className="contact-counter-content">
                                        <div className="counter-item">
                                            <h5 className="title odometer" data-odometer-final="60">
                                                0
                                            </h5>
                                            <h5 className="title">k</h5>
                                        </div>
                                        <p>Followers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <div className="contact-counter-item">
                                    <div className="contact-counter-thumb">
                                        <i className="far fa-users"></i>
                                    </div>
                                    <div className="contact-counter-content">
                                        <div className="counter-item">
                                            <h5 className="title odometer" data-odometer-final="45">
                                                0
                                            </h5>
                                            <h5 className="title">k</h5>
                                        </div>
                                        <p>Members</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <div className="contact-counter-item">
                                    <div className="contact-counter-thumb">
                                        <i className="far fa-envelope"></i>
                                    </div>
                                    <div className="contact-counter-content">
                                        <div className="counter-item">
                                            <h5 className="title odometer" data-odometer-final="350">
                                                0
                                            </h5>
                                            <h5 className="title">k</h5>
                                        </div>
                                        <p>Subscribers</p>
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
export default Contact;
