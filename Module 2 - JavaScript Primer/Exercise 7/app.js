const between = (value, lowerLimit, upperLimit) => {
  if (value >= lowerLimit && value <= upperLimit) {
    return true;
  }

  return false;
};

export default between;