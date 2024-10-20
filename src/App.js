import { createElement } from "./utils";
import ExternalData from "./ExternalData.mjs";

const externalData = new ExternalData();

async function PokemonCards() {
  const pokemonList = await externalData.getPokemonData(12);
  console.log(pokemonList);
  const cardContainer = createElement(
    "div",
    { className: "card-container" },
    [],
  );

  for (const pokemon of pokemonList) {
    const pokemonDetails = await externalData.getPokemonDetails(pokemon.url);
    console.log(pokemonDetails);
    const pokemonCard = createElement("div", { className: "pokemon-card" }, [
      createElement("img", {
        src: pokemonDetails.image,
        alt: pokemonDetails.name,
      }),
      createElement("p", { textContent: pokemonDetails.name.toUpperCase() }),
    ]);
    cardContainer.appendChild(pokemonCard);
  }

  return cardContainer;
}

async function App() {
  const main = createElement("main", {}, []);
  const pokemonCards = await PokemonCards();
  main.appendChild(pokemonCards);

  return createElement("div", {}, [Header(), main, Footer()]);
}

function Header() {
  const appTitle = createElement("h1", {
    className: "app-title",
    textContent: "Pokemon Memory Card Game",
  });
  const appInstruction = createElement("p", {
    className: "app-instruction",
    textContent: "Avoid selecting the same card twice in a row",
  });

  const currentScore = createElement("h2", {
    className: "current-score",
    textContent: "Current Score: ",
  });
  const highScore = createElement("h2", {
    className: "high-score",
    textContent: "High Score: ",
  });

  const scoreDiv = createElement("div", { className: "score" }, [
    currentScore,
    highScore,
  ]);
  return createElement("header", {}, [appTitle, appInstruction, scoreDiv]);
}

function Footer() {
  const copyright = createElement("p", {
    textContent: `© ${new Date().getFullYear()}--`,
  });
  const name = createElement("p", {
    className: "name",
    textContent: "Aster Paredes Morales | WDD330 | Final Project",
  });

  return createElement("footer", {}, [copyright, name]);
}

export default App;
