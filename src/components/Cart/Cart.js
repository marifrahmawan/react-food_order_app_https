import { Fragment, useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const [isOrder, setIsOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmited, setDidSubmited] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsOrder(true);
  };

  const onSubmitHandler = async (userData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
            totalPrice: cartCtx.totalAmount.toFixed(2),
          }),
        }
      );
      if (!response.ok) {
        console.log('Something went wrong. Try again later');
      }

      setIsSubmitting(false);
      setDidSubmited(true);
      cartCtx.clearCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModal = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isOrder && (
        <Checkout onConfirmOrder={onSubmitHandler} onCancel={props.onClose} />
      )}

      {!isOrder && (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );

  const submittingModal = <p>Submitting the order</p>;
  const submitedModal = <p>Successfully submitting the order</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmited && cartModal}
      {isSubmitting && submittingModal}
      {didSubmited && !isSubmitting && submitedModal}
    </Modal>
  );
};

export default Cart;
