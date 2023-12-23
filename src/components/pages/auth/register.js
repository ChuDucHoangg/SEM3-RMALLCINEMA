import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import url from "../../../services/url";
import api from "../../../services/api";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        fullname: "",
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

        if (!formData.fullname) {
            newErrors.fullname = "Please enter your full name.";
            valid = false;
        } else if (formData.fullname.length < 3) {
            newErrors.fullname = "Full name must have at least 3 characters";
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = "Please enter your email address.";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
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

    const handleRegister = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const registerRequest = await api.post(url.AUTH.REGISTER, formData);

                if (registerRequest.status === 201) {
                    navigate("/login");
                }
            } catch (error) {}
        }
    };
    return (
        <>
            <section className="account-section bg_img" data-background="assets/images/account/account-bg.html">
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">
                            <div className="section-header-3">
                                <span className="cate">welcome !</span>
                                <h2 className="title">Create Account</h2>
                            </div>
                            <form className="account-form" onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label htmlFor="fullname">
                                        Name<span>*</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your Name" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} autoFocus />
                                    {formErrors.fullname && <p className="invalid-feedback">{formErrors.fullname}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email<span>*</span>
                                    </label>
                                    <input type="email" placeholder="Enter Your Email" id="email" name="email" value={formData.email} onChange={handleChange} />
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
                                    <input type="checkbox" id="agree" required defaultChecked />
                                    <label htmlFor="agree">
                                        I agree with this <a href="#!">Terms </a> and <a href="#!"> Privacy Policy</a>.
                                    </label>
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit" value="Register" />
                                </div>
                            </form>
                            <div className="option">
                                Already have an account? <NavLink to="/login">Login</NavLink>.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Register;
