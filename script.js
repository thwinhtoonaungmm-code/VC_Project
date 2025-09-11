const words = document.querySelectorAll(".word");
const animals = document.querySelectorAll(".animal");
const result = document.getElementById("result");
let correctMatches = 0;

words.forEach(word => {
  word.addEventListener("dragstart", e => {
    e.dataTransfer.setData("animal", word.dataset.animal);
    e.target.classList.remove("correct", "wrong");
  });
});

animals.forEach(animal => {
  animal.addEventListener("dragover", e => {
    e.preventDefault();
  });

  animal.addEventListener("drop", e => {
    const draggedAnimal = e.dataTransfer.getData("animal");
    const wordElement = document.querySelector(`.word[data-animal="${draggedAnimal}"]`);
    
    if (animal.dataset.animal === draggedAnimal) {
      wordElement.classList.add("correct");
      correctMatches++;
    } else {
      wordElement.classList.add("wrong");
    }

    if (correctMatches === animals.length) {
      result.textContent = "🎉 Great job! You matched them all!";
    }
  });
});
