const fetchRandomJoke = async () => {
  // implement functionality here
  const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random")
    const content = await response.text();
const obj = JSON.parse(content);
return obj[0]
};


export { fetchRandomJoke };