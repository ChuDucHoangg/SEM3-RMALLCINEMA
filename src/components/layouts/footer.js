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
                                    <input type="text" placeholder="Your Email Address" />
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
                                <a href="index-1.html">
                                    <img src="assets/img/logo/logo.png" alt="footer" />
                                </a>
                            </div>
                            <ul className="social-icons">
                                <li>
                                    <a href="#!">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="active">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <i className="fab fa-pinterest-p"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <i className="fab fa-google"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <i className="fab fa-instagram"></i>
                                    </a>
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
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                                    </p>
                                </div>
                                <div className="col-lg-3">
                                    <h5 className="footer-middle-title">Important Link</h5>
                                    <div className="footer-middle-link">
                                        <a href="#!">About Us</a>
                                        <a href="#!">Contact</a>
                                        <a href="#!">Faq</a>
                                        <a href="#!">Terms & Conditions</a>
                                        <a href="#!">Privacy Policy</a>
                                        <a href="#!">Help</a>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <h5 className="footer-middle-title">Quick Browse</h5>
                                    <div className="footer-middle-link">
                                        <a href="#!">Support</a>
                                        <a href="#!">Blog</a>
                                        <a href="#!">Movies</a>
                                        <a href="#!">Events</a>
                                        <a href="#!">Sports</a>
                                        <a href="#!">Feedback</a>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <h5 className="footer-middle-title">Download</h5>
                                    <p className="footer-text">There are many variations of passages of Lorem Ipsum</p>
                                    <div className="footer-middle-download">
                                        <a href="#!">
                                            <img src="assets/img/app/app_store.jpg" alt="" />
                                        </a>
                                        <a href="#!">
                                            <img src="assets/img/app/google_play.jpg" alt="" />
                                        </a>
                                        <a href>
                                            <img src="assets/img/app/windows.jpg" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="footer-bottom">
                        <div className="footer-bottom-area">
                            <div className="left">
                                <p>
                                    Copyright © <span id="date"></span>.All Rights Reserved By <a href="#!">R Mall Cinema</a>.
                                </p>
                            </div>
                            <ul className="links">
                                <li>
                                    <a href="#!">About</a>
                                </li>
                                <li>
                                    <a href="#!">Terms Of Use</a>
                                </li>
                                <li>
                                    <a href="#!">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#!">FAQ</a>
                                </li>
                                <li>
                                    <a href="#!">Feedback</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Footer;
