const displayDiceRolls = document.getElementById("dice-area");
const userSelection = document.getElementById("user-selection");

const d6faces = [
  "\u{2680}",
  "\u{2681}",
  "\u{2682}",
  "\u{2683}",
  "\u{2684}",
  "\u{2685}",
];

const predefinedDiceTypes = ["d4", "d6", "d8", "d10", "d12", "d20"];

// select element to choose dice type
const diceSelection = document.createElement("select");
diceSelection.setAttribute("name", "dice-selection");
diceSelection.setAttribute("value", "d6");
const diceSelectionLabel = document.createElement("label");
diceSelectionLabel.setAttribute("for", "dice-selection");
diceSelectionLabel.innerText = "Select a die type: ";
diceSelectionLabel.appendChild(diceSelection);

// number input element to choose number of dice
const diceAmount = document.createElement("input");
const diceAmountLabel = document.createElement("label");
diceAmount.setAttribute("type", "number");
diceAmount.setAttribute("name", "dice-amount");
diceAmount.setAttribute("min", "1");
diceAmount.setAttribute("value", "1");
diceAmountLabel.setAttribute("for", "dice-amount");
diceAmountLabel.innerText = "Amount of dice to roll: ";
diceAmountLabel.appendChild(diceAmount);
diceAmountLabel.style.marginLeft = "10px";

// create options for dice type
for (let i = 0; i < predefinedDiceTypes.length; i++) {
  const diceOption = document.createElement("option");
  diceOption.value = predefinedDiceTypes[i];
  diceOption.innerText = predefinedDiceTypes[i];
  diceSelection.appendChild(diceOption);
}

// roll button and roll dice with user given parameters
const rollButton = document.createElement("button");
rollButton.setAttribute("id", "roll-button");
rollButton.innerText = "Roll Dice";
rollButton.style.marginLeft = "10px";
rollButton.addEventListener("click", () => {
  let diceRollResults = document.createElement("div");
  diceRollResults.setAttribute("class", "dice-results");
  let diceTyping = "";
  if (diceAmount.value < 1) {
    alert("Please select at least one die to roll.");
    return;
  } else {
    switch (diceSelection.value) {
      case "d4":
        diceTyping = "4";
        break;
      case "d6":
        diceTyping = "6";
        break;
      case "d8":
        diceTyping = "8";
        break;
      case "d10":
        diceTyping = "10";
        break;
      case "d12":
        diceTyping = "12";
        break;
      case "d20":
        diceTyping = "20";
        break;
    }
  }

  displayDiceRolls.appendChild(diceRollResults);
  createDice(diceTyping, diceAmount.value, diceRollResults);
});

userSelection.contains(diceSelectionLabel)
  ? null
  : userSelection.appendChild(diceSelectionLabel);
userSelection.contains(diceAmountLabel)
  ? null
  : userSelection.appendChild(diceAmountLabel);
userSelection.contains(rollButton)
  ? null
  : userSelection.appendChild(rollButton);

// variable to store the number of results
let resultIteration = 0;

/**
 * create a number of dice based on user input, then roll them
 * @param {string} diceType d4, d6, d8, d10, d12, d20
 * @param {number} numOfDice number of dice to roll
 * @param {*} areaToDisplay element to display the results 
 * 
 */
function createDice(diceType, numOfDice, areaToDisplay) {
  resultIteration++;
  let resultNumber = document.createElement("p");
  resultNumber.setAttribute("class", "result-number");
  resultNumber.innerText = `Result ${resultIteration}: `;
  areaToDisplay.appendChild(resultNumber);
  for (let i = 0; i < numOfDice; i++) {
    let rollingDice = document.createElement("div");
    diceType === "6"
      ? rollingDice.setAttribute("class", "dice6")
      : rollingDice.setAttribute("class", "diceMultiface");
    diceType === "6"
      ? (rollingDice.textContent = d6faces[Math.floor(Math.random() * 6)])
      : (rollingDice.textContent =
          Math.floor(Math.random() * parseInt(diceType)) + 1);
    areaToDisplay.appendChild(rollingDice);
    spinDice(rollingDice, diceType, 2000);
  }
}

/**
 * 
 * @param {*} theDice dice element to animate
 * @param {*} diceType dice faces e.g 4, 6, 8, 10, 12, 20
 * @param {*} animDuration animation duration in milliseconds
 */
function spinDice(theDice, diceType, animDuration) {
  let animatedRollingDice = setInterval(function () {
    diceType === "6"
      ? (theDice.textContent = d6faces[Math.floor(Math.random() * 6)])
      : (theDice.textContent =
          Math.floor(Math.random() * parseInt(diceType)) + 1);
  }, 100);
  setTimeout(function () {
    clearInterval(animatedRollingDice);
  }, animDuration);
}
/**
 * clear all results from the screen
 */
function clearResults() {
  let diceResults = document.querySelectorAll(".dice-results");
  for (let i = 0; i < diceResults.length; i++) {
    diceResults[i].remove();
  }
  displayDiceRolls.innerHTML = "";
  resultIteration = 0;
}
