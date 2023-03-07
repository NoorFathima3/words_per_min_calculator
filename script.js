let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let wordCount = 0;
let wpm = 0;

// Update the word count and WPM
function updateStats() {
  const text = document.getElementById("text").value.trim();
  const words = text.split(/\s+/);
  wordCount = words.length;
  wpm = Math.round((wordCount / (elapsedTime / 60)) || 0);
  document.getElementById("wpm").textContent = wpm;
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Reset the timer and stats
function resetTimer() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  wordCount = 0;
  wpm = 0;
  document.getElementById("time").textContent = elapsedTime;
  document.getElementById("wpm").textContent = wpm;
  document.getElementById("text").value = "";
}

// Attach event listeners to the buttons
document.getElementById("start").addEventListener("click", () => {
  startTimer();
});

document.getElementById("stop").addEventListener("click", () => {
  stopTimer();
});

document.getElementById("restart").addEventListener("click", () => {
  resetTimer();
});

// Attach event listener to the text area
document.getElementById("text").addEventListener("input", () => {
  updateStats();
});

 // Array of possible words for the random paragraph
 const words = [
  'apple,',
  'banana,',
  'carrot,',
  'broccoli,',
  'kale,',
  'tomato,',
  'pepper,',
  'potato,',
  'lettuce,',
  'grapefruit,',
  'orange,',
  'mango,',
  'papaya,',
  'pear,',
  'watermelon,',
  'avocado,',
  'pineapple,',
  'strawberry,',
  'blueberry,',
  'car,',
  'truck,',
  'motorcycle,',
  'suv,',
  'bus,',
  'van,',
  'pizza,',
  'pasta,',
  'sushi,',
  'taco,',
  'burger,',
  'fries,',
  'hotdog,',
  'ramen,',
  'pho,',
  'enchiladas,',
  'curry,',
  'stir fry,',
  'lasagna,',
  'salad,',
  'burger,',
  'pancakes,',
  'waffles,',
  'omelette,',
  'smoothie,',
  'margarita,',
  'martini,',
  'beer,',
  'wine,',
  'soda,',
  'juice,'
];

    // Get a random paragraph
    function getRandomParagraph() {
      const numWords = Math.floor(Math.random() * 30) + 10; // Random number of words between 10 and 40
      let paragraph = '';
      for (let i = 0; i < numWords; i++) {
        paragraph += words[Math.floor(Math.random() * words.length)] + ' ';
      }
      return paragraph.trim();
    }

    // Set up variables
    const userInput = document.getElementById('user-input');
    const wpmDisplay = document.getElementById('wpm');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop');
    const randomParagraph = document.getElementById('random-paragraph');

    // Start the test
    function startTimer() {
      startTime = Date.now();
  timerInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("time").textContent = elapsedTime;
  }, 1000);
      // Generate a random paragraph and display it
      randomParagraph.textContent = getRandomParagraph();

      // Disable start button and enable stop button
      startBtn.disabled = true;
      stopBtn.disabled = false;

      // Start the timer
      startTime = Date.now();
      timerInterval = setInterval(updateTimer, 1000);
    }

    function displayTime() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      const timeString = hours + ':' + minutes + ' ' + ampm;
      console.log('timeString',timeString)
      document.getElementById('currenttime').innerHTML = timeString;
    }

    // Call displayTime every second to update the time
    setInterval(displayTime, 1000);

    // Stop the test
    function stopTest() {
      // Disable stop button and enable start button
      startBtn.disabled = false;
      stopBtn.disabled = true;

      // Stop the timer
      clearInterval(timerInterval);
      endTime = Date.now();

      // Calculate words per minute
      const timeInMinutes = (endTime - startTime) / 60000;
      const numWords = userInput.value.trim().split(' ').length;
      const wpm = Math.round(numWords / timeInMinutes);
      wpmDisplay.textContent = wpm;

      // Clear the input field
      userInput.value = '';
    }

    // Set up event listeners
    startBtn.addEventListener('click', startTest);
    stopBtn.addEventListener('click', stopTest);

