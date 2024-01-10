import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="footer-section">
                <div className="newsletter-section">
                    <div className="container">
                        <div className="newsletter-container">
                            <div className="newsletter-wrapper">
                                <h5 className="cate">subscribe now</h5>
                                <h3 className="title">to get latest update</h3>
                                <form className="newsletter-form">
                                    <input type="text" placeholder="Your Email Address" required />
                                    <button type="submit">subscribe</button>
                                </form>
                                <p>We send you latest update and news to your email</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-section-box">
                    <div className="container">
                        <div className="footer-top">
                            <div className="logo">
                                <Link to="/">
                                    <img src="assets/img/logo/logo.png" alt="footer" />
                                </Link>
                            </div>
                            <ul className="social-icons">
                                <li>
                                    <Link to="">
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" className="active">
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <i className="fab fa-pinterest-p"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <i className="fab fa-google"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <i className="fab fa-instagram"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        <div className="footer-middle">
                            <div className="row">
                                <div className="col-lg-3">
                                    <h5 className="footer-middle-title">Company</h5>
                                    <p className="pb-4 footer-text">
                                        Suburban elegance at its best. 250,000 sq ft, 4 storeys, 700 ft frontage, and seamless parking in our 7-level facility. Welcome to R Mall.
                                    </p>
                                </div>
                                <div className="col-lg-3">
                                    <h5 className="footer-middle-title">Important Link</h5>
                                    <div className="footer-middle-link">
                                        <Link to="/login">Login</Link>
                                        <Link to="/register">Register</Link>
                                        <Link to="/faq">Faq</Link>
                                        <Link to="/terms-conditions">Terms & Conditions</Link>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <h5 className="footer-middle-title">Quick Browse</h5>
                                    <div className="footer-middle-link">
                                        <Link to="/movies">Movies</Link>
                                        <Link to="/promotion">Promotion</Link>
                                        <Link to="/profile">Profile</Link>
                                        <Link to="">Support</Link>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <h5 className="footer-middle-title">Download</h5>
                                    <div className="footer-middle-download">
                                        <Link to="">
                                            <img src="assets/img/app/app_store.jpg" alt="" />
                                        </Link>
                                        <Link to="">
                                            <img src="assets/img/app/google_play.jpg" alt="" />
                                        </Link>
                                        <Link to="">
                                            <img src="assets/img/app/windows.jpg" alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="footer-bottom">
                        <div className="footer-bottom-area">
                            <div className="left mx-auto">
                                <p>
                                    Copyright © <span id="date"></span>.All Rights Reserved By <Link to="">R Mall Cinema</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Footer;
