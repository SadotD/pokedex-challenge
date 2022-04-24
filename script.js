const pokemonList = document.querySelector(".pokemon-list");

const previousPage = document.querySelector("#previousPage");
const nextPage = document.querySelector("#nextPage");

let offset = 1;
let limit = 19;

previousPage.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 20;
        removeChildNodes(pokemonList);
        fetchPokemons(offset, limit);
    }
});

nextPage.addEventListener("click", () => {
    offset += 20;
    removeChildNodes(pokemonList);
    fetchPokemons(offset, limit);
});

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createCard(data);
        });
}

function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}

function capitalizePokemonName(name) {
    return (capitalizedName = name.charAt(0).toUpperCase() + name.slice(1));
}

function addModalInfo(pokemon) {
    //
    // const closeModal = document.querySelector(".close-button");
    const modal = document.createElement("dialog");
    modal.classList.add("modal");
    modal.id = "modal";

    const closeContainer = document.createElement("div");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        modal.close();
    });
    closeContainer.appendChild(closeButton);
    modal.appendChild(closeContainer);

    const pokemonImg = document.createElement("img");
    pokemonImg.src = pokemon.sprites.front_default;

    const body = document.querySelector("body");
    body.appendChild(modal);
}

function createCard(pokemon) {
    const pokemonCard = document.createElement("li");
    pokemonCard.classList.add("pokemon-card");

    const pokemonButton = document.createElement("button");
    pokemonButton.classList.add("open-button");

    const pokemonImgContainer = document.createElement("div");
    pokemonImgContainer.classList.add("pokemon-img-container");

    const pokemonImg = document.createElement("img");
    pokemonImg.src = pokemon.sprites.front_default;
    pokemonImg.alt = pokemon.name;
    pokemonImg.loading = "lazy";

    pokemonImgContainer.appendChild(pokemonImg);

    const pokemonName = document.createElement("p");
    pokemonName.textContent = capitalizePokemonName(pokemon.name);

    pokemonButton.appendChild(pokemonImgContainer);
    pokemonButton.appendChild(pokemonName);
    pokemonButton.id = pokemon.id;
    pokemonButton.addEventListener("click", () => {
        addModalInfo(pokemon);
        const modal = document.querySelector("#modal");
        modal.showModal();
    });

    pokemonCard.appendChild(pokemonButton);

    pokemonList.appendChild(pokemonCard);
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);
