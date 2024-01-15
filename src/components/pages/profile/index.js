import { Helmet } from "react-helmet";
import LayoutProfile from "../../layouts/profile";
import { useEffect, useState } from "react";
import Loading from "../../layouts/loading";
import api from "../../../services/api";
import url from "../../../services/url";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { getAccessToken } from "../../../utils/auth";

function Profile() {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState("");

    const [isEditButtonVisible, setEditButtonVisible] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const loadProfile = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const profileResponse = await api.get(url.AUTH.PROFILE, config);
            setInfo(profileResponse.data);
        } catch (error) {}
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const allowedExtensions = ["png", "jpg", "jpeg", "heic"];

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileExtension = file.name.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                // You can also reset the input field if needed
                e.target.value = "";
                return;
            }

            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        setEditButtonVisible(false);

        if (!isEditing) {
            setEditedInfo({ ...info });
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditButtonVisible(true);

        setEditedInfo({});
    };

    const handleSaveClick = async () => {
        setEditButtonVisible(true);
        try {
            const userToken = localStorage.getItem("access_token");

            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const formData = new FormData();

            // If avatarFile is present, append it to the FormData
            //  if (avatarFile) {
            //     formData.append("avatar", avatarFile);
            // }

            for (const key in editedInfo) {
                formData.append(key, editedInfo[key]);
            }

            // Send the request
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "You want to update your information?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
            });

            if (isConfirmed.isConfirmed) {
                const updateResponse = await api.put(url.AUTH.UPDATE_PROFILE, formData, config);

                if (updateResponse.status === 204) {
                    console.log("Successfully updated");
                } else {
                }
            }

            // Update the local state with edited information
            setInfo(editedInfo);
            setIsEditing(false);
        } catch (error) {}
    };

    return (
        <>
            <Helmet>
                <title>Profile | R Ticket</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <LayoutProfile>
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 className="profile-info__heading">Personal info</h2>

                        <button className="btn-edit" onClick={handleEditClick} style={{ display: isEditButtonVisible ? "block" : "none" }}>
                            <img src="./assets/icons/edit.svg" alt="" className="icon" />
                        </button>
                    </div>
                    <div className="profile-user">
                        <div className="avatar-inner">
                            <label htmlFor="avatarInput">
                                {isEditing ? (
                                    avatarPreview ? (
                                        <div className="avatar-inner">
                                            <img src={avatarPreview} alt="Avatar Preview" className="profile-user__avatar" />
                                            <img src="./assets/img/client/default-placeholder.png" alt="" className="avatar-default" />
                                        </div>
                                    ) : (
                                        <div className="avatar-inner">
                                            <img src="./assets/img/client/4.jpeg" alt={info.fullname} className="profile-user__avatar" />
                                            <img src="./assets/img/client/default-placeholder.png" alt="" className="avatar-default" />
                                        </div>
                                    )
                                ) : (
                                    <img src="./assets/img/client/4.jpeg" alt={info.fullname} className="profile-user__avatar cursor-default" />
                                )}
                            </label>
                            {isEditing && <input id="avatarInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />}
                        </div>

                        <div className="profile-user__info">
                            <h2 className="profile-user__name">{info.fullname}</h2>
                            <p className="profile-user__desc">Accumulated points: 1.000 point</p>
                        </div>
                    </div>

                    <div className="account-info mt-3">
                        <div className="row">
                            <p className="col-sm-3 mt-1">Full Name</p>
                            <p className="col-sm-5 mt-1 text-white">{info.fullname}</p>
                        </div>

                        <div className="row">
                            <p className="col-sm-3 mt-1">Email</p>
                            <p p className="col-sm-5 mt-1 text-white">
                                {info.email}
                            </p>
                        </div>

                        <div className="row">
                            <p className="col-sm-3 mt-1">Birthday</p>
                            <p className="col-sm-5 mt-1 text-white">
                                {isEditing ? (
                                    <input
                                        type="date"
                                        className="input-change"
                                        value={format(new Date(editedInfo.birthday), "yyyy-MM-dd") || ""}
                                        onChange={(e) => setEditedInfo({ ...editedInfo, birthday: e.target.value })}
                                    />
                                ) : (
                                    (info.birthday && format(new Date(info.birthday), "dd/MM/yyyy")) || "Unavailable"
                                )}
                            </p>
                        </div>

                        <div className="row">
                            <p className="col-sm-3 mt-1">Phone</p>
                            <p className="col-sm-5 mt-1 text-white">
                                {isEditing ? (
                                    <input type="tel" className="input-change" value={editedInfo.phone || ""} onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })} />
                                ) : (
                                    info.phone || "Unavailable"
                                )}
                            </p>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="d-flex justify-content-end">
                            <button className="btn-base button-resize" onClick={handleCancelClick}>
                                Cancel
                            </button>
                            <button className="btn-base btn-primary-color button-resize ml-2" onClick={handleSaveClick}>
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </LayoutProfile>
        </>
    );
}

export default Profile;
