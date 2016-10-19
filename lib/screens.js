const $ = require("jquery");
// const score = require("./score")

// Hide & Show Screens

function hideScreen(id) {
  $(id).hide();
}

function hideAllScreens() {
  hideScreen('#start-screen, #end-screen, #win-screen, #game');
}

function showScreen(id) {
  $(id).show();
}

function showStartScreen() {
  hideAllScreens();
  showScreen('#start-screen');
}

function showGameScreen() {
  hideAllScreens();
  showScreen('#game');
}

function showEndScreen() {
  hideAllScreens();
  showScreen('#end-screen');
}

function showWinScreen() {
  hideAllScreens();
  showScreen('#win-screen');
}

// Screen Manipulation

function reloadPageToStart(id) {
  $(id).click(function() {
    document.location.reload();
  });
}

module.exports = {
  showStartScreen: showStartScreen,
  showGameScreen: showGameScreen,
  showEndScreen: showEndScreen,
  showWinScreen: showWinScreen,
  reloadPageToStart: reloadPageToStart
};
