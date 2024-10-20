export function createElement(type, props = {}, children = []) {
  const element = document.createElement(type);

  Object.entries(props).forEach(([key, value]) => {
    if (~key.indexOf("-")) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });

  if (!Array.isArray(children)) {
    children = [children];
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}
