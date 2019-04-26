// Calls API Function which loads all chats
window.onload = loadChats();
window.onload = loadUsers();

// API GET
function loadChats() {
  xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/chats/", true);
  xhr.send()

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);

      for (x in obj) {
        chats.setAttribute("class", "list-group");

        li = document.createElement("li");
        li.setAttribute("id", obj[x].chat_name);
        li.setAttribute("class", "list-group-item");

        // DOM Template
        li.innerHTML = "<a href='/" + obj[x].chat_name + "/' target='_self' onclick='openChat(this)'>" + obj[x].chat_name + "</a>\
        <small style='float:right'>" + obj[x].created + "</small>";

        chats.appendChild(li);
      }
    }
    else if (this.status == 403) {
      tag = "error";
      message = "No chats available."
      //message = JSON.parse(this.response).detail;
      showNotification(tag, message);
    }
  };
};

// Open a new chat
function openChat(id) {
  window.location.pathname = '/' + id.id + '/';
};

function loadUsers() {
  showSpinner();
  xhr = new XMLHttpRequest();
  xhr.open("GET", "/accounts/api/users/", true);
  xhr.send();

  xhr.onreadystatechange = function() {
    // STATUS OK
    if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      for (x in obj) {
        users.setAttribute("class", "list-group");

        li = document.createElement("li");
        li.setAttribute("id", obj[x].id);
        li.setAttribute("class", "list-group-item");
        // DOM Element Template
        li.innerHTML = obj[x].username;
        users.appendChild(li);

      }
      loadProfiles();
    }
  }
};

function loadProfiles() {
  xhr = new XMLHttpRequest();
  xhr.open("GET", "/accounts/api/profiles/", true);
  xhr.send();
  var l = users.children.length;
  xhr.onreadystatechange = function() {
    // STATUS OK
    if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
        for(i=0; i < l; i++) {
          if (users.children[i].id == obj[i].user.id) {
            if (obj[i].is_online == true) {
              users.children[i].innerHTML += " <span class='badge badge-success badge-pill' style='float:right'>online</span>";
            }
            else {
              users.children[i].innerHTML += " <small style='float:right'>Last Activity " + obj[i].user.last_login + "</small>";
            }
          }
        }
    }
    hideSpinner();
  }
};
