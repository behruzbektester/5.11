const loaderContainer = document.querySelector(".loader-container");
const list = document.querySelector("#list");
const lightBtn = document.querySelector(".light-btn");
const darkBtn = document.querySelector(".dark-btn");
const body = document.querySelector("body");

async function getData() {
    loaderContainer.classList.remove("hidden");
    //   await new Promise((r) => setTimeout(r, 1000));
    const req = await fetch("https://restcountries.com/v3.1/all");
    const data = await req.json();
    loaderContainer.classList.add("hidden");
    return data;
}
// toggle mode
const modeLocal = localStorage.getItem("mode");

if (modeLocal) {
    body.classList.add("dark-mode");
    darkBtn.classList.toggle("hidden");
    lightBtn.classList.toggle("hidden");
}

const toggleModeBtn = () => {
    darkBtn.classList.toggle("hidden");
    lightBtn.classList.toggle("hidden");
    body.classList.toggle("dark-mode");
};

darkBtn.addEventListener("click", () => {
    toggleModeBtn();
    localStorage.setItem("mode", "dark-mode");
});

lightBtn.addEventListener("click", () => {
    toggleModeBtn();
    localStorage.setItem("mode", "");
});

function generateCountries(countries) {
    countries.forEach((c) => {
        console.log(c);
        let li = document.createElement("li");
        let p = document.createElement("p");
        let img = document.createElement("img");
        let pop = document.createElement("p");
        let reg = document.createElement("p");
        let cap = document.createElement("p");
        li.classList.add("list-item");
        img.width = 264;
        img.height = 160;
        img.src = c.flags.svg;
        img.alt = c.flags.alt;
        p.innerHTML = `<span class="name">${c.name.common}</span>`;
        p.style.paddingBottom = "16px";
        p.style.fontWeight = 800;
        pop.innerHTML = `<span class="name">Population:</span> <span class="value">${c.population}</span>`;
        reg.innerHTML = `<span class="name">Region:</span> <span class="value">${c.region}</span>`;
        reg.style.paddingTop = "8px";
        reg.style.paddingBottom = "8px";
        cap.innerHTML = c.capital ?
            `<span class="name">Capital:</span> <span class="value">${c.capital[0]}</span>` :
            `<span class="name">Capital:</span> no capital`;
        cap.style.paddingBottom = "46px";
        li.appendChild(img);
        li.appendChild(p);
        list.appendChild(li);
        li.appendChild(pop);
        li.appendChild(reg);
        li.appendChild(cap);
    });
}

getData()
    .then((data) => generateCountries(data))
    .catch((error) => console.log(error));