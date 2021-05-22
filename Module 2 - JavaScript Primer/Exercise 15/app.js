const logMap = (map) => {
  map.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
};

export default logMap;