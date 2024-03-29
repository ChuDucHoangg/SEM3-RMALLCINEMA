import { NavLink } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";

function Header() {
    return (
        <>
            <header className="header-section">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <NavLink to="/">
                                <img src="assets/img/logo/logo.png" alt="logo" />
                            </NavLink>
                        </div>
                        <ul className="menu">
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/movies">movies</NavLink>
                            </li>
                            {/* <li>
                                <a href="#!">pages</a>
                                <ul className="submenu">
                                    <li>
                                        <NavLink to="/about-us">
                                            <i className="fal fa-long-arrow-alt-right"></i>About Us
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/contact-us">
                                            <i className="fal fa-long-arrow-alt-right"></i>Contact Us
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}

                            <li>
                                <NavLink to="/promotion">Promotion</NavLink>
                            </li>
                            <li>
                                <NavLink to="/faq">Utilities</NavLink>
                                <ul className="submenu">
                                    <li>
                                        <NavLink to="/faq">
                                            <i className="fal fa-long-arrow-alt-right"></i>FAQ
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/terms-conditions">
                                            <i className="fal fa-long-arrow-alt-right"></i>Terms & Conditions
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            {isLoggedIn() ? (
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                            ) : (
                                <li className="header-button pr-0">
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            )}
                        </ul>
                        <div className="header-bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
export default Header;
