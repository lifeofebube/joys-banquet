import React, { useState, useContext } from 'react';
import { PaystackButton } from 'react-paystack';
import Modal from '../UI/Modal';
import classes from './Payment.module.css';
import foodImage from '../../assets/food.jpeg';
import CartContext from '../../store/cart-context';

const isEmpty = (value) => value.trim() === "";
const isElevenChars = (value) => value.trim().length === 11;
const isValidEmail = (value) => {
  if (
    // eslint-disable-next-line
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  ) {
    return true;
  }
}

const Payment = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    deliveryAddress: "",
    phone: ""
  });

  const {email, name, deliveryAddress, phone} = formData;
  const [didSubmit, setDidSubmit] = useState(false);
  const [formInputsValidity, setFormInputsValidity] = useState({
    validName: true,
    validEmail: true,
    validDeliveryAddress: true,
    vaildPhone: true,
  });

  const publicKey = "pk_test_4979b12820b1565660beb15c7c27c1ffa8e56174";
  const cartCtx = useContext(CartContext);

  const amount = cartCtx.totalAmount * 100;
  const displayAmount = amount /100;

  const handleInputChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});

    const enteredNameIsValid = !isEmpty(name);
    const enteredEmailIsValid = isValidEmail(email);
    const enteredDeliveryAddressIsValid = !isEmpty(deliveryAddress);
    const enteredPhoneIsValid = isElevenChars(phone);

    setFormInputsValidity({
      validName: enteredNameIsValid,
      validEmail: enteredEmailIsValid,
      validDeliveryAddress: enteredDeliveryAddressIsValid,
      vaildPhone: enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredDeliveryAddressIsValid &&
      enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }
  };

  const config = {
      reference: new Date().getTime().toString(),
      email,
      amount,
      publicKey,
  };

  const sendFormData = async (reference, formData) => {
    
    await fetch("https://joys-banquet-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
        body: JSON.stringify({
          user: formData,
          orderedItems: cartCtx.items,
          transactionDetails: reference,
        }),
      });
  };
  const paystackComponentProps = {
    ...config,
    text: "Make Order",
    onSuccess: (reference) => {sendFormData(reference, formData)
    setDidSubmit(true);
    },
    onClose: () => alert("Are you sure you want to close this order?"),
  };

  const paymentModalContent = (
    <div className={classes.container}>
      <div className={classes.item}>
        <div className={classes["overlay-effect"]}></div>
        <img className={classes["item-image"]} src={foodImage} alt="product" />
        <div className={classes["item-details"]}>
          <p className={classes["item-details__title"]}>Joy's Banquet</p>
          <p className={classes["item-details__amount"]}>
            NGN{" "}
            {displayAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div className={classes.checkout}>
        <div className={classes["checkout-form"]}>
          <div className={classes["checkout-field"]}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            {!formInputsValidity.validName && (
              <p className={classes.invalid}>Please enter a valid name!</p>
            )}
          </div>
          <div className={classes["checkout-field"]}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {!formInputsValidity.validEmail && (
              <p className={classes.invalid}>Please enter a valid e-mail!</p>
            )}
          </div>
          <div className={classes["checkout-field"]}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />
            {!formInputsValidity.vaildPhone && (
              <p className={classes.invalid}>
                Please enter a valid phone number!
              </p>
            )}
          </div>
          <div className={classes["checkout-field"]}>
            <label>Delivery Address</label>
            <input
              type="text"
              name="deliveryAddress"
              value={deliveryAddress}
              onChange={handleInputChange}
            />
            {!formInputsValidity.validDeliveryAddress && (
              <p className={classes.invalid}>Please enter a valid address!</p>
            )}
          </div>
          <PaystackButton
            className={classes["paystack-button"]}
            {...paystackComponentProps}
          />
          <button
            className={classes["paystack-button"]}
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
  const didSubmitModalContent = (
    <React.Fragment>
      <p className={classes["success-message"]}>Successfully placed your order! You will contacted in a bit...</p>
      <div className={classes.actions}>
        <button className={classes["paystack-button"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal className={classes.App} onClose={props.onClose}>
      {!didSubmit && paymentModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Payment;