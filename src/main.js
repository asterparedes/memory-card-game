import App from "./App";

(async () => {
  const appElement = await App();
  document.getElementById("root").appendChild(appElement);
})();
