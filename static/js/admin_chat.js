var a = document.getElementById("actions");
var d = document.getElementById("defaults");
var ip = document.getElementById("inputs");

window.onload = loadChats();
window.onload = loadUsers();

// API /api/chats/ GET request
function loadChats() {
  xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/chats/", true);
  xhr.send();

  xhr.onreadystatechange = function() {
    // STATUS OK
    if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      for (x in obj) {
        chats.setAttribute("class", "list-group");

        li = document.createElement("li");
        li.setAttribute("id", obj[x].chat_name);
        li.setAttribute("class", "list-group-item");
        // DOM Element Template
        li.innerHTML = "<input style='margin-right: 2.5%;' type='checkbox' id='cb_" + obj[x].chat_name + "' onclick='showActions(this)'/> \
        <a href='/" + obj[x].chat_name + "/' target='_self' onclick='openChat(this)'>" + obj[x].chat_name + "</a>\
        <small style='float:right'>" + obj[x].created + "</small>";

        chats.appendChild(li);
      }
    }
  }
};

// API /api/chats POST request
function createChat() {
    data = { chat_name: chat_name.value};
    obj = JSON.stringify(data);

    xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/chats/", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.send(obj);

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            chats.setAttribute("class", "list-group");

            li = document.createElement("li");
            li.setAttribute("id", chat_name.value);
            li.setAttribute("class", "list-group-item");
            // GET DATE
            date = moment().locale("de").format('L');
            datetime = moment().locale("de").format('LT');
            // DOM Template
            li.innerHTML = "<input style='margin-right: 2.5%;' type='checkbox' id='cb_" + chat_name.value + "' onclick='showActions(this)'/> \
            <a href='/" + chat_name.value + "/' target='_self' onclick='openChat(this)'>" + chat_name.value + "</a>\
            <small style='float:right'>" + date + " " + datetime + "</small>";

            chats.insertBefore(li, chats.firstChild);

            tag = "success";
            message = "Chat <strong>" + chat_name.value + "</strong> has been created.";
            showNotification(tag, message);

            chat_name.value = "";
            chat_name.focus();
        }
        else if (this.status == 400) {
          tag = "error";
          message = JSON.parse(this.response).chat_name[0];
          showNotification(tag, message);
        }
        hideSpinner();
    }
    hideInputs();
};

// Open a new chat
// ++++++ MISSING VALIDATION +++++++
function openChat(id) {
  window.location.pathname = '/' + id.id + '/';
};

// At least one checkbox to show actions bar
function showActions(cb) {
  if(cb.checked == true) {
    a.style.display = "block";
    d.style.display = "none";
  }
  else {
    l = chats.children.length;
    c = 0;
    for(i=0; i < l;i++){
      if(chats.children[i].childNodes[0].checked){
        c++;
      }
    }
    if (c > 0) {
      a.style.display = "block";
      d.style.display = "none";
    }
    else {
      a.style.display = "none";
      d.style.display = "block";
    }
  }
};

// Show input
function showInputs() {
  a.style.display = "none";
  d.style.display = "none";
  ip.style.display = "block";
  chat_name.focus();
};

// Hide input
function hideInputs() {
  a.style.display = "none";
  d.style.display = "block";
  ip.style.display = "none";
};

// Select all checkboxes
function selectAll() {
  l = chats.children.length;
  for(i=0; i < l; i++) {
    chats.children[i].childNodes[0].checked = true;
  }
  showActions(cb=true);
};

// Unselect all checkboxes
function unselectAll() {
  l = chats.children.length;
  for(i=0; i < l; i++) {
    chats.children[i].childNodes[0].checked = false;
  }
  showActions(cb=false);
};

// API /api/chats/<primray-key>/ DELETE request
function deleteChat() {
  showSpinner();
  l = chats.children.length;
  var c = 0;
  for (i=0; i < l; i++) {
    if(chats.children[i] && chats.children[i].childNodes[0].checked){
      c++;
    }
  };
  for (i=0; i < chats.children.length; i++) {
    if(chats.children[i] && chats.children[i].childNodes[0].checked){
      xhr[i] = new XMLHttpRequest()
      xhr[i].open("DELETE", "/api/chats/" + chats.children[i].id + "/", true);
      xhr[i].setRequestHeader("Content-type", "application/json");
      xhr[i].setRequestHeader("X-CSRFToken", csrftoken);
      xhr[i].send();

      xhr[i].onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Remove DOM Element
          r = JSON.parse(this.responseText);
          document.getElementById(r.detail).remove();

          if (c > 1) {
            tag = "success";
            message = "Chats have been deleted.";
            showNotification(tag, message);
          }
          else {
            tag = "success";
            message = "Chat <strong>" + r.detail + "</strong> has been deleted.";
            showNotification(tag, message);
          }
        }
        else if (this.readyState == 4 && this.status == 400) {
          tag = "error";
          message = JSON.parse(this.response).chat_name[0];
          showNotification(tag, message);
          unselectAll();
        }
      }
    }
  }
  hideSpinner();
  hideInputs();
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
