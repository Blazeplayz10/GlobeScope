localStorage.setItem("mode", "light")
let countries = []
const searchBar = document.getElementById("search-input")
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(country => {
            var countryCard = document.createElement("div")
            countryCard.className = "card p-0 col-2 m-3 shadow"
            countryCard.style.width = "14rem"
            countryCard.style.height = "18rem"
            countryCard.addEventListener("click", () => {
                showCountryDetails(country)
            })
            countryCard.innerHTML = `
                        <div class="card-img" style="width: 100%; height: 50%;">
                            <img src="${country.flags.png}" alt="${country.name} Flag" style="width: 100%; height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px;">
                        </div>
                        <div class="card-body py-3">
                                
                            <h4 class="card-title fs-6 fw-bolder">${country.name}</h4>
                                
                            <p style="font-size: 15px;" class="mb-0">Population: <span>${country.population.toLocaleString()}</span></p>
                            <p style="font-size: 15px;" class="mb-0"> Region: <span>${country.region}</span></p>
                            <p style="font-size: 15px;" class="mb-0">Capital: <span>${country.capital == undefined ? "Unknown" : country.capital}</span></p>
                        </div>
                    `
            document.getElementById("country-list").append(countryCard)
            countries.push(countryCard)
        });

    })

function filterCountries(region) {
    countries.forEach(countryCard => {
        const cardRegion = countryCard.querySelector('.card-body p:nth-child(3) span').innerText;

        if (cardRegion === region) {
            countryCard.style.display = "block";
        } else {
            countryCard.style.display = "none";
        }
    });
}
function searchCountries(countryName) {
    countries.forEach(countryCard => {
        var cardName = countryCard.querySelector('.card-title').innerText;

        if (cardName.includes(countryName)) {
            countryCard.style.display = "block";
        } else {
            countryCard.style.display = "none";
        }
    });
}
searchBar.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault()
        var searchTerm = searchBar.value.slice(0, 1).toUpperCase() + searchBar.value.slice(1).toLowerCase()
        searchCountries(searchTerm)
        console.log(searchTerm)
    }
})
document.getElementById("button-addon1").addEventListener("click", () => searchCountries(searchBar.value.slice(0, 1).toUpperCase() + searchBar.value.slice(1).toLowerCase()))
function refillPage() {
    document.querySelector("main").innerHTML = `
        <nav class="navbar pt-4">
            <div class="container-lg">
                <form>
                    <div class="input-group shadow rounded">
                        <button class="btn bg-white border-top border-start border-bottom" type="button"
                            id="button-addon1"><i class="bi bi-search"></i></button>
                        <input class="form-control" aria-describedby="button-addon1" type="search"
                            placeholder="Search for a country..." style="padding: 5px;" id="search-input">
                    </div>
                </form>
    
                <div class="dropdown-center">
                    <button class="btn bg-white dropdown-toggle shadow" id="dropdown" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false" ondblclick="refillPage()">
                        Filter by region
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item" onclick="filterCountries('Africa')">Africa</button></li>
                        <li><button class="dropdown-item" onclick="filterCountries('Americas')">Americas</button></li>
                        <li><button class="dropdown-item" onclick="filterCountries('Asia')">Asia</button></li>
                        <li><button class="dropdown-item" onclick="filterCountries('Europe')">Europe</button></li>
                        <li><button class="dropdown-item" onclick="filterCountries('Oceania')">Oceania</button></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-lg">
            <div class="country-list row d-flex justify-content-evenly" id="country-list">
            </div>
        </div>
    `
    countries.forEach(countryCard => {
        countryCard.className = "card p-0 col-2 m-3 shadow"
            countryCard.style.width = "14rem"
            countryCard.style.height = "18rem"
            countryCard.addEventListener("click", () => {
                showCountryDetails(countryCard.querySelector(".card-title"))
            })
        countryCard.style.display = "block"
        document.getElementById("country-list").appendChild(countryCard)
    })
    searchBar.value = ""
    searchBar.placeholder = "Search for a country..."
}


function showCountryDetails(country) {
    var languages = country.languages.map(lang => lang.name).join(", ")
    document.querySelector("main").innerHTML = `
                <div class="container-lg py-5">
                <div class="row ms-5"><button onclick="refillPage()" class="btn bg-white shadow-sm col-6 col-md-2" id="back"><i class="bi bi-arrow-left me-2"></i>Back</button></div>
                <div class="row m-5" id="container">
                    <div class="container-fluid col-12 col-md-6">
                        <img src="${country.flags.png}" class="img-fluid" alt="flag">
                    </div>
                    <div class="container-fluid col-12 col-md-6">
                        <div class="row mt-5 fw-bolder"><h3>${country.name}</h3></div>
                        <div class="row">
                            <ul class="col-12 col-md-6 my-2" style="list-style: none;">
                                <li><b>Native Name:</b> <span>${country.nativeName}</span></li>
                                <li><b>Population:</b> <span>${country.population.toLocaleString()}</span></li>
                                <li><b>Region:</b> <span>${country.region}</span></li>
                                <li><b>Sub Region:</b> <span>${country.subregion}</span></li>
                                <li><b>Capital:</b> <span>${country.capital}</span></li>
                            </ul>
                            <ul class="col-12 col-md-6 my-2" style="list-style: none;">
                                <li><b>Top Level Domain:</b> <span>${country.topLevelDomain[0]}</span></li>
                                <li><b>Currencies:</b> <span>${country.currencies[0].name}</span></li>
                                <li><b>Languages:</b> <span>${languages}</span></li>
                            </ul>
                        </div>
                        <div class="row">
                            <span class="col-4"><b>Border Countries:</b></span>
                            <span class="col-8">${country.borderCountries == undefined ? "Unknown" : country.borderCountries}</span>
                        </div>
                    </div>
                </div>
                </div>
            `
    document.querySelector("main").style.height = "200%"
}
function toggleDarkMode() {
    const back = document.getElementById("back")
    var mode = localStorage.getItem("mode")
    if (mode === "light") {
        document.querySelector("body").style.color = "white"
        document.querySelector("body").style.backgroundColor = "hsl(207, 26%, 17%)"

        document.getElementById("top-nav").classList.remove("bg-white")
        document.getElementById("top-nav").style.backgroundColor = "hsl(209, 23%, 22%)"
        document.querySelector("#top-nav a").style.color = "white"
        document.querySelector("#top-nav button").style.color = "white"
        document.querySelector("main").classList.remove("bg-light")
        document.querySelector("main").style.backgroundColor = "hsl(207, 26%, 17%)"
        if (searchBar && document.getElementById("dropdown")) {

            document.getElementById("button-addon1").classList.remove("bg-white", "border-top", "border-start", "border-bottom")
            document.getElementById("button-addon1").style.backgroundColor = "hsl(209, 23%, 22%)"
            document.querySelector("#button-addon1 i").style.color = "white"
            searchBar.style.backgroundColor = "hsl(209, 23%, 22%)"
            searchBar.style.color = "white"
            searchBar.style.border = "none"
            document.querySelector(".form-control").classList.add("white-placeholder")

            document.getElementById("dropdown").classList.remove("bg-white")
            document.getElementById("dropdown").style.color = "white"
            document.getElementById("dropdown").style.backgroundColor = "hsl(209, 23%, 22%)"
            document.querySelector(".dropdown-menu").classList.remove("bg-white")
            document.querySelector(".dropdown-menu").style.backgroundColor = "hsl(209, 23%, 22%)"
            document.querySelectorAll(".dropdown-menu li button").forEach(button => button.style.color = "white")


            document.querySelectorAll(".card").forEach(card => {
                card.style.backgroundColor = "hsl(209, 23%, 22%)"
                card.style.color = "white"
            })
        }
        else if (back) {
            back.classList.remove("bg-white")
            back.style.backgroundColor = "hsl(209, 23%, 22%)"
            back.style.color = "white"
            document.getElementById("container").style.backgroundColor = "hsl(207, 26%, 17%)"
            document.getElementById("container").style.color = "white"
            document.getElementById("container").parentElement.style.backgroundColor = "hsl(207, 26%, 17%)"
        }

        document.getElementById("moon").classList.replace("bi-moon", "bi-moon-fill")
        document.getElementById("moon").nextElementSibling.innerText = "Light Mode"

        localStorage.setItem("mode", "dark")



    } else {
        const back = document.getElementById("back")
        document.querySelector("body").style.color = "black"
        document.querySelector("body").style.backgroundColor = "white"

        document.getElementById("top-nav").classList.add("bg-white")
        document.getElementById("top-nav").style.backgroundColor = "white"
        document.querySelector("#top-nav a").style.color = "black"
        document.querySelector("#top-nav button").style.color = "black"
        document.querySelector("main").classList.add("bg-light")
        document.querySelector("main").style.backgroundColor = "white"

        if (searchBar && document.getElementById("dropdown")) {
            document.getElementById("button-addon1").classList.add("bg-white", "border-top", "border-start", "border-bottom")
            document.getElementById("button-addon1").style.backgroundColor = "white"
            document.querySelector("#button-addon1 i").style.color = "black"
            searchBar.style.backgroundColor = "white"
            searchBar.style.color = "black"
            searchBar.style.border = "1px solid #ced4da"
            document.querySelector(".form-control").classList.remove("white-placeholder")

            document.getElementById("dropdown").classList.add("bg-white")
            document.getElementById("dropdown").style.backgroundColor = "white"
            document.getElementById("dropdown").style.color = "black"
            document.querySelector(".dropdown-menu").classList.add("bg-white")
            document.querySelector(".dropdown-menu").style.backgroundColor = "white"
            document.querySelectorAll(".dropdown-menu li button").forEach(button => button.style.color = "black")


            document.querySelectorAll(".card").forEach(card => {
                card.style.backgroundColor = "white"
                card.style.color = "black"
            })
        }
        else if (back) {
            back.classList.add("bg-white")
            back.style.color = "black"
            document.getElementById("container").style.backgroundColor = "white"
            document.getElementById("container").style.color = "black"
            document.getElementById("container").parentElement.style.backgroundColor = "white"
            document.getElementById("container").parentElement.parentElement.style.backgroundColor = "white"
        }
        document.getElementById("moon").classList.replace("bi-moon-fill", "bi-moon")
        document.getElementById("moon").nextElementSibling.innerText = "Dark Mode"
        localStorage.setItem("mode", "light")



    }
}