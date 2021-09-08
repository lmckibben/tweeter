$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  $tweetText.on("keydown", function() {
    const $counter = $(this).parent().parent().children('.button-count').children(".counter");
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