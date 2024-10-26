import { createElement } from "./utils";
import ExternalData from "./ExternalData.mjs";
import Game from "./Game.mjs";

const externalData = new ExternalData();
const game = new Game();
let pokemonCards = [];
let cardContainer = null;

async function fetchPokemonDetails(id) {
  try {
    const pokemon = await externalData.getPokemonDetails(id);
    return pokemon;
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

async function PokemonCards(selectedPokemon, updateScore) {
  const randomIds = externalData.getRandomPokemonId(12);
  cardContainer = createElement(
    "div",
    { className: "card-container" },
    [],
  );

  for (const id of randomIds) {
    const pokemonDetails = await externalData.getPokemonDetails(id);

    const pokemonCard = createElement(
      "div",
      {
        className: "pokemon-card front",
      },
      [
        createElement("img", {
          src: pokemonDetails.image,
          alt: pokemonDetails.name,
        }),
        createElement("p", {textContent: pokemonDetails.name.toUpperCase() }),
      ],
    );
    const backPokemonCard = createElement("div", {className: "pokemon-card back"}, [
      createElement("img", {
        src: "../pokeball.png",
        alt: "Poke Ball",
      })
    ]);
    backPokemonCard.setAttribute("hidden", true);
    // backPokemonCard.removeAttribute("hidden");

    const cardDiv = createElement("div", {className: "card-wrapper"}, [
      pokemonCard,
      backPokemonCard
    ]);

    cardDiv.onclick= () => {
      OnClickCard();
      cardDiv.classList.toggle("flipped");
      const isUnique = !selectedPokemon.has(pokemonDetails.name);
      if (isUnique) {
        selectedPokemon.add(pokemonDetails.name);
        game.addScore();
      } else {
        game.resetScore();
        selectedPokemon.clear();
      }
      updateScore();

      // pokemonCards = game.shuffleCards(pokemonCards);

      // cardContainer.innerHTML = "";
      // pokemonCards.forEach((card) => cardContainer.appendChild(card));
    };

    pokemonCards.push(cardDiv);
    cardContainer.appendChild(cardDiv);
  }

  return cardContainer;
}

function FlipCardsToBack() {
  for (let card of pokemonCards) {
    card.childNodes[0].setAttribute("hidden", true);
    card.childNodes[1].removeAttribute("hidden");
  }
}

function FlipCardsToFront() {
  for (let card of pokemonCards) {
    card.childNodes[0].removeAttribute("hidden");
    card.childNodes[1].setAttribute("hidden", true);
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function OnClickCard() {
  FlipCardsToBack();
  await delay(1000);
  pokemonCards = game.shuffleCards(pokemonCards);

  cardContainer.innerHTML = "";
  pokemonCards.forEach((card) => cardContainer.appendChild(card));
  FlipCardsToFront();
}

async function App() {
  const main = createElement("main", {}, []);

  const updateScore = () => {
    document.querySelector(".current-score").textContent =
      `Current Score: ${game.getCurrentScore()}`;
    document.querySelector(".high-score").textContent =
      `High Score: ${game.getHighScore()}`;
  };

  const pokemonCards = await PokemonCards(new Set(), updateScore);
  const header = Header(game.getCurrentScore(), game.getHighScore());

  main.appendChild(pokemonCards);

  return createElement("div", {}, [header, main, Footer()]);
}

function Header(currentScore, highScore) {
  const appTitle = createElement("h1", {
    className: "app-title",
    textContent: "Pokemon Memory Card Game",
  });
  const appInstruction = createElement("p", {
    className: "app-instruction",
    textContent: "Avoid selecting the same card twice in a row",
  });

  const currentScoreElement = createElement("h2", {
    className: "current-score",
    textContent: `Current Score: ${currentScore}`,
  });
  const highScoreElement = createElement("h2", {
    className: "high-score",
    textContent: `High Score: ${highScore}`,
  });

  const scoreDiv = createElement("div", { className: "score" }, [
    currentScoreElement,
    highScoreElement,
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
