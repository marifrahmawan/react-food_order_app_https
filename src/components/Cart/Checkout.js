import React, { useEffect, useState } from 'react';
import useCheckoutHook from '../../hooks/useCheckoutHook';

import classes from './Checkout.module.css';

const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const regularExp = {
    containsAlphaNumeric: /^(?!-)(?!.*-)[A-Za-z0-9-]+(?<!-)$/,
    containsNumber: /\d+/,
    containsAlphabet: /[a-zA-Z]/,

    onlyLetters: /^[A-Za-z _.-]+$/,
    onlyNumbers: /^[0-9]+$/,
    onlyMixOfAlphaNumeric: /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/,
  };

  const confirmHandler = (e) => {
    e.preventDefault();

    if (formIsValid) {
      props.onConfirmOrder({
        name: nameValue,
        street: streetValue,
        postalCode: postalValue,
        city: cityValue,
      });

      resetName();
      resetStreet();
      resetPostal();
      resetCity();
    }
  };

  const {
    value: nameValue,
    inputHandler: nameChangeHandler,
    inputClickedHandler: nameClickHandler,
    hasError: nameHasError,
    isClicked: nameIsClicked,
    reset: resetName,
  } = useCheckoutHook(
    (value) =>
      value.trim() !== '' && regularExp.onlyLetters.test(value.trim()) === true
  );

  const {
    value: streetValue,
    inputHandler: streetChangeHandler,
    inputClickedHandler: streetClickHandler,
    hasError: streetHasError,
    isClicked: streetIsClicked,
    reset: resetStreet,
  } = useCheckoutHook((value) => value.trim() !== '');

  const {
    value: postalValue,
    inputHandler: postalChangeHandler,
    inputClickedHandler: postalClickHandler,
    hasError: postalHasError,
    isClicked: postalIsClicked,
    reset: resetPostal,
  } = useCheckoutHook(
    (value) =>
      value.trim() !== '' && regularExp.onlyNumbers.test(value.trim()) === true
  );

  const {
    value: cityValue,
    inputHandler: cityChangeHandler,
    inputClickedHandler: cityClickHandler,
    hasError: cityHasError,
    isClicked: cityIsClicked,
    reset: resetCity,
  } = useCheckoutHook(
    (value) =>
      value.trim() !== '' && regularExp.onlyLetters.test(value.trim()) === true
  );

  useEffect(() => {
    if (!nameHasError && !streetHasError && !postalHasError && !cityHasError) {
      setFormIsValid(true);
      console.log(formIsValid);
    } else {
      setFormIsValid(false);
    }
  }, [nameHasError, streetHasError, postalHasError, cityHasError, formIsValid]);

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          nameHasError && nameIsClicked ? classes.invalid : ''
        }`}
      >
        <label htmlFor="name">Youre Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameClickHandler}
        />
        {nameHasError && nameIsClicked && (
          <p className={classes['error-message']}>Name Has Error</p>
        )}
      </div>

      <div
        className={`${classes.control} ${
          streetHasError && streetIsClicked ? classes.invalid : ''
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetClickHandler}
        />
        {streetHasError && streetIsClicked && (
          <p className={classes['error-message']}>Street Has Error</p>
        )}
      </div>

      <div
        className={`${classes.control} ${
          postalHasError && postalIsClicked ? classes.invalid : ''
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalClickHandler}
        />
        {postalHasError && postalIsClicked && (
          <p className={classes['error-message']}>Postal Code Has Error</p>
        )}
      </div>

      <div
        className={`${classes.control} ${
          cityHasError && cityIsClicked ? classes.invalid : ''
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityClickHandler}
        />
        {cityHasError && cityIsClicked && (
          <p className={classes['error-message']}>City Has Error</p>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={`${
            formIsValid ? classes.submit : classes['button-disabled']
          }`}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
