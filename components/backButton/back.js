import "./back.css";

export function backButton() {
    const div = document.createElement("div");
    div.classList.add("back");

    const img = document.createElement("img");
    img.src = "../back.png";
    img.alt = "back button";

    div.appendChild(img);

    const text = document.createElement("span");
    text.textContent = "Back";

    div.appendChild(text);

    div.addEventListener("click", (event) => {
        console.log("hi");
        window.history.back();
    });

    return div;
}
