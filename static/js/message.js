// Global Vars
var csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
var messages = document.getElementById('messages');
var user = document.getElementById('user').value;

// Calls function to get all messages related to the chat
loadMessages();
// API GET
function loadMessages() {
  var path = window.location.pathname;
  var id = path.slice(1,-1);
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      var x;
      for (x in obj) {
        // If related_chat identifier messages with a existing chat it appends data in ul
        if(obj[x].related_chat == id) {
          messages.className = "list-group";
          var a = document.createElement("a");
          a.className = "list-group-item list-group-item-action";
          a.innerHTML =  "<div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>" + obj[x].user.username + "</h5> \
          <small>" + obj[x].created + "</small></div> \
          <p class='mb-1'>" + obj[x].text + "</p>";
          messages.appendChild(a);
        }
      }
    }
  }
  xhr.open("GET", "/api/messages/", true);
  xhr.send()
};user

// Open Websocket Connection
var chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/' + roomName + '/');

// Focuses the input when page is loading
document.querySelector('#chat-message-input').focus();

// Event Listining for a Enter
document.querySelector('#chat-message-input').onkeyup = function(e) {
  if (e.keyCode === 13) {  // enter, return
    document.querySelector('#chat-message-submit').click();
  }
};

// Click Function
document.querySelector('#chat-message-submit').onclick = function(e) {
  var messageInputDom = document.querySelector('#chat-message-input');
  var username = document.getElementById('username').value;
  var message = messageInputDom.value;
  messageInputDom.value = '';
  createMessage(message, username);
};

// API Fucntion
function createMessage(message, username) {
  var path = window.location.pathname;
  var id = path.slice(1,-1);
  data = { text: message, related_chat: id, user: user };
  obj = JSON.stringify(data)
  xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      // if respond code is 201 then we send data to the websocket
      chatSocket.send(JSON.stringify({
        'message': message,
        'username': username
      }));
    }
    if (this.status == 400) {
      window.alert("API Error. Look in the console.")
    }
  }
  xhr.open("POST", "/api/messages/", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrftoken);
  xhr.send(obj);
};

// WebSocket function which appends the message in ul on every session which is connected currently
chatSocket.onmessage = function(e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var username = data['username'];
    var a = document.createElement("a");
    var date = moment().locale("de").format('L');
    var datetime = moment().locale("de").format('LT');
    messages.className = "list-group";
    a.className = "list-group-item";
    a.innerHTML = "<div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>" + username + "</h5> \
    <small>" + date + " " + datetime + "</small></div> \
    <p class='mb-1'>" + message + "</p>";;
    messages.insertBefore(a, messages.firstChild);
};

// Websocket disconnection
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
    window.alert("You were inactive for too long. Your Session has been disconnected.Please refresh the page!")
};
