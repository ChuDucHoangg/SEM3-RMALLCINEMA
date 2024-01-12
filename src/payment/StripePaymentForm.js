import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripePaymentForm = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || submitting) {
            return;
        }

        setSubmitting(true);

        try {
            // Perform your async operation (e.g., payment processing)
            const cardElement = elements.getElement(CardElement);
            const { token, error } = await stripe.createToken(cardElement);

            if (error) {
                console.error(error);
            } else {
                onSuccess(token || {});
            }
        } catch (error) {
            console.error("An error occurred during payment processing:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ width: "300px", height: "20px" }}>
                <CardElement />
            </div>

            {!submitting ? (
                <button type="submit" className="custom-button">
                    Pay with Credit <img src="assets/img/payment/credit-card.png" alt="" width="30px" height="30px" />
                </button>
            ) : (
                <button type="button" className="custom-button btn-payment" disabled>
                    <i className="fa fa-spinner fa-spin"></i> Proceed to payment...
                </button>
            )}
        </form>
    );
};

export default StripePaymentForm;
