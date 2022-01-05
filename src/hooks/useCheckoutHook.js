import { useState } from 'react';

const useCheckoutHook = (validateInput) => {
  const [inputValue, setInputValue] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const inputClickedHandler = () => {
    setIsClicked(true);
  };

  const reset = () => {
    setInputValue('');
    setIsClicked(false);
  };

  const inputIsValid = validateInput(inputValue);
  const hasError = !inputIsValid;

  return {
    value: inputValue,
    inputHandler,
    inputClickedHandler,
    hasError,
    isClicked,
    reset,
  };
};

export default useCheckoutHook;
