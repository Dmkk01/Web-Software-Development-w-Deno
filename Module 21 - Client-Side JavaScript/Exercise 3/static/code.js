const element = document.createElement("p");
const text = document.createTextNode("I was just added!");
element.appendChild(text);

document.querySelector("body").appendChild(element);
