import { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment';
import CartProvider from './store/cartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const showPaymentHandler = () => {
    setShowPayment(true);
  };

  const hidePaymentHandler = () => {
    setShowPayment(false);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} onShowPayment = {showPaymentHandler}/>}
      {showPayment && <Payment onClose={hidePaymentHandler} />}

      <Header onShowCart = {showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
