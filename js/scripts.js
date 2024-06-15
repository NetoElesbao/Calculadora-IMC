// Data
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0", //
    info: "Obesidade grave", //
    obesity: "III", //
  },
];

// Seletores
const imcTable = document.querySelector("#imc-table");

const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#back-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");
// console.log(imcNumber, imcInfo);

// Funcções

function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function clearInputs() {
  heightInput.value = "";
  weightInput.value = "";

  imcNumber.classList = "";
  imcInfo.classList = "";
}

function validInput(input) {
  return input.replace(/[^0-9,]/g, "");
}

function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// Inicialização
createTable(data);

// Evento
[heightInput, weightInput].forEach((input) => {
  input.addEventListener("input", (character) => {
    // console.log(character.target.value);
    const updateInput = validInput(character.target.value);

    character.target.value = updateInput;
  });
});

calcBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const height = +heightInput.value.replace(",", ".");
  const weight = +weightInput.value.replace(",", ".");
  // console.log(height, " | ", weight);

  if (!weight || !height) return;

  // console.log(calcImc(weight, height));

  const imc = calcImc(weight, height);

  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });
  console.log(info);

  if (!info) return;

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("hight");
      imcInfo.classList.add("hight");
      break;

    default:
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener("click", (event) => {
  event.preventDefault();

  clearInputs();
});

backBtn.addEventListener("click", (event) => {
  clearInputs();
  showOrHideResults();
});
