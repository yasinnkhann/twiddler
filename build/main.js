$(document).ready((function(){var e=$("#app");e.html("");var s=$('<h1 id="title">Twiddler</h1>'),a=$('<div id="feed"></div>'),t=$('<button id="update-feed">Update Feed</button>'),n=$('<div id="friendsListContainer"></div>'),i=$('<ul id="friends-list">My Friends</ul>'),o=$('<form id="new-tweet-form"></form>'),r=$('<h2 id="newTweetTitle">Your New Tweet</h2>'),p=$('<input type="text" name="username" id="username">'),d=$('<label for="username" id="usernameLabel">Username:</label>'),l=$('<textarea name="message" id="message"></textarea>'),c=$('<label for="message" id="messageLabel">Tweet:</label>'),m=$('<button type="submit" id="submitButton">Submit!</button>'),u=$('<div id="motherBlock"></div>'),f=[],h=["douglascalhoun","mracus","sharksforcheap","shawndrost"];s.on("click",(function(e){console.log(e),alert("The title of this page is: "+e.target.innerText)})),t.on("click",(function(){"Update Feed"===t.text()&&(v(),t.text("Back")),"Back"===t.text()&&(v(),t.text("Update Feed"))})),m.on("click",(function(e){e.preventDefault();var s=p.val(),a=l.val(),t={user:s,message:a,created_at:new Date,profilePhotoURL:"./assets/img/visitor.png"};0!==s.length&&0!==a.length&&(streams.users.hasOwnProperty(s)||(streams.users[s]=[]),streams.users[s].push(t),streams.home.push(t),console.log(streams.users),v()),p.val(""),l.val("")}));var g=function(e){h.includes(e.user)||(e.profilePhotoURL="./assets/img/visitor.png");var s=$('<div class="tweet"></div>');s.append('<span class="username">@'+e.user+"</span>"),s.append('<span class="message"> '+e.message+"</span>"),s.append('<img class="profile-photo" src='.concat(e.profilePhotoURL,">")),s.append('<span class="timestamp"> '+jQuery.timeago(e.created_at)+"</span>"),s.append('<i class="icon comment fas fa-comments"></i>'),s.append('<i class="icon retweet fas fa-retweet"></i>'),s.append('<i class="icon like fas fa-thumbs-up"></i>'),s.append('<i class="icon share fas fa-retweet"></i>'),s.appendTo(a)},v=function(e){if(void 0===e){a.html("");for(var s=streams.home.length-1;s>=0;){var n=streams.home[s];g(n),s-=1}if(0===f.length)for(var o in streams.users)$('<li class="friend">'.concat(o,"</li>")).appendTo(i),f.push(o);for(var o in streams.users)f.includes(o)||($('<li class="friend">'.concat(o,"</li>")).appendTo(i),f.push(o))}else{for(a.html(""),e=$(this).text().startsWith("@")?$(this).text().slice(1):$(this).text(),s=streams.users[e].length-1;s>=0;)n=streams.users[e][s],g(n),s-=1;t.text("Back")}console.log(streams.home)};v(),s.appendTo(e),o.appendTo(e),t.appendTo(e),i.appendTo(n),n.appendTo(u),r.appendTo(o),d.appendTo(o),p.appendTo(o),c.appendTo(o),l.appendTo(o),m.appendTo(o),u.appendTo(e),a.appendTo(u),$("#feed").on("click",".username",v),$("#friends-list").on("click",".friend",v),$("#feed").on("mouseenter",".icon",(function(){$(this).css("color","greenyellow")})),$("#feed").on("mouseleave",".icon",(function(){$(this).css("color","gold")}))})),window.isItBeautifulYet=!0;