import { useEffect, useState } from "react";
import Layout from "./layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeAccessToken } from "../../utils/auth";

function LayoutProfile({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeLink, setActiveLink] = useState("");

    // Effect to run when the component mounts or when the location changes
    useEffect(() => {
        // Extract the activeLink from the current pathname
        const pathname = location.pathname;
        const activeLinkFromPath = pathname.split("/").pop();
        // Set the activeLink state with the value from the path
        setActiveLink(activeLinkFromPath || "personalInfo");
    }, [location.pathname]); // Run the effect when the location changes

    // Function to update the active link
    const handleSetActiveLink = (link) => {
        setActiveLink(link);
    };

    const handleLogout = () => {
        removeAccessToken();
        navigate("/login");
    };

    return (
        <>
            <Layout>
                <section className="movie-facility padding-bottom padding-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12">
                                <div className="checkout-contact">
                                    <div className="profile__sidebar">
                                        <div className="profile-menu">
                                            <h3 className="profile-menu__title">Manage Account</h3>
                                            <ul className="profile-menu__list">
                                                <li>
                                                    <Link to="/profile" className={`profile-menu__link ${activeLink === "profile" ? "active" : ""}`} onClick={() => handleSetActiveLink("profile")}>
                                                        <span className="profile-menu__icon">
                                                            <img src="./assets/icons/profile.svg" alt="" className="icon" />
                                                        </span>
                                                        Personal info
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/my-booking"
                                                        className={`profile-menu__link ${activeLink === "my-booking" ? "active" : ""}`}
                                                        onClick={() => handleSetActiveLink("my-booking")}
                                                    >
                                                        <span className="profile-menu__icon">
                                                            <img src="./assets/icons/ticket.svg" alt="" className="icon" />
                                                        </span>
                                                        My booking
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="profile-menu">
                                            <h3 className="profile-menu__title">My items</h3>
                                            <ul className="profile-menu__list">
                                                <li>
                                                    <Link to="/favorite" className={`profile-menu__link ${activeLink === "favorite" ? "active" : ""}`} onClick={() => handleSetActiveLink("favorite")}>
                                                        <span className="profile-menu__icon">
                                                            <img src="./assets/icons/heart.svg" alt="" className="icon" />
                                                        </span>
                                                        Favorite
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="profile-menu">
                                            <h3 className="profile-menu__title">Customer Service</h3>
                                            <ul className="profile-menu__list">
                                                <li>
                                                    <Link to="/help" className={`profile-menu__link ${activeLink === "help" ? "active" : ""}`} onClick={() => handleSetActiveLink("help")}>
                                                        <span className="profile-menu__icon">
                                                            <img src="./assets/icons/info.svg" alt="" className="icon" />
                                                        </span>
                                                        Help
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/terms-of-use"
                                                        className={`profile-menu__link ${activeLink === "terms-of-use" ? "active" : ""}`}
                                                        onClick={() => handleSetActiveLink("terms-of-use")}
                                                    >
                                                        <span className="profile-menu__icon">
                                                            <img src="./assets/icons/danger.svg" alt="" className="icon" />
                                                        </span>
                                                        Terms of Use
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="profile-menu">
                                            <h3 className="profile-menu__title">Account</h3>
                                            <ul className="profile-menu__list">
                                                <li>
                                                    <Link
                                                        to="/change-password"
                                                        className={`profile-menu__link ${activeLink === "change-password" ? "active" : ""}`}
                                                        onClick={() => handleSetActiveLink("change-password")}
                                                    >
                                                        <span className="profile-menu__icon">
                                                            <img src="./assets/icons/lock.svg" alt="" className="icon" />
                                                        </span>
                                                        Change password
                                                    </Link>
                                                </li>
                                                <li>
                                                    <p className="profile-menu__link" onClick={handleLogout} style={{ marginTop: "5px", cursor: "pointer" }}>
                                                        <span className="profile-menu__icon">
                                                            <img src="./assets/icons/arrow-left.svg" alt="" className="icon" />
                                                        </span>
                                                        Logout
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12">
                                <div className="checkout-widget checkout-widget__custom">
                                    <div>{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default LayoutProfile;
