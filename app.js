$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Newly created HTML elements

  var $title = $('<h1 id="title">Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Tweet info

  var newTweet = function(tweet) {
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $(`<img class="profile-photo" src="assets/img/${tweet.user}.png">`);
    var $userName = $(`<span class="username">@${tweet.user}</span>`);
    var $message = $(`<p class="message">${tweet.message}</p>`);
    var $timestamp = $('<div class="timestamp"></div>');
    var $icons = $('<div class="icons"></div>');

    $timestamp.text(jQuery.timeago(tweet.created_at));

    // Hover text colours for title and username

    $title.hover(hoverOnTextColor);
    $userName.hover(hoverOnTextColor);

   // Add custom icon images via Font Awesome

    var attachIconImage = function(iconType, customIcon, targetIcon) {
    var $icon = $(`<i class="${iconType} ${customIcon}"></i>`);
    $icon.hover(hoverOnTextColor);
    $icon.on('click', function() {
      $(this).css('color', 'green')
    });
    $icon.appendTo(targetIcon);
  }

    attachIconImage('comment', 'fas fa-comments', $icons);
    attachIconImage('retweet', 'fas fa-retweet', $icons);
    attachIconImage('like', 'fas fa-thumbs-up', $icons);
    attachIconImage('share', 'fas fa-share-square', $icons);

    $profilePhoto.appendTo($tweet);
    $userName.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $icons.appendTo($tweet);
    $tweet.appendTo('#feed');
  }

  // Render tweets into #feed

  var renderFeed = function(user) {
    $('#feed').html('');
    if (user === undefined) {
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        newTweet(tweet);
        index--;
      }
    } else {
      var index = streams.users[user].length - 1;
      while(index >= 0){
        var tweet = streams.users[user][index];
        newTweet(tweet);
        index--;
      }
    }
  }

  // Renders friends list

  var renderFriendsList = function () {
    var $friendsList = $('<div class="friends-list">My Friends<ul></ul></div>');
    for (var friend in streams.users) {
      var $friend = $('<li>' + friend + '</li>');
      $friend.on('click', friendsListClickEvent);
      $friend.hover(hoverOnTextColor);
      $friend.appendTo($friendsList);
    }
    $friendsList.appendTo($app);
  }

  // Create Click Events

  var friendsListClickEvent = function() {
    var friend = $(this).text();
    renderFeed(friend);
    $updateFeedButton.text('Back');
  }

  var buttonClickEvent = function() {
    if($updateFeedButton.text() === 'Back') {
      $updateFeedButton.text('Update Feed');
    }
    renderFeed();
  }

  var usernameClickEvent = function() {
    var username = $(this).text().slice(1);
    renderFeed(username);
    $updateFeedButton.text('Back');
  }

  // Event listeners

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  $('#app').on('click', '#update-feed', buttonClickEvent);
  $('#app').on('click', '.username', usernameClickEvent);

  // Append new HTML elements to the DOM

  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  renderFriendsList();
  $feed.appendTo($app);
  renderFeed();

});

  var hoverOnTextColor = function() {
  $(this).css('color', 'blue')
};

window.isItBeautifulYet = true
