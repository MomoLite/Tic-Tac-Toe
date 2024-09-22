let divs = document.querySelectorAll(".container > div");

for (let i = 0; i < divs.length; ++i) {
    divs[i].addEventListener("click", display);
}


function display(e) {
    if (e.target.textContent === "") {
        e.target.textContent = "X";
    }
}