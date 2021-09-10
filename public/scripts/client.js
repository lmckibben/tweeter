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
        $('#tweets-container').empty();
        $('#tweets-container').prepend(renderTweets(tweets));
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    });
  };
  loadTweets();

  const renderTweets = function(tweets) {
    let output = [];
    for (const tweet of tweets) {
      output.push(createTweetElement(tweet));
    }
    output.reverse();
    return output;
  };

  const createTweetElement = function(obj) {
    //function to prevent xss attacks
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const tweetContainer = `
    <section class="tweet-container">
      <header class="profile">
      <article class="profile-container">
        <img src="${obj.user.avatars}">
        <p class="profile-name">${obj.user.name}</p>
      </article>
      <article class="user-handle">${obj.user.handle}</article>
    </header>
    <p class="tweet-content">${escape(obj.content.text)}</p>
    <footer class="tweet-footer">
      <article class="tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </article>
      <p class="days-since">${timeago.format(obj.created_at)}</p>
    </footer>
  </section>
    `;
    return tweetContainer;
  };


  const $form = $('#new-tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const $error = $('.error');
    const serializedTweet = $(this).serialize();
    let $counter = $(this).children('.button-count').children(".counter").text();
    if ($counter < 0) {
      //sets text in error msg
      $error.html("<i class='fas fa-exclamation-triangle'></i>Too long. Please respect our arbitrary limit of 140 characters.<i class='fas fa-exclamation-triangle'></i>");
      //shows error msg
      $error.slideDown(() =>  {
        $error.show();
      });
    } else if ($counter == 140) {
      //sets text in error msg
      $error.html(`<i class="fas fa-exclamation-triangle"></i>Tweet empty, Write out your thoughts before hitting submit.<i class="fas fa-exclamation-triangle"></i>`);
      //shows error msg
      $error.slideDown(() =>  {
        $error.show();
      })
    } else {
      $.post('/tweets', serializedTweet, (response) => {
        loadTweets();
        //clears text input
        $(this).children('.text').children('#tweet-text').val("");
        //sets counter back to 140
        $(this).children('.button-count').children(".counter").val(140);
        //hides error msg
        $error.slideUp(() => {
          $error.hide();
        });
      });
    };
  })
});
