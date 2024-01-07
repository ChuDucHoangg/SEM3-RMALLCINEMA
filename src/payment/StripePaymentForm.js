import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripePaymentForm = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Lấy thông tin thẻ từ form
        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            console.error(error);
        } else {
            onSuccess(token || {});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ width: "300px", height: "20px" }}>
                <CardElement />
            </div>
            <button type="submit" className="custom-button">
                Pay with Credit <img src="assets/img/payment/credit-card.png" alt="" width="30px" height="30px" />
            </button>
        </form>
    );
};

export default StripePaymentForm;
