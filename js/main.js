document.addEventListener("DOMContentLoaded", () => {
  let url;

  url = `https://world.openfoodfacts.org/api/v0/product/737628064502.json`; // convoluted kinda, not cool
  url = `https://rickandmortyapi.com/api/character/`; // rick and morty API

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      const divTiles = document.querySelector(".tiles");

      for (const member of data.results) {
        const article = document.createElement("article");
        article.classList.add("tile");
        article.innerHTML = `
        <div class="tile-header">
        <h3>
        <span>${member.name}</span>
        <span>${member.species}</span>
        </h3>
        </div>
        <a href="#">
        <span>More info</span>
        <span><img src=${member.image} alt=${member.name} class="icon-button" /></span>
        </a>
        `;

        const namesOfCharacters = [];
        for (const member of data.results) namesOfCharacters.push(member.name);

        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");

        const closeModal = function () {
          modal.classList.add("hidden");
          overlay.classList.add("hidden");
        };

        article.addEventListener("click", (e) => {
          e.preventDefault();
          const clickedName =
            article.children[0].children[0].children[0].textContent;
          const characterId = namesOfCharacters.indexOf(clickedName) + 1;
          // console.log(characterId);
          modal.classList.remove("hidden");
          overlay.classList.remove("hidden");
          overlay.addEventListener("click", closeModal);

          fetch(`${url}/${characterId}`)
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);

              modal.innerHTML = `
              <div class="flex">
                <img
                  src=${data.image}
                  alt=${data.name}
                />
              </div>
              <h2>${data.name}</h2>
              <p>${data.gender}</p>
              <p>${data.species}</p>
              <p>${data.status}</p>
              <p>${data.episode.length} ${data.episode.length !== 1 ? 'episodes' : 'episode'}</p>
              `;
            });
        });

        divTiles.appendChild(article);
      }
    });
});
