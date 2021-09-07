$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  const $counter = $(".counter");
  $tweetText.on("keydown", function() {
    const textLength = this.textLength;
    let charLimit = 139 - textLength;

    console.log(charLimit);
    $counter.text(charLimit)
  });
});