$(document).ready(function() {
        // Already Existing Elements
        var $app = $('#app');
        $app.html('');

        // Newly Created Elements
        var $title = $('<h1 id="title">Twiddler</h1>');
        var $feed = $('<div id="feed"></div>');
        var $updateFeedBtn = $('<button id="update-feed">Update Feed</button>');
        var $friendsListContainer = $('<div id="friendsListContainer"></div>');
        var $friendsList = $('<ul id="friends-list">My Friends</ul>');
        var $newTweetForm = $('<form id="new-tweet-form"></form>');
        var $newTweetTitle = $('<h2 id="newTweetTitle">Your New Tweet</h2>');
        var $userNameInput = $('<input type="text" name="username" id="username">');
        var $userNameLabel = $('<label for="username" id="usernameLabel">Username:</label>');
        var $messageInput = $('<textarea name="message" id="message"></textarea>');
        var $messageLabel = $('<label for="message" id="messageLabel">Tweet:</label>');
        var $submitButton = $('<button type="submit" id="submitButton">Submit!</button>');
        var $motherBlock = $('<div id="motherBlock"></div>');

        var ulArr = [];
        var origFriendsArr = ['douglascalhoun', 'mracus', 'sharksforcheap', 'shawndrost'];

        // Event Handlers
        var handleTitleClick = function(e) {
          console.log(e);
          alert('The title of this page is: ' + e.target.innerText);
        };

        var handleUsernameClick = function() {
          if ($updateFeedBtn.text() === 'Update Feed') {
            renderFeed();
            $updateFeedBtn.text('Back');
          }
          if ($updateFeedBtn.text() === 'Back') {
             renderFeed();
             $updateFeedBtn.text('Update Feed');
          }
        };

         var handleSubmitButton = function(e) {
          e.preventDefault();

          var username = $userNameInput.val();
          var message = $messageInput.val();

          var newTweetObj = {
            user: username,
            message: message,
            created_at: new Date(),
            profilePhotoURL: "./assets/img/visitor.png",
          };

          if (username.length !== 0 && message.length !== 0) {
            if (!streams.users.hasOwnProperty(username)) {
              streams.users[username] = [];
            }

            streams.users[username].push(newTweetObj);
            streams.home.push(newTweetObj);

            console.log(streams.users);

            renderFeed();
          }

          $userNameInput.val('');
          $messageInput.val('');
        };

        // Event Listeners
        $title.on('click', handleTitleClick);

        $updateFeedBtn.on('click', handleUsernameClick);

        $submitButton.on('click', handleSubmitButton);

        // Function Definitions

        var makeTweets = function(tweet) {
          if (!origFriendsArr.includes(tweet.user)) {
            tweet.profilePhotoURL = "./assets/img/visitor.png";
          }

          var $tweet = $('<div class="tweet"></div>');
          $tweet.append('<span class="username">@' + tweet.user + '</span>');
          $tweet.append('<span class="message">' + ' ' + tweet.message + '</span>');
          $tweet.append("<img class=\"profile-photo\" src=".concat(tweet.profilePhotoURL, ">"));
          $tweet.append('<span class="timestamp">' + ' ' + jQuery.timeago(tweet.created_at) + '</span>');
          $tweet.append('<i class="icon comment fas fa-comments"></i>');
          $tweet.append('<i class="icon retweet fas fa-retweet"></i>');
          $tweet.append('<i class="icon like fas fa-thumbs-up"></i>');
          $tweet.append('<i class="icon share fas fa-retweet"></i>');
          $tweet.appendTo($feed);
        };

        var renderFeed = function(user) {
          if (user === undefined) {
            $feed.html('');

            var index = streams.home.length - 1;
            while (index >= 0) {
              var tweet = streams.home[index];
              makeTweets(tweet);
              index -= 1;
            }

            if (ulArr.length === 0) {
              for (var key in streams.users) {
                  $("<li class=\"friend\">".concat(key, "</li>")).appendTo($friendsList);
                  ulArr.push(key);
              }
            }
              for (var key in streams.users) {
                if (!ulArr.includes(key)) {
                  $("<li class=\"friend\">".concat(key, "</li>")).appendTo($friendsList);
                  ulArr.push(key);
                }
              }
          } else {
            $feed.html('');

            if ($(this).text().startsWith('@')) {
              user = $(this).text().slice(1);
            } else {
              user = $(this).text();
            }

            var index = streams.users[user].length - 1;

            while (index >= 0) {
              var tweet = streams.users[user][index];
              makeTweets(tweet);
              index -= 1;
            }
            $updateFeedBtn.text('Back');
          }
          console.log(streams.home);
        };

        // Function Invocations
        renderFeed();

        // Append new HTML elements
        $title.appendTo($app);
        $newTweetForm.appendTo($app);
        $updateFeedBtn.appendTo($app);
        $friendsList.appendTo($friendsListContainer);
        $friendsListContainer.appendTo($motherBlock);
        $newTweetTitle.appendTo($newTweetForm);
        $userNameLabel.appendTo($newTweetForm);
        $userNameInput.appendTo($newTweetForm);
        $messageLabel.appendTo($newTweetForm);
        $messageInput.appendTo($newTweetForm);
        $submitButton.appendTo($newTweetForm);
        $motherBlock.appendTo($app);
        $feed.appendTo($motherBlock);

        // Other stuff that needed to be placed here after appending the elements
        $('#feed').on('click', '.username', renderFeed);

        $('#friends-list').on('click', '.friend', renderFeed);

        $('#feed').on('mouseenter', '.icon', function() {
          $(this).css('color', 'greenyellow');
        })

        $('#feed').on('mouseleave', '.icon', function() {
          $(this).css('color', 'gold');
        })
});

window.isItBeautifulYet = true;