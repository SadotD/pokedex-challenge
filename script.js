const pokemonList = document.querySelector(".pokemon-list");

const previousPage = document.querySelector("#previousPage");
const nextPage = document.querySelector("#nextPage");

let offset = 1; // Initial Pokémon id to be fetched in the loop.
let limit = 19; // Number of Pokémon to be fetched after the initial id.

previousPage.addEventListener("click", () => {
    // Adds 20 to the initial Pokémon id to be fetched.
    if (offset != 1) {
        offset -= 20;
        removeChildNodes(pokemonList);
        fetchPokemons(offset, limit);
    }
});

nextPage.addEventListener("click", () => {
    // Subtract 20 to the initial Pokémon id to be fetched.
    if (offset <= 898 - (limit + 1)) {
        offset += 20;
        removeChildNodes(pokemonList);
        fetchPokemons(offset, limit);
    } else {
        offset = 879;
        removeChildNodes(pokemonList);
        fetchPokemons(offset, limit);
    }
});

async function fetchPokemons(offset, limit) {
    // Loop to fetch Pokémon, uses a start number and a qty. after the initial number.
    for (let i = offset; i <= offset + limit; i++) {
        await fetchPokemon(i);
    }
}

async function fetchPokemon(id) {
    // Fetch from the pokeapi based on the Pokémon Id number.
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createCard(data);
        });
}

function capitalizeName(name) {
    // Capitalize the first letter of the Pokémon's name.
    return (capitalizedName = name.charAt(0).toUpperCase() + name.slice(1));
}

function formatDetails(pokemon) {
    var formattedPokemon = {};
    formattedPokemon["base_experience"] = `${pokemon.base_experience} exp.`;
    formattedPokemon["height"] = `${pokemon.height / 10} m`;
    formattedPokemon["weight"] = `${pokemon.weight / 10} kg`;

    formattedPokemon["type"] = `${capitalizeName(pokemon.types[0].type.name)}`;

    if (pokemon.types[1]) {
        formattedPokemon["type"] = `${capitalizeName(
            pokemon.types[0].type.name
        )} ${capitalizeName(pokemon.types[1].type.name)}`;
    }

    return formattedPokemon;
}

function addModalInfo(pokemon) {
    //Create Modal with Pokémon Information.
    const previousModal = document.querySelector("dialog");
    if (previousModal) previousModal.remove();
    const body = document.querySelector("body");

    const modal = document.createElement("dialog");
    modal.classList.add("modal");
    modal.id = "modal";

    const closeContainer = document.createElement("div");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        modal.close();
        modal.remove();
    });
    closeContainer.appendChild(closeButton);
    modal.appendChild(closeContainer);

    const pokemonImg = document.createElement("img");
    pokemonImg.src = pokemon.sprites.front_default;
    pokemonImg.alt = pokemon.name;
    pokemonImg.classList.add("modal-img");
    modal.appendChild(pokemonImg);

    const pokemonName = document.createElement("p");
    pokemonName.textContent = capitalizeName(pokemon.name);
    modal.appendChild(pokemonName);

    const pokemonDetails = document.createElement("div");

    const formattedPokemon = formatDetails(pokemon);
    const detailsArray = [
        ["Base experience:", formattedPokemon.base_experience],
        ["Height:", formattedPokemon.height],
        ["Weight:", formattedPokemon.weight],
        ["Type:", formattedPokemon.type],
    ];

    for (let i = 0; i < detailsArray.length; i++) {
        const detailLine = document.createElement("div");

        const detailName = document.createElement("div");
        detailName.textContent = detailsArray[i][0];
        detailLine.appendChild(detailName);

        const detailValue = document.createElement("div");
        detailValue.textContent = detailsArray[i][1];
        detailLine.appendChild(detailValue);

        pokemonDetails.appendChild(detailLine);
    }

    modal.appendChild(pokemonDetails);

    body.appendChild(modal);
}

function createCard(pokemon) {
    // Create an individual Pokémon card with its image and name.
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
    pokemonName.textContent = capitalizeName(pokemon.name);

    pokemonButton.appendChild(pokemonImgContainer);
    pokemonButton.appendChild(pokemonName);

    pokemonButton.addEventListener("click", () => {
        addModalInfo(pokemon);
        const modal = document.querySelector("#modal");
        modal.showModal();
    });

    pokemonCard.id = pokemon.id;
    pokemonCard.appendChild(pokemonButton);

    pokemonList.appendChild(pokemonCard);
}

function removeChildNodes(parent) {
    // Remove children present in the parent node.
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit); // Fetch Pokémon to be displayed in the main section.
