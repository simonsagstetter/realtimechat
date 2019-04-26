var chat_name = document.getElementById('chat_name');
var csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

//Event listener for chat_name input
chat_name.addEventListener("keyup", validate);

// Validation if "enter" was pressed
function validate(e) {
  if (e.keyCode == 13) {
    showSpinner();
    // ascii alphanumeric test
    test = isASCII(chat_name.value);
    // result action
    if (test) {
      createChat();
    }
    else {
      tag = "error";
      message = "Only ASCII aplhanumeric characters are allowed.";
      showNotification(tag, message);
      chat_name.value = "";
      chat_name.focus();
      hideSpinner();
    }
  }
};

// ASCII validation function
function isASCII(str) {
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) &&
        !(code > 64 && code < 91) &&
        !(code > 96 && code < 123)) {
            return false;
        }
    }
    return true;
}