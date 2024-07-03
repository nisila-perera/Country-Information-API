fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    let tblCountries = document.getElementById("tbl");

    let tblBody = `<tr>
                    <th>Name</th>
                    <th>Capital</th>
                    <th>Flag</th>
                </tr>`;

    data.forEach((element) => {
      tblBody += `<tr>
                    <td>${element.name.common}</td>
                    <td>${element.capital}</td>
                    <td><img src="${element.flags.png}" width="50px"></td>
                </tr>`;
    });

    tblCountries.innerHTML = tblBody;
  });

function serch() {
  let searchValue = document.getElementById("txtSearchValue").value;

  let officialName = document.getElementById("officialName");
  let name = document.getElementById("name");
  let capital = document.getElementById("capital");
  let img = document.getElementById("img");

  console.log(searchValue);
  fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((obj) => {
        officialName.innerText = obj.name.official;
        name.innerText = obj.name.common;
        capital.innerText = obj.capital[0];

        img.innerHTML = `<img src="${obj.flags.png}" alt="">`;
      });
      console.log(data);
    });
}
