let debounceTimer;
let allCountries = [];

document.getElementById("txtSearchValue").addEventListener("input", function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        searchCountry(this.value);
    }, 300);
});

function searchCountry(searchValue) {
    if (searchValue.length < 2) {
        document.getElementById("searchResults").innerHTML = "";
        return;
    }

    const filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );

    let resultsHtml = filteredCountries.map(country => 
        `<div class="country-item" onclick="showCountryDetails('${country.cca3}')">
            <img src="${country.flags.svg}" alt="${country.name.common} flag" class="country-flag">
            <span>${country.name.common}</span>
        </div>`
    ).join('');

    document.getElementById("searchResults").innerHTML = resultsHtml || "No countries found";
}

function showCountryDetails(countryCode) {
    const country = allCountries.find(c => c.cca3 === countryCode);
    if (country) {
        const popupContent = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.svg}" alt="${country.name.common} flag" class="country-flag-large">
            <p><strong>Official Name:</strong> ${country.name.official}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion || 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
            <p><strong>Currencies:</strong> ${Object.values(country.currencies || {}).map(c => c.name).join(', ')}</p>
        `;
        document.getElementById("popup-content").innerHTML = popupContent;
        document.getElementById("popup").style.display = "flex";
    }
}

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
        allCountries = data;
        let tblCountries = document.getElementById("tbl");
        let tblBody = `<tr>
                        <th>Name</th>
                        <th>Flag</th>
                    </tr>`;
        data.forEach((element) => {
            tblBody += `<tr onclick="showCountryDetails('${element.cca3}')">
                        <td>${element.name.common}</td>
                        <td><img src="${element.flags.png}" alt="${element.name.common} flag" class="table-flag"></td>
                    </tr>`;
        });
        tblCountries.innerHTML = tblBody;
    });