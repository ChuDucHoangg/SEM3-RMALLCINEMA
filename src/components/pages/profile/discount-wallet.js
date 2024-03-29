import { useCallback, useEffect, useState } from "react";
import LayoutProfile from "../../layouts/profile";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { format } from "date-fns";

function DiscountWallet() {
    const [promotion, setPromotion] = useState([]);

    const loadPromotion = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const promotionResponse = await api.get(url.PROMOTION.BY_USER, config);
            setPromotion(promotionResponse.data);
        } catch (error) {}
    }, []);

    useEffect(() => {
        loadPromotion();

        const $ = window.$;
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    }, [loadPromotion]);

    // Copy to clipboard
    const handleCopyClick = (code) => {
        const textarea = document.createElement("textarea");
        textarea.value = code;

        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand("copy");

        document.body.removeChild(textarea);
        Swal.fire({
            title: "Copy the discount code successfully!",
            icon: "success",
        });
    };
    return (
        <>
            <Helmet>
                <title>Discount Code | R Ticket</title>
            </Helmet>
            <LayoutProfile>
                <div className="col-12">
                    <h2 className="profile-info__heading">Your discount code</h2>
                    {promotion.length > 0 ? (
                        <div className="row">
                            {promotion.map((item, index) => {
                                return (
                                    <div className="col-lg-6 col-md-12 col-12" key={index}>
                                        <div className="mt-2 mb-2">
                                            <div className="blog-author d-flex align-items-center discount-custom mt-3">
                                                <div className="author-thumb my-auto">
                                                    <img src="./assets/icons/discount-svgrepo.svg" alt="blog" />
                                                </div>
                                                <div className="author-content">
                                                    <h5 className="title mt-2">
                                                        <p>{item.promotionName}</p>
                                                    </h5>
                                                    <span
                                                        className="d-flex align-items-center discount-custom__desc"
                                                        data-toggle="tooltip"
                                                        data-placement="right"
                                                        title="Copy to clipboard"
                                                        onClick={() => handleCopyClick(item.promotionCode)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <i className="fal fa-copy"></i> {item.promotionCode}
                                                    </span>
                                                </div>
                                                <div className="mt-3 discount-custom__footer">
                                                    <span className="d-flex align-items-center  discount-custom__desc">
                                                        <i className="fal fa-badge-percent"></i> {item.discountPercentage}%
                                                    </span>
                                                    <span className="d-flex align-items-center discount-custom__desc">
                                                        <i className="fal fa-clock"></i> {item && item.endDate && format(new Date(item.endDate), "HH:mm:ss dd/MM/yyyy")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="favorite-not">
                            <img src="./assets/img/not-found.png" alt="Not Found" style={{ width: "60%" }} />
                            <p>You currently don't have any discount code.</p>
                            <a className="custom-button back-button" href="/movies">
                                <i className="far fa-reply"></i> Book ticket now
                            </a>
                        </div>
                    )}
                </div>
            </LayoutProfile>
        </>
    );
}

export default DiscountWallet;
