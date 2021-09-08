/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        $('#tweets-container').prepend(renderTweets(tweets));
      },
      error: (err) => {
        console.log(`error: ${err}`)
      }
    })
  };
  loadTweets();

  const renderTweets = function(tweets) {
    let output = [];
    $('tweets-container').empty();
    for (const tweet of tweets) {
      output.push(createTweetElement(tweet));
    }
    output.reverse();
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
    let counter = $(this).children('.button-count').children(".counter").text();
    console.log(counter);
    if (counter < 0) {
      alert('Please keep tweet to 140 characters or less.');
    } else if (counter == 140) {
      alert('Please write a tweet before hitting submit');
    } else {
      $.post('/tweets', serializedTweet, (response) => {
        console.log(response)
      });
    }
  })
});