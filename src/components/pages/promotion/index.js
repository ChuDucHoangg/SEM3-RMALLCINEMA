import Layout from "../../layouts/layout";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Helmet } from "react-helmet";
import Loading from "../../layouts/loading";
import { format } from "date-fns";
import Swal from "sweetalert2";

function Promotion() {
    const [loading, setLoading] = useState(false);
    const [promotion, setPromotion] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    const loadPromotion = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const promotionResponse = await api.get(url.PROMOTION.LIST_FOR_USER, config);
            setPromotion(promotionResponse.data);
        } catch (error) {}
    }, []);

    useEffect(() => {
        setLoading(true);

        loadPromotion();

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loadPromotion]);

    // Save promotion code to account
    const handleSavePromotion = async (promotionId) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const savePromotionResponse = await api.post(url.PROMOTION.SAVE_PROMOTION, { promotionId }, config);
            if (savePromotionResponse.status === 201) {
                Swal.fire({
                    title: "Good job!",
                    text: "Saved promotion to account successfully!",
                    icon: "success",
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    title: "Oops...",
                    text: "You already have this discount code!",
                    icon: "warning",
                });
            }
        }
    };

    const handleConditionClick = (item) => {
        setSelectedDiscount(item);
    };
    return (
        <>
            <Helmet>
                <title>Promotion | R Ticket</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section className="banner-section">
                    <div className="banner-bg bg-fixed" style={{ backgroundImage: "url('assets/img/banner/banner-event.jpg')", backgroundSize: "cover" }}></div>
                    <div className="container">
                        <div className="banner-content">
                            <h1 className="title bold">
                                <span className="color-theme">Explore the </span> World of Deals!
                            </h1>
                            <p>Welcome to a unique and economical shopping experience with us! Discover a world full of deals with Exclusive Discount Codes only available on our site.</p>
                        </div>
                    </div>
                </section>

                <section className="faq-section padding-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 mb-50">
                                <div className="event-about-content">
                                    <div className="section-header-3 left-style m-0">
                                        <h4 className="title">Attractive Offers</h4>
                                        <p>
                                            <i className="fal fa-gift"></i> 20% Off Code for First Order. Are you a new member? Receive attractive offers when ordering for the first time with our
                                            exclusive discount code. Start your shopping journey with great discounts!
                                        </p>
                                    </div>
                                    <div className="section-header-3 left-style mt-5">
                                        <h4 className="title">Free Shipping Worldwide</h4>
                                        <p>
                                            <i className="far fa-globe-asia"></i> Shop comfortably and save with free global shipping. Go beyond limits and get your products delivered to your door
                                            without having to worry about shipping costs!
                                        </p>
                                    </div>

                                    <div className="section-header-3 left-style mt-5">
                                        <h4 className="title">Explore Now and Get Exciting Deals!</h4>
                                        <div className="row">
                                            {promotion.length === 0 ? (
                                                <h6 className="text-start" style={{ paddingLeft: "15px" }}>
                                                    There are currently no promotions. Please come back later!
                                                </h6>
                                            ) : (
                                                promotion.map((item, index) => {
                                                    return (
                                                        <div className="col-lg-6 col-md-12 col-12" key={index}>
                                                            <div className="mt-2 mb-2">
                                                                <div className="blog-author d-flex align-items-center discount-custom discount-custom-2 mt-3">
                                                                    <div className="author-thumb my-auto">
                                                                        <img src="./assets/icons/discount-svgrepo.svg" alt="blog" />
                                                                    </div>
                                                                    <div className="author-content">
                                                                        <h5 className="title mt-2">
                                                                            <p>{item.name}</p>
                                                                        </h5>
                                                                        <span className="d-flex align-items-center  discount-custom__desc">
                                                                            <i className="fal fa-badge-percent"></i> {item.discountPercentage}%
                                                                        </span>
                                                                    </div>
                                                                    <div className="mt-3 discount-custom__footer">
                                                                        <span
                                                                            className="d-flex align-items-center discount-custom__desc"
                                                                            onClick={() => handleSavePromotion(item.id)}
                                                                            style={{ cursor: "pointer" }}
                                                                        >
                                                                            <i className="fal fa-save"></i>
                                                                            Save
                                                                        </span>
                                                                        <span
                                                                            className="d-flex align-items-center discount-custom__link"
                                                                            data-toggle="modal"
                                                                            data-target="#condition"
                                                                            onClick={() => handleConditionClick(item)}
                                                                        >
                                                                            Condition
                                                                        </span>
                                                                    </div>
                                                                    <div className="modal fade" id="condition" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                                                        <div className="modal-dialog" role="document">
                                                                            <div className="modal-content">
                                                                                <div className="modal-body">
                                                                                    {selectedDiscount && (
                                                                                        <div className="p-2">
                                                                                            <h5 className="title discount-custom__desc text-center pl-3 pr-3">{selectedDiscount.name}</h5>
                                                                                            <p className="discount-custom__desc discount-custom__desc-2 mb-2">
                                                                                                Endow
                                                                                                <span className="discount-custom__desc d-block">
                                                                                                    {selectedDiscount.discountPercentage}% discount for minimum bill of $
                                                                                                    {selectedDiscount.minPurchaseAmount}
                                                                                                </span>
                                                                                            </p>
                                                                                            <p className="discount-custom__desc discount-custom__desc-2 mb-2">
                                                                                                Effective date
                                                                                                <span className="discount-custom__desc d-block">
                                                                                                    {selectedDiscount &&
                                                                                                        selectedDiscount.startDate &&
                                                                                                        format(new Date(selectedDiscount.startDate), "HH:mm:ss dd/MM/yyyy")}
                                                                                                </span>
                                                                                            </p>
                                                                                            <p className="discount-custom__desc discount-custom__desc-2 mb-2">
                                                                                                Code expiration date
                                                                                                <span className="discount-custom__desc d-block">
                                                                                                    {selectedDiscount &&
                                                                                                        selectedDiscount.endDate &&
                                                                                                        format(new Date(selectedDiscount.endDate), "HH:mm:ss dd/MM/yyyy")}
                                                                                                </span>
                                                                                            </p>
                                                                                            <p className="discount-custom__desc discount-custom__desc-2 mb-2">
                                                                                                See details
                                                                                                <span className="discount-custom__desc d-block">
                                                                                                    {selectedDiscount.discountPercentage}% discount for orders from $
                                                                                                    {selectedDiscount.minPurchaseAmount}. Applicable until{" "}
                                                                                                    {selectedDiscount &&
                                                                                                        selectedDiscount.endDate &&
                                                                                                        format(new Date(selectedDiscount.endDate), "dd/MM/yyyy")}
                                                                                                    . Each account can only be used once. Discount codes are issued by the Seller and will not be
                                                                                                    refunded for any reason.
                                                                                                </span>
                                                                                            </p>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="custom-button" data-dismiss="modal">
                                                                                        Agree
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-sm-10 col-md-6 mb-50">
                                <div className="widget-1 widget-offer">
                                    <div className="offer-body">
                                        <div className="offer-item">
                                            <div className="thumb">
                                                <img src="assets/img/sidebar/offer-1.png" alt="sidebar" />
                                            </div>
                                            <div className="content">
                                                <h6>
                                                    <a href="#!">Brand Card Cashback Offer</a>
                                                </h6>
                                                <p>It is a long established fact that a reader will be distracted</p>
                                            </div>
                                        </div>
                                        <div className="offer-item">
                                            <div className="thumb">
                                                <img src="assets/img/sidebar/offer-2.png" alt="sidebar" />
                                            </div>
                                            <div className="content">
                                                <h6>
                                                    <a href="#!">Online Payment Offer</a>
                                                </h6>
                                                <p>It is a long established fact that a reader will be distracted</p>
                                            </div>
                                        </div>
                                        <div className="offer-item">
                                            <div className="thumb">
                                                <img src="assets/img/sidebar/offer-3.png" alt="sidebar" />
                                            </div>
                                            <div className="content">
                                                <h6>
                                                    <a href="#!">Bank Payment Cashback</a>
                                                </h6>
                                                <p>It is a long established fact that a reader will be distracted</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Promotion;
