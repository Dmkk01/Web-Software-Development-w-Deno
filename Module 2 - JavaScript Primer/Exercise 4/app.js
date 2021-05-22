const secret = (value) => {
  if (value === 300) {
    return "This is Sparta!";
  }

  return value;
};

export default secret;