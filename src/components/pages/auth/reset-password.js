import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../layouts/loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import Swal from "sweetalert2";

function ResetPassword() {
    const { resetToken } = useParams();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        newPassword: "",
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.email) {
            valid = false;
            newErrors.email = "Please enter your email.";
        } else if (!isEmailValid(formData.email)) {
            valid = false;
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "Please enter a new password.";
            valid = false;
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters.";
            valid = false;
        } else if (formData.newPassword.length > 50) {
            newErrors.newPassword = "New password must be less than 50 characters.";
            valid = false;
        }

        setFormErrors(newErrors);

        return valid;
    };

    const submitResponse = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const { email, newPassword } = formData;
                const restPasswordResponse = await api.post(url.AUTH.RESET_PASSWORD + `/${resetToken}`, { email, newPassword });

                if (restPasswordResponse.status === 200) {
                    setTimeout(() => {
                        Swal.fire({
                            title: "Successfully!",
                            text: "Reset password successfully!",
                            icon: "success",
                        });
                    }, 2000);

                    navigate("/login");
                }
            } catch (error) {
                Swal.fire({
                    title: "Oops...!",
                    text: "Error! An error occurred. Please try again later.",
                    icon: "error",
                });
            }
        }
    };

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);
    return (
        <>
            <Helmet>
                <title>Reset Password | R Ticket</title>
            </Helmet>

            {loading ? <Loading /> : ""}

            <section className="account-section center-item">
                <div className="container">
                    <div className="account-area">
                        <div className="section-header-3">
                            <span className="cate">hello !</span>
                            <h2 className="title" style={{ fontSize: "30px" }}>
                                Reset your password
                            </h2>
                        </div>
                        <form className="account-form" onSubmit={submitResponse}>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email<span>*</span>
                                </label>
                                <input type="text" placeholder="Enter Your Email" id="email" name="email" value={formData.email} onChange={handleChange} autoFocus />
                                {formErrors.email && <p className="invalid-feedback">{formErrors.email}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    Password<span>*</span>
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                    />

                                    <div className="input-group-append">
                                        <span className="show-pass" onClick={handleTogglePassword}>
                                            {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    </div>
                                </div>
                                {formErrors.newPassword && <p className="invalid-feedback">{formErrors.newPassword}</p>}
                            </div>

                            <div className="form-group text-center">
                                <input type="submit" value="Reset Password" />
                            </div>
                        </form>
                        <div className="option">
                            <Link href="/login">
                                <i className="fal fa-arrow-left"></i> Back to login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ResetPassword;
