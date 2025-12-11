let currentId = 1;

// BUSCAR POKEMON
async function searchPokemon() {
  const input = document.getElementById("pokeInput").value.toLowerCase();
  fetchPokemon(input);
}

// ANTERIOR / PRÓXIMO
function prevPokemon() {
  if (currentId > 1) currentId--;
  fetchPokemon(currentId);
}

function nextPokemon() {
  currentId++;
  fetchPokemon(currentId);
}

// FUNÇÃO PRINCIPAL
async function fetchPokemon(identifier) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
    const data = await response.json();

    currentId = data.id;

    // IMAGEM
    document.getElementById("pokeImg").src =
      data.sprites.other["official-artwork"].front_default;

    // NOME E ID
    document.getElementById("pokeName").textContent =
      data.name.charAt(0).toUpperCase() + data.name.slice(1);
    document.getElementById("pokeId").textContent = `ID: ${data.id}`;

    // TIPOS
    const typesDiv = document.getElementById("pokeTypes");
    typesDiv.innerHTML = "";
    data.types.forEach(t => {
      const span = document.createElement("span");
      span.classList.add("type");
      span.textContent = t.type.name;
      span.style.background = typeColor(t.type.name);
      typesDiv.appendChild(span);
    });

    // DESCRIÇÃO
    const species = await fetch(data.species.url);
    const speciesData = await species.json();

    const desc = speciesData.flavor_text_entries.find(
      t => t.language.name === "en"
    ).flavor_text;

    document.getElementById("pokeDesc").textContent = desc.replace(/\f/g, " ");

  } catch {
    document.getElementById("pokeName").textContent = "Não encontrado";
    document.getElementById("pokeImg").src = "";
    document.getElementById("pokeDesc").textContent = "";
  }
}

// CORES DOS TIPOS
function typeColor(type) {
  const colors = {
    fire: "#EE8130",
    water: "#6390F0",
    grass: "#7AC74C",
    electric: "#F7D02C",
    flying: "#A98FF3",
    poison: "#A33EA1",
    bug: "#A6B91A",
    dragon: "#6F35FC",
    normal: "#A8A77A",
    ground: "#E2BF65",
    fairy: "#D685AD",
    fighting: "#C22E28",
    ice: "#96D9D6",
    rock: "#B6A136",
    psychic: "#F95587",
    steel: "#B7B7CE",
    ghost: "#735797",
    dark: "#705746"
  };
  return colors[type] || "#000";
}

// Carrega o 1º Pokémon ao abrir
fetchPokemon(1);