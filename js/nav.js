"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $submitForm.hide();
  $('.fa-star').show();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $loginForm.hide();
  $signupForm.hide();
  $('.fa-star').show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function showSubmitForm() { //is this necessary? could be an arrow function
  console.debug("showSubmitForm");
  $submitForm.show();
  putStoriesOnPage();
  $('.fa-star').show();
}

$submitLink.on("click", showSubmitForm);

function showFavoritesOnPage() {
  putFavoritesOnPage();
  $submitForm.hide();
  $('.fa-star').show();
}

$('#favorites-link').click(showFavoritesOnPage);
