const element = document.createElement("p");
const text = document.createTextNode("I was just added into a container!");
element.appendChild(text);

document.querySelector("#container").appendChild(element);