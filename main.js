// code here

let url;
// url = ``;
// url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`; // Cocktail Database - faily short
// url = `https://api2.binance.com/api/v3/ticker/24hr`; // Binance - very very long
// url = `https://api.coindesk.com/v1/bpi/currentprice.json`; // CoinDesk - normal short, cool
// url = `https://api.coingecko.com/api/v3/exchange_rates`; // CoinGecko - normal okay, really cool
// url = `https://api.imgflip.com/get_memes`; // Imgflip - long okay, cool
// url = `http://localhost:3000/results`; // iTunesSearch.json, it is local and may not be ideal
// url = `https://api.punkapi.com/v2/beers`; // PunkAPI - long okay, but it is beer :(
url = `https://rickandmortyapi.com/api/character/`; // Rick and Morty API - long cool, but do not know them

// Rick and Morty API
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const ul = document.getElementById("list-items");
  const divFirst = document.getElementById("first");
  const divSecond = document.getElementById("second");
  const divSecondLeft = document.getElementById("second-left");
  const divSecondRight = document.getElementById("second-right");
  const divThird = document.getElementById("third");

  const image = document.createElement("img");

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // see the data
      console.log(data);

      title.textContent = data.results[0].name;
      image.src = data.results[0].image;
      divFirst.appendChild(image);
      divSecondLeft.textContent = `Status: ${data.results[0].status}`;
      divSecondRight.textContent = `Location: ${data.results[0].location.name}`;
      divThird.textContent = `Click character name to see more.`;

      for (let character of data.results) {
        const li = document.createElement("li");
        li.textContent = character.name;

        li.addEventListener("mouseover", () => (li.style.cursor = "pointer"));
        li.addEventListener("click", () => {
          const personId = [...ul.children].indexOf(li) + 1;

          fetch(`${url}/${personId}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              title.textContent = data.name;
              image.src = data.image;
              divFirst.appendChild(image);
              divSecondLeft.textContent = `Status: ${data.status}`;
              divSecondRight.textContent = `Location: ${data.location.name}`;
              divThird.textContent = `${
                data.name
              } is ${data.gender.toLowerCase()}. We have ${
                data.episode.length
              } ${data.episode.length > 1 ? "episodes" : "episode"} about ${
                data.gender === "Male" ? "him" : "her"
              }. ${data.name} is ${data.species}.`;
            });
        });

        ul.appendChild(li);
      }
    });
});
