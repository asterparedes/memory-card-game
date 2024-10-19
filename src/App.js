import { createElement } from "./utils";

function Header() {
    const appTitle = createElement("h1", { className: "app-title", textContent: "Pokemon Memory Card Game"});
    const appInstruction = createElement("p", {textContent: "Avoid selecting the same card twice in a row"});

    const currentScore = createElement("h2", {className: "current-score", textContent: "Current Score: "});
    const highScore = createElement("h2", {className: "high-score",textContent: "High Score: "});

    const scoreDiv = createElement("div", {}, [currentScore, highScore])
    return createElement("header", {}, [appTitle, appInstruction, scoreDiv]);
}

function App() {
    const main = createElement("main", {}, []);

    return createElement("div", {}, [Header(main), main]);
}

export default App;