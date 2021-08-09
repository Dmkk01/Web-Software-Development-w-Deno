const retrieveContentFromApi = async () => {
  const response = await fetch("/api/magic");
  console.log(response);

  const json = await response.json();
  const a = json.magic;
  
  const element = document.createElement("div");
  const text = document.createTextNode(a);
  element.appendChild(text);
  document.querySelector("#magic").appendChild(element);
};
