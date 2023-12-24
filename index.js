const root = document.querySelector("#root");
const changeBtn = document.querySelector("#generator-btn");
const input = document.querySelector("#input");
const copyBtn = document.querySelector("#copyBtn");

let div = null;

changeBtn.addEventListener("click", function () {
  const generator = colorGenerator();
  root.style.backgroundColor = generator;
  input.value = generator;
  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(generator);
    if (div !== null) {
      div.remove();
      div = null;
    }
    if (isValidCode(input.value)) {
      toast(`${input.value} copied`);
    } else {
      alert("Please provide a valid code");
    }
  });
});

function toast(msg) {
  div = document.createElement("div");
  console.log(div);
  console.log(msg);
  div.className = "toastBtn animation-slide-in";
  div.innerText = msg;

  div.addEventListener("click", function () {
    div.classList.remove("animation-slide-in");
    div.classList.add("animation-slide-out");
    div.addEventListener("animationend", function () {
      div.remove();
      div = null;
    });
  });
  document.body.appendChild(div);
}

input.addEventListener("keyup", function (e) {
  const color = e.target.value;
  if (color && isValidCode(color)) {
    root.style.backgroundColor = color;
  }
});

function isValidCode(color) {
  if (color.length !== 7) return false;
  if (color[0] !== "#") return false;

  color = color.substring(1);
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

function colorGenerator() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
