import { NavLink, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../layouts/loading";
import { setAccessToken } from "../../../utils/auth";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Please enter your email address.";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Please enter your password.";
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            valid = false;
        } else if (formData.password.length > 50) {
            newErrors.password = "Password must be less than 50 characters.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const loginRequest = await api.post(url.AUTH.LOGIN, formData);

                if (loginRequest.status === 200) {
                    const token = loginRequest.data.data;
                    setAccessToken(token);

                    const redirectPath = localStorage.getItem("redirectPath") || "/";
                    localStorage.removeItem("redirectPath");
                    navigate(redirectPath);
                } else {
                    setFormErrors({
                        email: "Invalid email or password.",
                        password: "Invalid email or password.",
                    });
                }
            } catch (error) {}
        }
    };
    return (
        <>
            <Helmet>
                <title>Login | RMall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <section className="account-section" style={{ height: "100vh" }}>
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">
                            <div className="section-header-3">
                                <span className="cate">hello !</span>
                                <h2 className="title">welcome back</h2>
                            </div>
                            <form className="account-form" onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email<span>*</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your Email" id="email" name="email" value={formData.email} onChange={handleChange} />
                                    {formErrors.email && <p className="invalid-feedback">{formErrors.email}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Password<span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input type={showPassword ? "text" : "password"} placeholder="Password" id="password" name="password" value={formData.password} onChange={handleChange} />

                                        <div className="input-group-append">
                                            <span className="show-pass" onClick={handleTogglePassword}>
                                                {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                            </span>
                                        </div>
                                    </div>
                                    {formErrors.password && <p className="invalid-feedback">{formErrors.password}</p>}
                                </div>
                                <div className="form-group checkgroup">
                                    <input type="checkbox" id="bal2" defaultChecked />
                                    <label htmlFor="bal2">remember me</label>
                                    <NavLink to="/forgot-password" className="forget-pass">
                                        Forgot Password?
                                    </NavLink>
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit" value="log in" />
                                </div>
                            </form>
                            <div className="option">
                                Don't have an account? <NavLink to="/register">register now</NavLink>.
                            </div>
                            <div className="or">
                                <span>Or</span>
                            </div>
                            <ul className="social-icons">
                                <li>
                                    <a href="#!">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <i className="fab fa-google"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Login;
