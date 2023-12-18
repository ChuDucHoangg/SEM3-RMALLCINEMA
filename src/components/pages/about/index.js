import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../layouts/layout";
function AboutUs() {
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
                <title>About Us | R Mall Cinema</title>
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
                            <h2 className="title">about us</h2>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li>about us</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="about-section padding-top padding-bottom">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-lg-6">
                                <div className="event-about-content">
                                    <div className="section-header-3 left-style m-0">
                                        <span className="cate">About Us </span>
                                        <h2 className="title">Know More About us</h2>
                                        <p>
                                            There are many variations of passages of Lorem Ipsum available. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                                            embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.
                                        </p>
                                        <p>
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                                            is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making.
                                        </p>
                                        <a href="#!" className="custom-button">
                                            book tickets
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 d-none d-lg-block">
                                <div className="about-thumb">
                                    <img src="assets/img/about/about.jpg" alt="about" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="choose-section padding-top padding-bottom bg-one bg_img bg_quater_img"
                    style={{
                        backgroundImage: "url('assets/img/about/choose.jpg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 offset-lg-3 bg-two">
                                <div className="choose-content">
                                    <div className="section-header-3 left-style">
                                        <span className="cate">Choose</span>
                                        <h2 className="title">Why Choose Us</h2>
                                        <p className="ml-0">
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised
                                            words which don't look even slightly believable.
                                        </p>
                                    </div>
                                    <ul className="choose-list">
                                        <li>
                                            <div className="thumb">
                                                <img src="assets/img/choose/1.png" alt="choose" />
                                            </div>
                                            <h5 className="title">User Friendly Interface</h5>
                                        </li>
                                        <li>
                                            <div className="thumb">
                                                <img src="assets/img/choose/2.png" alt="choose" />
                                            </div>
                                            <h5 className="title">Maintain Your Trust</h5>
                                        </li>
                                        <li>
                                            <div className="thumb">
                                                <img src="assets/img/choose/3.png" alt="choose" />
                                            </div>
                                            <h5 className="title">24/7 Best Support</h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="about-counter-section padding-bottom padding-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="about-counter">
                                    <div className="counter-item">
                                        <div className="counter-thumb">
                                            <i className="fal fa-users"></i>
                                        </div>
                                        <div className="counter-content">
                                            <h3 className="title odometer" data-odometer-final="20">
                                                20
                                            </h3>
                                            <h3 className="title">k+</h3>
                                        </div>
                                        <span className="d-block info">Customers</span>
                                    </div>
                                    <div className="counter-item">
                                        <div className="counter-thumb">
                                            <i className="fal fa-globe"></i>
                                        </div>
                                        <div className="counter-content">
                                            <h3 className="title odometer" data-odometer-final="200">
                                                200
                                            </h3>
                                        </div>
                                        <span className="d-block info">Country</span>
                                    </div>
                                    <div className="counter-item">
                                        <div className="counter-thumb">
                                            <i className="fal fa-city"></i>
                                        </div>
                                        <div className="counter-content">
                                            <h3 className="title odometer" data-odometer-final="10">
                                                10
                                            </h3>
                                            <h className="title">k+</h>
                                        </div>
                                        <span className="d-block info">Area & City</span>
                                    </div>
                                    <div className="counter-item">
                                        <div className="counter-thumb">
                                            <i className="fal fa-wallet"></i>
                                        </div>
                                        <div className="counter-content">
                                            <h3 className="title odometer" data-odometer-final="10">
                                                10
                                            </h3>
                                            <h3 className="title">m+</h3>
                                        </div>
                                        <span className="d-block info">Ticket Sale</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="client-section padding-bottom padding-top bg_img"
                    style={{
                        backgroundImage: "url('assets/img/client/client-bg.jpg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="section-header-3">
                            <span className="cate">testimonials</span>
                            <h2 className="title">What people say about us</h2>
                        </div>
                        <div className="client-slider owl-carousel owl-theme">
                            <div className="client-item">
                                <div className="client-thumb">
                                    <img src="assets/img/client/1.jpg" alt="client" />
                                </div>
                                <div className="client-content">
                                    <h5 className="title">
                                        <a href="#!">Rafuz</a>
                                    </h5>
                                    <blockquote className="client-quote">
                                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is
                                        that it has a more-or-less normal distribution of letters."
                                    </blockquote>
                                </div>
                            </div>
                            <div className="client-item">
                                <div className="client-thumb">
                                    <img src="assets/img/client/2.jpg" alt="client" />
                                </div>
                                <div className="client-content">
                                    <h5 className="title">
                                        <a href="#!">Rudra</a>
                                    </h5>
                                    <blockquote className="client-quote">
                                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is
                                        that it has a more-or-less normal distribution of letters."
                                    </blockquote>
                                </div>
                            </div>
                            <div className="client-item">
                                <div className="client-thumb">
                                    <img src="assets/img/client/3.jpg" alt="client" />
                                </div>
                                <div className="client-content">
                                    <h5 className="title">
                                        <a href="#!">Raihan</a>
                                    </h5>
                                    <blockquote className="client-quote">
                                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is
                                        that it has a more-or-less normal distribution of letters."
                                    </blockquote>
                                </div>
                            </div>
                            <div className="client-item">
                                <div className="client-thumb">
                                    <img src="assets/img/client/4.jpg" alt="client" />
                                </div>
                                <div className="client-content">
                                    <h5 className="title">
                                        <a href="#!">Shahidul</a>
                                    </h5>
                                    <blockquote className="client-quote">
                                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is
                                        that it has a more-or-less normal distribution of letters."
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="speaker-section padding-bottom padding-top">
                    <div className="container">
                        <div className="section-header-3">
                            <span className="cate">team</span>
                            <h2 className="title">best team members</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        </div>
                        <div className="speaker--slider">
                            <div className="speaker-slider owl-carousel owl-theme">
                                <div className="speaker-item">
                                    <div className="speaker-thumb">
                                        <a href="event-speaker.html">
                                            <img src="assets/img/speaker/1.jpg" alt="speaker" />
                                        </a>
                                    </div>
                                    <div className="speaker-content">
                                        <h5 className="title">
                                            <a href="event-speaker.html">Peggy Wetzel</a>
                                        </h5>
                                        <span>CEO & CO-FOUNDER</span>
                                        <div className="speaker-social">
                                            <a href="#!">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="speaker-item">
                                    <div className="speaker-thumb">
                                        <a href="event-speaker.html">
                                            <img src="assets/img/speaker/2.jpg" alt="speaker" />
                                        </a>
                                    </div>
                                    <div className="speaker-content">
                                        <h5 className="title">
                                            <a href="event-speaker.html">Nicole Belisle</a>
                                        </h5>
                                        <span>CEO & CO-FOUNDER</span>
                                        <div className="speaker-social">
                                            <a href="#!">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="speaker-item">
                                    <div className="speaker-thumb">
                                        <a href="event-speaker.html">
                                            <img src="assets/img/speaker/3.jpg" alt="speaker" />
                                        </a>
                                    </div>
                                    <div className="speaker-content">
                                        <h5 className="title">
                                            <a href="event-speaker.html">Sharon Lewis</a>
                                        </h5>
                                        <span>CEO & CO-FOUNDER</span>
                                        <div className="speaker-social">
                                            <a href="#!">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="speaker-item">
                                    <div className="speaker-thumb">
                                        <a href="event-speaker.html">
                                            <img src="assets/img/speaker/4.jpg" alt="speaker" />
                                        </a>
                                    </div>
                                    <div className="speaker-content">
                                        <h5 className="title">
                                            <a href="event-speaker.html">Frank Johnson</a>
                                        </h5>
                                        <span>CEO & CO-FOUNDER</span>
                                        <div className="speaker-social">
                                            <a href="#!">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                            <a href="#!">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="speaker-prev">
                                <i className="fal fa-long-arrow-alt-right"></i>
                            </div>
                            <div className="speaker-next">
                                <i className="fal fa-long-arrow-alt-right"></i>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="gallery-section padding-bottom">
                    <div className="container">
                        <div className="section-header-3">
                            <span className="cate">Gallery</span>
                            <h2 className="title">Photo Gallery</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        </div>
                        <div className="row justify-content-center gallery-wrapper mb-30-none">
                            <div className="col-lg-3 col-sm-6">
                                <div className="gallery-item two">
                                    <div className="gallery-thumb">
                                        <a href="assets/img/gallery/5.jpg" className="img-pop">
                                            <i className="fal fa-compress"></i>
                                        </a>
                                        <img src="assets/img/gallery/5.jpg" alt="gallery" />
                                    </div>
                                </div>
                                <div className="gallery-item two">
                                    <div className="gallery-thumb">
                                        <a href="assets/img/gallery/6.jpg" className="img-pop">
                                            <i className="fal fa-compress"></i>
                                        </a>
                                        <img src="assets/img/gallery/6.jpg" alt="gallery" />
                                    </div>
                                </div>
                                <div className="gallery-item two">
                                    <div className="gallery-thumb">
                                        <a href="assets/img/gallery/7.jpg" className="img-pop">
                                            <i className="fal fa-compress"></i>
                                        </a>
                                        <img src="assets/img/gallery/7.jpg" alt="gallery" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3 order-lg-1">
                                <div className="gallery-item two">
                                    <div className="gallery-thumb">
                                        <a href="assets/img/gallery/11.jpg" className="img-pop">
                                            <i className="fal fa-compress"></i>
                                        </a>
                                        <img src="assets/img/gallery/11.jpg" alt="gallery" />
                                    </div>
                                </div>
                                <div className="gallery-item two">
                                    <div className="gallery-thumb">
                                        <a href="assets/img/gallery/12.jpg" className="img-pop">
                                            <i className="fal fa-compress"></i>
                                        </a>
                                        <img src="assets/img/gallery/12.jpg" alt="gallery" />
                                    </div>
                                </div>
                                <div className="gallery-item two">
                                    <div className="gallery-thumb">
                                        <a href="assets/img/gallery/13.jpg" className="img-pop">
                                            <i className="fal fa-compress"></i>
                                        </a>
                                        <img src="assets/img/gallery/13.jpg" alt="gallery" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="gallery-item two">
                                            <div className="gallery-thumb">
                                                <a href="assets/img/gallery/9.jpg" className="img-pop">
                                                    <i className="fal fa-compress"></i>
                                                </a>
                                                <img src="assets/img/gallery/9.jpg" alt="gallery" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="gallery-item two">
                                            <div className="gallery-thumb">
                                                <a href="assets/img/gallery/10.jpg" className="img-pop">
                                                    <i className="fal fa-compress"></i>
                                                </a>
                                                <img src="assets/img/gallery/10.jpg" alt="gallery" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-item two">
                                    <div className="gallery-thumb">
                                        <a href="assets/img/gallery/8.jpg" className="img-pop">
                                            <i className="fal fa-compress"></i>
                                        </a>
                                        <img src="assets/img/gallery/8.jpg" alt="gallery" />
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
export default AboutUs;
