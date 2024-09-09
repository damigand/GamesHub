import "./back.css";

export function backButton() {
    const div = document.createElement("div");
    div.classList.add("back");

    const img = document.createElement("img");
    img.src = "../back.png";
    img.alt = "back button";

    div.appendChild(img);

    div.addEventListener("click", (event) => {
        window.history.back();
    });

    return div;
}
