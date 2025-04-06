const diceRollingArea = document.getElementById("dice-area");

const d6faces = [
  "\u{2680}",
  "\u{2681}",
  "\u{2682}",
  "\u{2683}",
  "\u{2684}",
  "\u{2685}",
];

function testCreateDice() {
  let rollingDice = document.createElement("div");
  rollingDice.setAttribute("class", "diceroll");
  rollingDice.textContent = d6faces[Math.floor(Math.random() * 6)];
  diceRollingArea.appendChild(rollingDice);
  spinDice(rollingDice, 2000);
}

function spinDice(theDice, animDuration) {
    let animatedRollingDice = setInterval(function() {
    theDice.textContent = d6faces[Math.floor(Math.random() * 6)];
    }, 100);
    setTimeout(function(){
        clearInterval(animatedRollingDice);
    }, animDuration);
}

// setInterval(testCreateDice, 5000);
