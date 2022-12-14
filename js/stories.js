"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  console.debug('getAndShowStoriesOnStart');
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
  $('.remove-button').click(removeStoryFromPage);
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <i class="fa fa-star hidden" ></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <input type="button" class="remove-button hidden" value="Delete">
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);

    if (currentUser) {
      $('.fa-star').show();
      for (let favorite of currentUser.favorites) {
        if (story.storyId === favorite.storyId) {
          $story.children('.fa-star').addClass('user-favorites');
        };
        if (story.username === currentUser.username) {
          $story.children('.remove-button').removeClass('hidden');
        }
      }
    }

    $allStoriesList.show();
  }
}


async function submitNewStory(evt) {
  console.debug('submitUserStory')
  evt.preventDefault();

  //get values from user input
  const author = $('#submit-author').val();
  const title = $('#submit-title').val();
  const url = $('#submit-url').val();

  //send post request to API
  await storyList.addStory(currentUser, { author, title, url });

  //update storyList variable and put the new stories on the page
  storyList = await StoryList.getStories();
  putStoriesOnPage();

  //hide the submit form
  $newStoryForm.hide();
}

$newStoryForm.submit(submitNewStory);

function putFavoritesOnPage() {
  console.debug("showFavoritesOnPage");

  $allStoriesList.empty();

  //takes currentUser favorites and turns them into an array of story objects
  const stories = currentUser.favorites.map(story => new Story(story));

  // loop through users favorited stories and generate HTML for them
  for (let story of stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);

    for (let favorite of currentUser.favorites) {
      if (story.storyId === favorite.storyId) {
        $story.children('.fa-star').addClass('user-favorites');
      };
    }

    $('.fa-star').show();

    $allStoriesList.show();
  }
}

//the problem is currentUser.favorites is not being updated with the user on the API

function removeStoryFromPage(evt) {
  console.debug("removeStoryFromPage");

  const storyId = $(evt.target).parent().attr('id');

  User.deleteStory(currentUser.loginToken, storyId);

  $(evt.target).parent().remove();
}