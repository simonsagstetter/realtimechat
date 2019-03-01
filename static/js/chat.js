// Global Vars
var chats = document.getElementById('chats');
var chat_name = document.getElementById('chat_name');
var csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

// Calls API Function which loads all chats
loadChats();
// API GET
function loadChats() {
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      var x;
      for (x in obj) {
        chats.setAttribute("class", "list-group");
        var li = document.createElement("li");
        li.setAttribute("id", obj[x].chat_name);
        li.setAttribute("class", "list-group-item");
        li.setAttribute("onclick", "openChat(this)");
        li.innerHTML = "<a href='/" + obj[x].chat_name + "/' target='_self'>" + obj[x].chat_name + "</a><small style='float:right'>" + obj[x].created + "</small>";
        chats.appendChild(li);
      }
    }
    else if (this.status == 403) {
        var error = document.getElementById('error');
        error.innerHTML = 'You are not allowed to join a chat yet.';
        error.style.display = "block";
        chat_name.style.display = "none";
        chats.style.display = "none";
        setTimeout(function(){
            error.style.display = "none";
        }, 7000);
    }
  }
  xhr.open("GET", "/api/chats/", true);
  xhr.send()
};

// Event Listener for Chatname input
chat_name.addEventListener("keyup", validate);

// Validation if Enter was pressed
function validate(e) {
  if (e.keyCode == 13) {
    // missing validation
    createChat();
  }
};

// API POST
function createChat() {
    var str = chat_name.value
    data = { chat_name: str.replace(/\s/g, '-')};
    obj = JSON.stringify(data)

    xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            chats.setAttribute("class", "list-group");
            var li = document.createElement("li");
            // GET DATE
            var date = moment().locale("de").format('L');
            var datetime = moment().locale("de").format('LT');
            li.innerHTML = "<a href='/" + str.replace(/\s/g, '-') + "/' target='_self'>" + str.replace(/\s/g, '-') + "</a><small style='float:right'>" + date + " " + datetime + "</small>";
            li.setAttribute("id", chat_name.value);
            li.setAttribute("class", "list-group-item");
            li.setAttribute("onclick", "openChat(this)");
            // Inserts chat on top
            chats.insertBefore(li, chats.firstChild);
            chat_name.value = "";
            chat_name.focus();
            var success = document.getElementById('success');
            success.innerHTML = "Chat <strong>" + str.replace(/\s/g, '-') + "</strong> has been created!";
            success.style.display = "block";
            setTimeout(function(){
                success.style.display = "none";
            }, 7000);
        }
        else if (this.status == 400) {
          var error = document.getElementById('error');
          error.innerHTML = "You have entered invalid data.";
          error.style.display = "block";
          setTimeout(function(){
              error.style.display = "none";
          }, 7000);
        }
        else if (this.status == 403) {
            var callback = JSON.parse(this.responseText);
            var error = document.getElementById('error');
            error.innerHTML = callback.detail;
            error.style.display = "block";
            setTimeout(function(){
                error.style.display = "none";
            }, 7000);
        }
    }
    xhr.open("POST", "/api/chats/", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.send(obj);
};

// Open a new chat
function openChat(id) {
  window.location.pathname = '/' + id.id + '/';
};
