"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $newStoryForm.hide();
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

function showNewStoryForm() { //is this necessary? could be an arrow function
  console.debug("showNewStoryForm");
  $newStoryForm.show();
  putStoriesOnPage();
}

$submitLink.on("click", showNewStoryForm);

function showFavoritesOnPage() {
  console.debug('showFavoritesOnPage')
  hidePageComponents();
  $newStoryForm.hide();
  putFavoritesOnPage();
}

$favoritesLink.click(showFavoritesOnPage);