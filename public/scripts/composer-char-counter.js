$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  $tweetText.on("keydown", function() {
    //grabs counter element
    const $counter = $(this).parent().parent().children('.button-count').children(".counter");
    const textLength = this.textLength;
    //sets limit to 139 for first key stroke 
    let charLimit = 139 - textLength;
    const key = event.keyCode || event.charCode;
    //checks if backspace or delete is pressed
    if( key == 8 || key == 46 ) {
      //adds 2 to account for the key being pressed
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