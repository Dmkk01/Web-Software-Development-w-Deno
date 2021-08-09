// no code so far!
const addToList = () => {
    const value = document.querySelector("#text").value;
    const element = document.createElement("li");
    const text = document.createTextNode(value);
    element.appendChild(text);
    document.querySelector("#list").appendChild(element);
    document.querySelector("#text").value = "";
};
