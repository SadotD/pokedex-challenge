// const modal = document.querySelector("#modal");
// const openModal = document.querySelector(".open-button");
// const closeModal = document.querySelector(".close-button");

// openModal.addEventListener("click", () => {
//     modal.showModal();
// });

// closeModal.addEventListener("click", () => {
//     modal.close();
// });

const pokemonList = document.querySelector(".pokemon-list");

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createCard(data);
        });
}

function fetchPokemons(number) {
    for (let i = 1; i <= number; i++) {
        fetchPokemon(i);
    }
}

function pokemonNameCapitalize(name) {
    return (capitalizedName = name.charAt(0).toUpperCase() + name.slice(1));
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
    pokemonImg.loading = "lazy";

    pokemonImgContainer.appendChild(pokemonImg);

    const pokemonName = document.createElement("p");
    pokemonName.textContent = `${pokemonNameCapitalize(pokemon.name)}`;

    pokemonButton.appendChild(pokemonImgContainer);
    pokemonButton.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonButton);

    pokemonList.appendChild(pokemonCard);
}

fetchPokemons(24);
