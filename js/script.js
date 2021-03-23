/******************************************
RANDOM QUOTE GENERATOR

The following script contains source code for a website that
displays random quotes to a user. Every ten seconds the
website automatically updates the quote, but the user
can also change the displayed quote by clicking a button.
******************************************/

/**
 * Array that holds each quote object.
 * Every quote is expected to have a quote, source
 * and image property, but can also contain a
 * citation and a year.
*/
const quotes = [
  {
    quote: "“Be yourself; everyone else is already taken.",
    source: "Oscar Wilde",
    image: "img/oscar-wilde.jpeg"
  },
  {
    quote: "What lies behind you and what lies in front of you, pales in comparison to what lies inside of you. ",
    source: "Ralph Waldo Emerson",
    image: "img/emerson.jpeg"
  },
  {
    quote: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
    source: "Martin Luther King Jr.",
    citation: "A Testament of Hope: The Essential Writings and Speeches",
    year: 1986,
    image: "img/mlk.jpeg"
  },
  {
    quote: '"I wish it need not have happened in my time," said Frodo. "So do I," said Gandalf, "and so do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given us.”',
    source: "J.R.R. Tolkien",
    citation: "The Fellowship of the Ring",
    year: 1954,
    image: "img/tolkien.jpeg"
  },
  {
    quote: "You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it.",
    source: "Harper Lee",
    citation: "To Kill A Mockingbird",
    year: 1960,
    image: "img/harperlee.jpg"
  },
  {
    quote: "A great book should leave you with many experiences, and slightly exhausted at the end. You live several lives while reading.",
    source: "William Styron",
    citation: "Conversations with William Styron",
    year: 1985,
    image: "img/William_Styron.jpeg"
  }
]

/**
 * Function that returns a number from
 * 0 to the number provided, exclusive.
 * @param {Number}  upperBound The upper bound for the potential random number
 * @return {Number}            The generated random number
 */
function getRandomNumber(upperBound)
{
  return Math.floor(Math.random() * Math.floor(upperBound));
}

/**
 * Function that selects and returns a random quote 
 * from the 'quotes' array
*/
let prevNum = 0;
function getRandomQuote() {
  // Set initial value of random index
  let randomNum = getRandomNumber(quotes.length);
  // To prevent same quote generating twice in a row,
  // loop until randomNum is different from previous number
  while (randomNum == prevNum) {
    randomNum = getRandomNumber(quotes.length);
  }
  // Set the prevNum value to equal our current value.
  prevNum = randomNum;
  return quotes[randomNum];
}

/**
 * Function to retrieve a random quote and to place it on the screen.
*/

function printQuote() {
  // Retrieve the quote
  let quote = getRandomQuote();
  // Create the initial string
  let html = `<img class="icon" src=${quote.image}>
              <p class="quote">${quote.quote}</p>
              <p class="source">${quote.source}`;
  // If there is a citation, add the citation
  if (typeof(quote.citation) !== "undefined") {
    html += `<span class="citation">${quote.citation}</span>`;
  }
  // If there is a year, add the year
  if (typeof(quote.year) !== "undefined") {
    html += `<span class="year">${quote.year}</span>`;
  }              
  html += `</p>`;

  // Add the quote to the screen in the quote-box element
  document.getElementById('quote-box').innerHTML = html;
  // Change the background color
  changeBackgroundColor();
}


/**
 * Function to change the website's background color
 */
let prevColorNum = 0;
const colors = ["rgb(212, 151, 123)", "rgb(179, 123, 212)", "rgb(145, 212, 123)", "rgb(212, 123, 123)", "rgb(123, 123, 212)"];

function changeBackgroundColor() {
  // Set inital value of random index 
  let randIdx = getRandomNumber(colors.length);
  // Loop until the index isn't equal to the previous index value
  while (randIdx == prevColorNum) {
    randIdx = getRandomNumber(colors.length);
  }
  // Update the previous index value to the current index value
  prevColorNum = randIdx;
  // Reset the interval timer
  resetQuoteTimer();
  // Set the background to the random color in the 'colors' array
  document.body.style.background = colors[randIdx];
}

/***
 * Function that resets the interval timer. To be used
 * when user clicks 'Show another quote' button so each
 * quote gets displayed for at least 10 seconds
 */
var intervalTimer = setInterval(printQuote, 10000);
function resetQuoteTimer() {
  clearInterval(intervalTimer);
  intervalTimer = setInterval(printQuote, 10000);
}

// click event listener for the print quote button
document.getElementById('load-quote').addEventListener("click", printQuote, false);