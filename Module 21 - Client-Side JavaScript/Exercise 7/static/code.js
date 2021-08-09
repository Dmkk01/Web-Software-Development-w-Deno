let count = 0;
const incrementCount = () => {
  count++;
  document.querySelector("#count").innerHTML = count;
};

const decreaseCount = () => {
    count = count - 1;
    document.querySelector("#count").innerHTML = count;
  };