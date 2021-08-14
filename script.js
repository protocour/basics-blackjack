var cardDeck = [];
var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
var cardRank = 1;
var currentGameMode = "GAME_START";
console.log("current game mode", currentGameMode);
var playerScore = 0;
var computerScore = 0;

var makeDeck = function () {
  var suitCounter = 0;
  // declare counter for suit loop

  while (suitCounter < suits.length) {
    //loop from 0 - 3 to create 4 suits in total
    var cardSuit = suits[suitCounter];

    // declare counter for number of card
    var cardCounter = 1;

    // loop from 1-13 to generate individual cards
    while (cardCounter <= 13) {
      var cardName = cardCounter;
      var cardRank = cardCounter;

      // card name is the same as number of card, to call out the picture cards
      // declare card rank to fix the value for AceJQK
      if (cardCounter == 1) {
        cardName = "Ace";
        cardRank = 11;
      }
      if (cardCounter == 11) {
        cardName = "Jack";
        cardRank = 10;
      }
      if (cardCounter == 12) {
        cardName = "Queen";
        cardRank = 10;
      }
      if (cardCounter == 13) {
        cardName = "King";
        cardRank = 10;
      }
      // declare card object
      var card = {
        name: cardName,
        suit: cardSuit,
        rank: cardRank,
      };
      // push card to the deck array and iterate score and cardrank
      cardDeck.push(card);
      cardCounter += 1;
    }
    // iterate suit
    suitCounter += 1;
  }
  return cardDeck;
};

//generate random number for shuffling
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// create shuffle deck function
var shuffleDeck = function (deck) {
  var currentIndex = 0;
  // can shuffle any number of times, assume length of deck for now
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex += 1;
  }
  console.log(shuffleDeck);
  //check why it's return 'deck' and not return variable 'shuffledeck'
  return deck;
};

// array for player and computer cards
var playersCards = [];
var computersCards = [];

// deal cards function
var dealCard = function (cards, deck) {
  cards.push(deck.pop());
};

// count total number of points
var countScore = function (cardArray, totalScore) {
  var index = 0;
  totalScore = 0;
  //repeat the counting for the number of cards in array
  while (index < cardArray.length) {
    totalScore = Number(totalScore) + Number(cardArray[index].rank);
    index += 1;
  }
  return totalScore;
};

// create deck of cards outside of the main function
var cardDeck = shuffleDeck(makeDeck());
console.log("shuffled deck", cardDeck);

var main = function (input) {
  // check for the gamemode at the start
  console.log("current game mode", currentGameMode);
  // _________START INITIAL MODE___________
  if (currentGameMode == "GAME_START") {
    //deal 2 cards each for each player
    dealCard(playersCards, cardDeck);
    dealCard(computersCards, cardDeck);
    dealCard(playersCards, cardDeck);
    dealCard(computersCards, cardDeck);

    myOutputValue =
      "Computer's cards are " +
      computersCards[0].name +
      " of " +
      computersCards[0].suit +
      " and " +
      computersCards[1].name +
      " of " +
      computersCards[1].suit +
      "." +
      "<br>" +
      "Your cards are " +
      playersCards[0].name +
      " of " +
      playersCards[0].suit +
      " and " +
      playersCards[1].name +
      " of " +
      playersCards[1].suit +
      "." +
      "<br>" +
      "<br>" +
      "Please choose to 'hit' or 'stand'.";

    //calculate player points
    playerPoints = countScore(playersCards, playerScore);
    console.log("player score", playerPoints);

    //calculate computer points
    computerPoints = countScore(computersCards, computerScore);
    console.log("computer score", computerPoints);

    // calculate if player has blackjack to immediately end game
    if (playerPoints == 21) {
      return `Player has won with Blackjack! Congrats. Please refresh the page to play again.`;
    }
    // calculate if computer has blackjack to immediately end game
    if (computerPoints == 21) {
      return `Computer has won with Blackjack! Congrats. Please refresh the page to play again.`;
    }
    //update game mode to move to hit or stand
    currentGameMode = "PLAYER_HIT_OR_STAND";
    myOutputValue;
  }

  // _________START PLAYER HIT OR STAND MODE___________
  if (currentGameMode == "PLAYER_HIT_OR_STAND") {
    if (input == "hit") {
      dealCard(playersCards, cardDeck);
      console.log("player cards", playersCards);

      //calculate player points
      playerPoints = countScore(playersCards, playerScore);
      console.log("player score", playerPoints);

      myOutputValue =
        "Your cards are " +
        playersCards[0].name +
        " of " +
        playersCards[0].suit +
        " and " +
        playersCards[1].name +
        " of " +
        playersCards[1].suit +
        " and " +
        playersCards[2].name +
        " of " +
        playersCards[2].suit +
        ".<br><br>Total Points are " +
        playerPoints +
        ".<br><br>Please choose to 'hit' or 'stand'.";

      // calculate if player has blackjack to immediately end game
      if (playerPoints == 21) {
        return `Player has won with Blackjack! Congrats. Please refresh the page to play again.`;
      }
      if (playerPoints > 21) {
        return `Busted! Refresh to play again`;
      }
    }
    if (input == "stand") {
      myOutputValue =
        "You have decided to stand. It is now the computer's turn. Hit submit to proceed";
      currentGameMode = "COMPUTER_HIT_OR_STAND";
    }
    return myOutputValue;
  }
  console.log("comp cards after player mode", computersCards);
  // _________START COMPUTER HIT OR STAND MODE___________
  if (currentGameMode == "COMPUTER_HIT_OR_STAND") {
    //computer automatically draw cards if less than 17
    if (computerPoints <= 17) {
      dealCard(computersCards, cardDeck);
      console.log("player cards", computersCards);
      computersCards;
      myOutputValue =
        "Computer's cards are " +
        computersCards[0].name +
        " of " +
        computersCards[0].suit +
        " and " +
        computersCards[1].name +
        " of " +
        computersCards[1].suit +
        " and " +
        computersCards[2].name +
        " of " +
        computersCards[2].suit +
        ".<br><br>Total Points are" +
        computerPoints +
        ".<br>";

      //calculate computer points
      computerPoints = countScore(computersCards, computerScore);
      console.log("computer score", computerPoints);
      myOutputValue;
    }

    // if (computerPoints >= 17 && computerPoints < 21) {
    //   console.log("player cards", computersCards);
    //   myOutputValue =
    //     "Computer's cards are " +
    //     computersCards[0].name +
    //     " of " +
    //     computersCards[0].suit +
    //     " and " +
    //     computersCards[1].name +
    //     " of " +
    //     computersCards[1].suit +
    //     ". <br><br> Click submit to see score";
    // }

    // calculate if computer has blackjack to immediately end game
    if (computerPoints == 21) {
      return `Computer has won with Blackjack! Please refresh the page to try again.`;
    }
    // calculate if computer busted to immediately end game
    if (computerPoints > 21) {
      return `Computer busted! You win! Refresh to play again`;
    }
    currentGameMode = "COUNT_SCORE";
    myOutputValue;
  }
  //compare score and return results
  if (currentGameMode == "COUNT_SCORE") {
    if (playerPoints > computerPoints) {
      console.log("player score", playerPoints);
      computerPoints = countScore(computersCards, computerScore);
      console.log("computer score", computerPoints);
      myOutputValue = `Player wins with score of ${playerPoints}. Computer score was ${computerPoints}`;
    } else if (computerPoints > playerPoints) {
      myOutputValue = `Computer wins with score of ${computerPoints}. Player score was ${playerPoints}`;
    }
    //go back to start game mode
    currentGameMode = "START_GAME";
    return myOutputValue;
  }
};
