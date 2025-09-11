// Vietnamese animal vocabulary
const animalsLevel1 = [
  { name: "cho", emoji: "🐶", vi: "Chó" },
  { name: "meo", emoji: "🐱", vi: "Mèo" },
  { name: "tho", emoji: "🐰", vi: "Thỏ" }
];

const animalsLevel2 = [
  { name: "cho", emoji: "🐶", vi: "Chó" },
  { name: "meo", emoji: "🐱", vi: "Mèo" },
  { name: "tho", emoji: "🐰", vi: "Thỏ" },
  { name: "ech", emoji: "🐸", vi: "Ếch" },
  { name: "su-tu", emoji: "🦁", vi: "Sư tử" },
  { name: "khi", emoji: "🐵", vi: "Khỉ" }
];

// ✅ Rest of the script is the same, only use `animal.vi` for word text


// DOM elements
const menuScreen = document.getElementById("menu-screen");
const instructionsScreen = document.getElementById("instructions-screen");
const creditsScreen = document.getElementById("credits-screen");
const gameScreen = document.getElementById("game-screen");
const winScreen = document.getElementById("win-screen");

const imageList = document.getElementById("image-list");
const wordList = document.getElementById("word-list");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const levelTitle = document.getElementById("level-title");
const finalScore = document.getElementById("final-score");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

let currentLevel = 1;
let animals = [];
let correctMatches = 0;
let score = 0;

// Show menu
function goToMenu() {
  hideAllScreens();
  menuScreen.classList.add("active");
}

function showInstructions() {
  hideAllScreens();
  instructionsScreen.classList.add("active");
}

function showCredits() {
  hideAllScreens();
  creditsScreen.classList.add("active");
}

function hideAllScreens() {
  [menuScreen, instructionsScreen, creditsScreen, gameScreen, winScreen].forEach(screen =>
    screen.classList.remove("active")
  );
}

// Start game
function startGame(level) {
  currentLevel = level;
  animals = level === 1 ? animalsLevel1 : animalsLevel2;

  hideAllScreens();
  gameScreen.classList.add("active");
  levelTitle.textContent = `Level ${level}`;
  score = 0;
  correctMatches = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  result.textContent = "";

  setupGame();
}

function setupGame() {
  imageList.innerHTML = "";
  wordList.innerHTML = "";

  // Add images
  animals.forEach(animal => {
    const div = document.createElement("div");
    div.classList.add("animal");
    div.dataset.animal = animal.name;
    div.textContent = animal.emoji;
    imageList.appendChild(div);
  });

  // Shuffle and add words
  shuffle([...animals]).forEach(animal => {
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

  animalBoxes.forEach(animalBox => {
    animalBox.addEventListener("dragover", e => e.preventDefault());

    animalBox.addEventListener("drop", e => {
      const draggedAnimal = e.dataTransfer.getData("animal");
      const wordElement = document.querySelector(`.word[data-animal="${draggedAnimal}"]`);

      if (animalBox.dataset.animal === draggedAnimal) {
        if (!wordElement.classList.contains("correct")) {
          wordElement.classList.add("correct");
          correctMatches++;
          score += 10;
          scoreDisplay.textContent = `Score: ${score}`;
          correctSound.play();
        }
      } else {
        wordElement.classList.add("wrong");
        score -= 5;
        scoreDisplay.textContent = `Score: ${score}`;
        wrongSound.play();
      }

      if (correctMatches === animals.length) {
        gameOver();
      }
    });
  });
}

function gameOver() {
  hideAllScreens();
  winScreen.classList.add("active");
  winSound.play();
  finalScore.textContent = `Your Score: ${score}`;
}

function restartGame() {
  startGame(currentLevel);
}

// Helper shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start at menu
goToMenu();
