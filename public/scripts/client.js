/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [{
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}]

$(() => {

  const renderTweets = function(tweets) {
    let output = "";

    for (const tweet of tweets) {
      output += createTweetElement(tweet);
    }

    return output;
  };

  const createTweetElement = function(obj) {
    const tweetContainer = `
    <section class="tweet-container">
      <header class="profile">
      <article class="profile-container">
        <img src="${obj.user.avatars}">
        <p class="profile-name">${obj.user.name}</p>
      </article>
      <article class="user-handle">${obj.user.handle}</article>
    </header>
    <p class="tweet-content">${obj.content.text}</p>
    <footer class="tweet-footer">
      <article class="tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </article>
      <p class="days-since">${timeago.format(obj.created_at)}</p>
    </footer>
  </section>
    `
    return tweetContainer
  }

  const $form = $('#new-tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const serializedTweet = $(this).serialize();
    console.log(serializedTweet);

    $.post('/tweets', serializedTweet, (response) => {
      console.log(response)
      
    });
  })


$('#tweets-container').prepend(renderTweets(tweetData));
});