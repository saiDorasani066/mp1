/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files
import "./index.html";

// Stylesheets
import "./css/main.scss";

// Scripts
import "./js/main.js";

const homeSection = document.querySelector("#home");
const matchSection = document.querySelector("#match");
const resultsSection = document.querySelector("#results");
const resultsCarousel = document.querySelector(".results");
const exploreSection = document.querySelector("#explore");
const aboutSection = document.querySelector("#about");
const navbar = document.querySelector("nav ul");

const homeNav = document.querySelector("#home-nav");
const matchNav = document.querySelector("#match-nav");
const resultsNav = document.querySelector("#results-nav");
const exploreNav = document.querySelector("#explore-nav");
const aboutNav = document.querySelector("#about-nav");

const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#previous");
const cards = document.querySelectorAll(".opportunity-card");
let currentSlide = 1;

// Modal
const joinButton = document.querySelector(".join-button");
const modal = document.querySelector("#opportunity-modal");
const closeButton = document.querySelector("#close-modal");

const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-info");
const modalTime = document.querySelector("#modal-time");
const modalLocation = document.querySelector("#modal-location");

function updatePositionIndicator() {
  homeNav.className = "";
  matchNav.className = "";
  resultsNav.className = "";
  exploreNav.className = "";
  aboutNav.className = "";
  const currentPosition = window.scrollY + navbar.offsetHeight;

  if (
    currentPosition >= homeSection.offsetTop &&
    currentPosition < matchSection.offsetTop
  ) {
    homeNav.className = "active";
  }
  if (
    currentPosition >= matchSection.offsetTop &&
    currentPosition < resultsSection.offsetTop
  ) {
    matchNav.className = "active";
  }
  if (
    currentPosition >= resultsSection.offsetTop &&
    currentPosition < exploreSection.offsetTop
  ) {
    resultsNav.className = "active";
  }
  if (
    currentPosition >= exploreSection.offsetTop &&
    currentPosition < aboutSection.offsetTop
  ) {
    exploreNav.className = "active";
  }

  if (currentPosition >= aboutSection.offsetTop) {
    aboutNav.className = "active";
  }
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    aboutNav.className = "active";
  }
}

function resizeNavbarScroll() {
  navbar.className = "";
  if (window.scrollY > 0) {
    navbar.className = "resize";
  }
}

function carouselResultsBackground() {
  if (currentSlide == 1) {
    resultsCarousel.className = "results slide-one";
  }
  if (currentSlide == 2) {
    resultsCarousel.className = "results slide-two";
  }
  if (currentSlide == 3) {
    resultsCarousel.className = "results slide-three";
  }
}

function carouselOperatorNext() {
  cards[0].className = "opportunity-card";
  cards[1].className = "opportunity-card";
  cards[2].className = "opportunity-card";
  if (currentSlide < 3) {
    currentSlide = currentSlide + 1;
  } else {
    currentSlide = 1;
  }
  cards[currentSlide - 1].className = "opportunity-card active-card";
  // console.log(cards[currentSlide - 1]);

  carouselResultsBackground();
}

function carouselOperatorPrev() {
  cards[0].className = "opportunity-card";
  cards[1].className = "opportunity-card";
  cards[2].className = "opportunity-card";
  if (currentSlide > 1) {
    currentSlide = currentSlide - 1;
  } else {
    currentSlide = 3;
  }
  cards[currentSlide - 1].className = "opportunity-card active-card";
  // console.log(cards[currentSlide - 1]);

  carouselResultsBackground();
}

updatePositionIndicator();

window.addEventListener("scroll", function () {
  resizeNavbarScroll();
  updatePositionIndicator();
});

nextButton.addEventListener("click", function () {
  carouselOperatorNext();
});
prevButton.addEventListener("click", function () {
  carouselOperatorPrev();
});

joinButton.addEventListener("click", function () {
  const currentCard = cards[currentSlide - 1];

  // Get first  h2
  const title = currentCard.querySelector("h2");
  const paras = currentCard.querySelectorAll("p");

  modalTitle.innerHTML = title.innerHTML;
  modalDescription.innerHTML = paras[0].innerHTML;
  modalTime.innerHTML = paras[1].innerHTML;
  modalLocation.innerHTML = paras[2].innerHTML;

  modal.className = "modal modal-open";
});

closeButton.addEventListener("click", function () {
  modal.className = "modal close-button";
});
