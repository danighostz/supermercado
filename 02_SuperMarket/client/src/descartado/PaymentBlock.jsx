import React from "react";
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
export default function PaymentBlock()
{
    const createOrder = (data, actions) => actions.order.create({purchase_units:[{amount:{value:"0.01"}}]});
    const onApprove = (data, actions) => actions.order.capture();
    return <PayPalButton createOrder={createOrder} onApprove={onApprove} />;
}