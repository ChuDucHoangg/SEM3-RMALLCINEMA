import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const PayPalButtonComponent = ({ amount, onSuccess, onCancel, onError }) => {
    const paypalOptions = {
        clientId: "AV_yQ7dzOz9FzysULcVpOwtN8d0Wob10pkR7hrzgx5mGcTzqhCLHZHYRWn4nMuTi4fJowBSlIbd-wKBU",
        currency: "USD",
    };

    return <PayPalButton amount={amount} onSuccess={(details, data) => onSuccess(details, data)} onCancel={(data) => onCancel(data)} onError={(err) => onError(err)} options={paypalOptions} />;
};

export default PayPalButtonComponent;
