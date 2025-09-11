const animals = [
  { name: "dog", emoji: "🐶" },
  { name: "cat", emoji: "🐱" },
  { name: "rabbit", emoji: "🐰" },
  { name: "frog", emoji: "🐸" },
  { name: "lion", emoji: "🦁" },
  { name: "monkey", emoji: "🐵" }
];

const wordList = document.getElementById("word-list");
const result = document.getElementById("result");
const nextLevelBtn = document.getElementById("nextLevel");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

let correctMatches = 0;

// Shuffle words
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create draggable word list
function createWords() {
  const shuffled = shuffle([...animals]);
  shuffled.forEach(animal => {
    const div = document.createElement("div");
    div.classList.add("word");
    div.setAttribute("draggable", "true");
    div.dataset.animal = animal.name;
    div.textContent = animal.name.charAt(0).toUpperCase() + animal.name.slice(1);
    wordList.appendChild(div);
  });

  addDragEvents();
}

function addDragEvents() {
  const words = document.querySelectorAll(".word");
  const animalBoxes = document.querySelectorAll(".animal");

  words.forEach(word => {
    word.addEventListener("dragstart", e => {
      e.dataTransfer.setData("animal", word.dataset.animal);
      e.target.classList.remove("correct", "wrong");
    });
  });

  animalBoxes.forEach((animalBox, index) => {
    animalBox.addEventListener("dragover", e => {
      e.preventDefault();
    });

    animalBox.addEventListener("drop", e => {
      const draggedAnimal = e.dataTransfer.getData("animal");
      const wordElement = document.querySelector(`.word[data-animal="${draggedAnimal}"]`);

      if (animalBox.dataset.animal === draggedAnimal) {
        if (!wordElement.classList.contains("correct")) {
          wordElement.classList.add("correct");
          correctMatches++;
          correctSound.play();
        }
      } e
