document.addEventListener("DOMContentLoaded", () => {
  let url;

  url = `https://world.openfoodfacts.org/api/v0/product/737628064502.json`; // convoluted kinda, not cool
  url = `https://rickandmortyapi.com/api/character/`; // rick and morty API

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const divTiles = document.querySelector(".tiles");

      for (const member of data.results) {
        const artcile = document.createElement("article");
        artcile.classList.add("tile");
        artcile.innerHTML = `
        <div class="tile-header">
        <h3>
        <span>${member.name}</span>
        <span>${member.species}</span>
        </h3>
        </div>
        <a href="#">
        <span>More details</span>
        <span><img src=${member.image} alt=${member.name} class="icon-button" /></span>
        </a>
        `;

        const namesOfCharacters = [];
        for (const member of data.results) namesOfCharacters.push(member.name);

        artcile.addEventListener("click", (e) => {
          e.preventDefault();
          const clickedName =
            artcile.children[0].children[0].children[0].textContent;
          const characterId = namesOfCharacters.indexOf(clickedName) + 1;
          console.log(characterId);
        });

        divTiles.appendChild(artcile);
      }
    });
});
