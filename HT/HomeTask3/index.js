class Transport {
  constructor(brand, data = {}) {
    this.brand = brand;
    this.data = data;
  }
  ride() {
    console.log(`${this.brand} рухається`);
  }
  stop() {
    console.log(`${this.brand} зупиняється`);
  }
}

class Car extends Transport {
  constructor(brand, data) {
    super(brand, data);
    this.type = "car";
  }
  ride() {
    console.log(`🚗 ${this.brand} (км/ч: ${this.data.speed || 120})`);
  }
}

class Bike extends Transport {
  constructor(brand, data) {
    super(brand, data);
    this.type = "bike";
  }
  ride() {
    console.log(`🏍️ ${this.brand} (макс: ${this.data.maxSpeed || 300})`);
  }
}

class Truck extends Transport {
  constructor(brand, data) {
    super(brand, data);
    this.type = "truck";
  }
  ride() {
    console.log(`🚛 ${this.brand} везе вантаж (${this.data.load || "10т"})`);
  }
}

class TransportFactory {
  static create(type, brand, data = {}) {
    const types = { car: Car, bike: Bike, truck: Truck };
    const Class = types[type.toLowerCase()];
    if (!Class) throw new Error(`Тип "${type}" не існує`);
    return new Class(brand, data);
  }
}

const vehicles = [
  TransportFactory.create("car", "Tesla", { speed: 250, date: "2026-01-09" }),
  TransportFactory.create("bike", "Harley", { maxSpeed: 220 }),
  TransportFactory.create("truck", "Volvo", { load: "25т" }),
];

vehicles.forEach((v) => {
  console.log(`Тип: ${v.type}, Data:`, v.data);
  v.ride();
  v.stop();
  console.log("─".repeat(40));
});
// SecondTask
const charactersContainer = document.getElementById("characters");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("pageInfo");
const prevBottom = document.getElementById("prevBottom");
const nextBottom = document.getElementById("nextBottom");
const pageInfoBottom = document.getElementById("pageInfoBottom");

let currentPageUrl = "https://rickandmortyapi.com/api/character";
let currentPageNumber = 1;
let totalPages = 1;

function updateButtonsAndPageInfo() {
  const isFirst = currentPageNumber === 1;
  const isLast = currentPageNumber === totalPages;

  prevBtn.disabled = isFirst;
  prevBottom.disabled = isFirst;
  nextBtn.disabled = isLast;
  nextBottom.disabled = isLast;

  pageInfo.textContent = `Page ${currentPageNumber}`;
  pageInfoBottom.textContent = `Page ${currentPageNumber}`;
}

async function loadCharacters(url) {
  charactersContainer.innerHTML = '<div class="loading">Завантаження...</div>';
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  prevBottom.disabled = true;
  nextBottom.disabled = true;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Проблема з мережею");
    const data = await response.json();

    totalPages = data.info.pages;
    currentPageNumber = getPageNumberFromUrl(url);

    charactersContainer.innerHTML = "";

    data.results.forEach((char) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
            <img src="${char.image}" alt="${char.name}" loading="lazy">
            <div class="card-info">
              <h3>${char.name}</h3>
              <p>${char.species} — ${char.status}</p>
            </div>
          `;

      charactersContainer.appendChild(card);
    });

    updateButtonsAndPageInfo();
  } catch (error) {
    charactersContainer.innerHTML = `
          <div class="loading error">
            Щось пішло не так... 😿<br>
            ${error.message}
          </div>`;
  }
}

function getPageNumberFromUrl(url) {
  const params = new URLSearchParams(new URL(url).search);
  return parseInt(params.get("page") || "1");
}

loadCharacters(currentPageUrl);

nextBtn.addEventListener("click", () => {
  if (nextBtn.disabled) return;
  currentPageUrl = `https://rickandmortyapi.com/api/character?page=${
    currentPageNumber + 1
  }`;
  loadCharacters(currentPageUrl);
});

prevBtn.addEventListener("click", () => {
  if (prevBtn.disabled) return;
  currentPageUrl = `https://rickandmortyapi.com/api/character?page=${
    currentPageNumber - 1
  }`;
  loadCharacters(currentPageUrl);
});

nextBottom.addEventListener("click", () => nextBtn.click());
prevBottom.addEventListener("click", () => prevBtn.click());
