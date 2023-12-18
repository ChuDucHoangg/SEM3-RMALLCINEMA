import { NavLink } from "react-router-dom";

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
                                <NavLink to="/movie-list">movies</NavLink>
                                <ul className="submenu">
                                    <li>
                                        <NavLink to="/movie-list">
                                            <i className="fal fa-long-arrow-alt-right"></i>Movie List
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/movie-ticket">
                                            <i className="fal fa-long-arrow-alt-right"></i>Movie Ticket Plan
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
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
                            </li>
                            <li>
                                <NavLink to="/blog-list">blog</NavLink>
                            </li>
                            <li className="header-button pr-0">
                                <NavLink to="/login">login</NavLink>
                            </li>
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
