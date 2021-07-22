import React, { useState, useContext } from 'react';
import { PaystackButton } from 'react-paystack';
import Modal from '../UI/Modal';
import classes from './Payment.module.css';
import foodImage from '../../assets/food.jpeg';
import CartContext from '../../store/cart-context';

const Payment = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    deliveryAddress: "",
    phone: ""
  });

  const {email, name, deliveryAddress, phone} = formData;
  const publicKey = "pk_test_4979b12820b1565660beb15c7c27c1ffa8e56174";
  const cartCtx = useContext(CartContext);

  const amount = cartCtx.totalAmount * 100;
  const displayAmount = amount /100;

  const handleInputChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
      deliveryAddress,
    },
    publicKey,
    text: "Make Order",
    onSuccess: () => {
    },
    onClose: () => alert("Are you sure you want to close this order?"),
  };

  return (
    <Modal className={classes.App} onClose={props.onClose}>
      <div className={classes.container}>
        <div className={classes.item}>
          <div className={classes['overlay-effect']}></div>
          <img
            className={classes['item-image']}
            src={foodImage}
            alt="product"
          />
          <div className={classes['item-details']}>
            <p className={classes['item-details__title']}>Joy's Banquet</p>
            <p className={classes['item-details__amount']}>NGN {displayAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
          </div>
        </div>
        <div className={classes.checkout}>
          <div className={classes['checkout-form']}>
            <div className={classes['checkout-field']}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className={classes['checkout-field']}>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className={classes['checkout-field']}>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleInputChange}
              />
            </div>
            <div className={classes['checkout-field']}>
              <label>Delivery Address</label>
              <input
                type="text"
                name="deliveryAddress"
                value={deliveryAddress}
                onChange={handleInputChange}
              />
            </div>
            <PaystackButton className={classes['paystack-button']} {...componentProps} />
            <button className={classes['paystack-button']} onClick={props.onClose}>Close</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Payment;