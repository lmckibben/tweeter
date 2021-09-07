$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  const $counter = $(".counter");
  $tweetText.on("keydown", function() {
    const textLength = this.textLength;
    let charLimit = 139 - textLength;
    const key = event.keyCode || event.charCode;
    if( key == 8 || key == 46 ) {
      charLimit += 2
    }
    if (charLimit < 0) {
      $counter.css('color', 'red');
    }
    if (charLimit >= 0) {
      $counter.css('color', '#545149');
    }
    $counter.text(charLimit)
  });
});