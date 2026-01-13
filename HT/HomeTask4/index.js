const charactersContainer = document.getElementById("characters");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalStatus = document.getElementById("modal-status");
const modalSpecies = document.getElementById("modal-species");
const modalLocation = document.getElementById("modal-location");
const closeBtn = document.querySelector(".close-btn");
const loader = document.getElementById("loader");

let nextPageUrl = "https://rickandmortyapi.com/api/character";
let isLoading = false;
let hasMore = true;

async function loadCharacters() {
  if (!hasMore || isLoading) return;

  isLoading = true;
  loader.style.display = "block";

  try {
    const response = await fetch(nextPageUrl);
    if (!response.ok) throw new Error("Помилка мережі");
    const data = await response.json();

    data.results.forEach((char) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.id = char.id;

      card.innerHTML = `
            <img src="${char.image}" alt="${char.name}" loading="lazy">
            <div class="card-info">
              <h3>${char.name}</h3>
              <p>${char.species} — ${char.status}</p>
            </div>
          `;

      charactersContainer.appendChild(card);
    });

    nextPageUrl = data.info.next;
    if (!nextPageUrl) {
      hasMore = false;
      loader.style.display = "none";
    }
  } catch (error) {
    console.error(error);
    charactersContainer.insertAdjacentHTML(
      "beforeend",
      `
          <div class="loading error">Щось пішло не так... 😿<br>${error.message}</div>
        `
    );
  } finally {
    isLoading = false;
    loader.style.display = "none";
  }
}

loadCharacters();

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
    loadCharacters();
  }
});

charactersContainer.addEventListener("click", async (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const id = card.dataset.id;
  if (!id) return;

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const char = await response.json();

    modalImage.src = char.image;
    modalName.textContent = char.name;
    modalStatus.textContent = char.status;
    modalSpecies.textContent = char.species;
    modalLocation.textContent = char.location.name;

    modal.classList.add("active");
  } catch (err) {
    console.error("Помилка завантаження детальної інформації:", err);
  }
});

function closeModal() {
  modal.classList.remove("active");
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
