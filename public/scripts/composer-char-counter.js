$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  const $counter = $(".counter");
  $tweetText.on("keydown", function() {
    const textLength = this.textLength;
    let charLimit = 139 - textLength;
    if (charLimit < 0) {
      $counter.css('color', 'red');
    }
    if (charLimit >= 0) {
      $counter.css('color', '#545149');
    }
    $counter.text(charLimit)
  });
});