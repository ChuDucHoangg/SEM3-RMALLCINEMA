import Swal from "sweetalert2";
import LayoutProfile from "../../layouts/profile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken, removeAccessToken } from "../../../utils/auth";

function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleTogglePassword = (fieldName) => {
        switch (fieldName) {
            case "currentPassword":
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case "newPassword":
                setShowNewPassword(!showNewPassword);
                break;
            case "confirmPassword":
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Please enter your password.";
            valid = false;
        } else if (formData.currentPassword.length < 6) {
            newErrors.currentPassword = "Password must be at least 6 characters.";
            valid = false;
        } else if (formData.currentPassword.length > 50) {
            newErrors.currentPassword = "Password must be less than 50 characters.";
            valid = false;
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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
            valid = false;
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userToken = getAccessToken();

            if (userToken) {
                const isConfirmed = await Swal.fire({
                    title: "Are you sure?",
                    text: "you want to change your password?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "I'm sure",
                });
                if (isConfirmed.isConfirmed) {
                    try {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${userToken}`,
                            },
                        };

                        const requestData = {
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword,
                            confirmPassword: formData.confirmPassword,
                        };

                        const passwordResponse = await api.post(url.AUTH.CHANGE_PASSWORD, requestData, config);

                        if (passwordResponse.data.success) {
                            removeAccessToken();

                            navigate("/login");
                        }
                    } catch (error) {}
                }
            } else {
            }
        }
    };
    return (
        <LayoutProfile>
            <div className="col-12">
                <h2 className="profile-info__heading">Change Password</h2>
                <form className="account-form" onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">
                            Current Password <span className="text-danger">*</span>
                        </label>
                        <div className="input-wrapper">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="***********"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />

                            <div className="input-group-append">
                                <span className="show-pass" onClick={() => handleTogglePassword("currentPassword")}>
                                    {showCurrentPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                </span>
                            </div>
                        </div>
                        {formErrors.currentPassword && <p className="invalid-feedback">{formErrors.currentPassword}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">
                            New Password <span className="text-danger">*</span>
                        </label>
                        <div className="input-wrapper">
                            <input type={showNewPassword ? "text" : "password"} placeholder="***********" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} />

                            <div className="input-group-append">
                                <span className="show-pass" onClick={() => handleTogglePassword("newPassword")}>
                                    {showNewPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                </span>
                            </div>
                        </div>
                        {formErrors.newPassword && <p className="invalid-feedback">{formErrors.newPassword}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password <span className="text-danger">*</span>
                        </label>
                        <div className="input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="***********"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                            <div className="input-group-append">
                                <span className="show-pass" onClick={() => handleTogglePassword("confirmPassword")}>
                                    {showConfirmPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                </span>
                            </div>
                        </div>
                        {formErrors.confirmPassword && <p className="invalid-feedback">{formErrors.confirmPassword}</p>}
                    </div>

                    <button type="submit" className="mt-3 btn-primary-color" style={{ width: "100%" }}>
                        Change Password
                    </button>
                </form>
            </div>
        </LayoutProfile>
    );
}

export default ChangePassword;
