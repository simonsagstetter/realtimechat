function showNotification(tag, message) {
    if (tag === "error") {
        clearTimeout(timer);
        success.style.display = "none";
        error.innerHTML = message;
        error.style.display = "block";
        timer = setTimeout(function(){error.style.display = "none";},7000);
    }
    else if (tag === "success") {
        clearTimeout(timer);
        error.style.display = "none";
        success.innerHTML = message;
        success.style.display = "block";
        timer = setTimeout(function(){success.style.display = "none";},7000);
    }
}