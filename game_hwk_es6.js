// on page load -> generate game board
window.onload = () => {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
}

// Global variables
let clicks;
let timeScore;

// Start button initiates game and starts counter
// Initiates game start on button press
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

function startGame() {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
    console.log(randomOrderArray);
    startTimer();
}

// End button stops the game
document.getElementById('endGame').addEventListener("click", endGame);

function endGame() {
    const endTimer = () => {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    }
    randomOrderArray = [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
}

// Create a random number function
// Creates a random number which will later be assigned an icon
// Creates an array of 12 random numbers

const randomOrderArray = [];

function setRandomTileOrder(numberOfTiles) {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.random() * (numberOfTiles - 1) + 1;
        randomNum = Math.round(randomNum);

        if (randomOrderArray.includes(randomNum)) {
            continue;
        } else {
            randomOrderArray.push(randomNum);
        }
    }
}

// Set tiles variable for use throughout code
const tiles = document.querySelectorAll(".gametile");

function setTiles() {
    let i = 0;

    for (const tile of tiles) {
        tile.innerHTML = randomOrderArray[i];

        // Replace numerical values with icon pairs
        if (tile.innerHTML < 3) {
            tile.innerHTML = rocket;
            tile.setAttribute("icon", "rocket");
        } else if (tile.innerHTML < 5) {
            tile.innerHTML = bacteria;
            tile.setAttribute("icon", "bacteria");
        } else if (tile.innerHTML < 7) {
            tile.innerHTML = cocktail;
            tile.setAttribute("icon", "cocktail");
        } else if (tile.innerHTML < 9) {
            tile.innerHTML = football;
            tile.setAttribute("icon", "football");
        } else if (tile.innerHTML < 11) {
            tile.innerHTML = pizza;
            tile.setAttribute("icon", "pizza");
        } else if (tile.innerHTML < 13) {
            tile.innerHTML = kiwi;
            tile.setAttribute("icon", "kiwi");
        } else {
            console.log("Error: too many tiles");
        }

        i++;
    }
}

let count = 0;
let timer;

function startTimer() {
    clearInterval(timer); // Clears the timer before starting it, preventing issues if the timer is triggered again when already running.
    timer = setInterval(() => {
        document.getElementById("timer").firstChild.innerText = count++;

        // End the timer when it reaches 60, displaying "Game Over."
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
}

// Define icon variables using template literals
const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

// Declare variables using const
const selectedTile = '';
let tileIcon;
const tileIcons = [];
const tileIds = [];

// Display tile function
const displayTile = (e) => {
    // Reveal tile by changing background color and changing font-size from 0 to 3em
    e.target.classList.remove("hideTile");
    e.target.classList.add("displayTile");

    // Log the value of the tile's icon and Id
    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    const tileId = e.target.getAttribute("id");
    tileIds.push(tileId);

    // Count the number of clicks
    countMoves();

    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds);
    }
};

// Check for matching tiles
const checkMatch = (tileIcons, tileIds) => {
    const n = tileIcons.length - 2;
    if (tileIcons[n] !== tileIcons[n + 1]) {
        console.log("no match");
        setTimeout(() => {
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
            document.getElementById(tileIds[n]).classList.remove("displayTile");
        }, 1000);
    } else {
        console.log("match");
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
    }
};

// Add event listeners using modern syntax
tiles.forEach(tile => tile.addEventListener("click", displayTile));

let n = 0;

function countMoves() {
    n++;
}

// Count the number of user clicks, needed to calculate the score
function countMoves() {
    clicks = n;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
}

// Clear tiles when a new game is started
function clearTiles() {
    for (let n = 0; n < tiles.length; n++) {
        tiles[n].style.fontSize = "0em";
        tiles[n].style.backgroundColor = "#44445a";
    }
}

// Match tiles when one tile is clicked and displayed, check if the next tile clicked has the same attribute value.
// If they match, icons remain displayed and correctly guessed tiles become disabled.
// Count the number of tiles with the "correct" attribute value each time a pair of tiles is matched.
function countCorrectAnswers() {
    const correctTiles = tiles.filter(tile => tile.getAttribute("guess") === "correct");
    return correctTiles.length;
}

// Compare game when the number of correct answers matches the number of cells the game can end.
function compareGame() {
    const correctAnswers = countCorrectAnswers();
    const totalTiles = tiles.length;
    if (correctAnswers === totalTiles / 2) {
        endGame();
    }
}

// Calculate the score by adding the number of clicks and elapsed time
// to calculate a score and display the score upon game completion.
function calculateScore() {
    timeScore = parseInt(timeScore);
    const calculatedScore = timeScore + clicks;
    console.log(calculatedScore);
    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
}

// Reset tiles, invoked by the "New Game" button, to reset tile values and return them to their default styling.
function resetTiles() {
    for (const tile of tiles) {
        tile.style.backgroundColor = "#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
}

// Generate a random RGB color value
function generateRGBVal() {
    const generateRandomColor = () => Math.round(Math.random() * 255);

    const rgbValue = Array.from({ length: 3 }, () => generateRandomColor());
    newRGB = `rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]})`;
    return newRGB;
}

// Additional iterations and future development ideas:
// - Publish a leaderboard.
// - Use an API to generate random icons or pictures.

// Note: Make sure to define the variables like `rocket`, `mask`, etc., if they're not already defined in your code.
