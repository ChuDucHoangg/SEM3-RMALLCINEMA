import { useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

function ForgotPassword() {
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(2);

    const [formData, setFormData] = useState({
        email: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
    });

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
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post(url.AUTH.FORGOT_PASSWORD, formData);
                if (response.status === 200) {
                    setSubmitting(true);
                    setTimeout(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);
                    setTimeout(() => {
                        Swal.fire({
                            title: "Successfully!",
                            text: "Reset password successfully!",
                            icon: "success",
                        });
                    }, 2000);
                }
            } catch (error) {
                setSubmitting(true);
                setTimeout(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);
                setTimeout(() => {
                    Swal.fire({
                        title: "Successfully!",
                        text: "Reset password successfully!",
                        icon: "success",
                    });
                }, 2000);
            }
        }
    };

    useEffect(() => {
        let countdownTimer;
        if (submitting && countdown > 0) countdownTimer = setInterval(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);
        return () => clearInterval(countdownTimer);
    }, [submitting, countdown]);

    useEffect(() => {
        if (countdown === 0) {
            const timeoutId = setTimeout(() => navigate("/login"), 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [countdown, navigate]);

    return (
        <>
            <Helmet>
                <title>Forgot Password | R Ticket</title>
            </Helmet>
            <section className="account-section center-item">
                <div className="container">
                    <div className="account-area">
                        <div className="section-header-3">
                            <span className="cate">hello !</span>
                            <h2 className="title">don't worry</h2>
                        </div>
                        <form className="account-form" onSubmit={handleForgotPassword}>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email<span>*</span>
                                </label>
                                <input type="email" placeholder="Enter Your Email" id="email" name="email" value={formData.email} onChange={handleChange} />
                                {formErrors.email && <p className="invalid-feedback">{formErrors.email}</p>}
                            </div>
                            <div className="form-group text-center">
                                {!submitting ? (
                                    <input type="submit" value="reset link" />
                                ) : (
                                    <button type="button" className="btn-custom" disabled>
                                        <i className="fa fa-spinner fa-spin"></i> Submitting...
                                    </button>
                                )}
                            </div>
                        </form>
                        <div className="option">We send a password reset link to your email.</div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ForgotPassword;
