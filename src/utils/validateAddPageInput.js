const validateAddPageInput = (input) => {
  const regEx = /^[_\-0-9_a-z]+$/g;
  return regEx.test(input);
};

export default validateAddPageInput;
