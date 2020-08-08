/*global chrome*/
var bgPage = chrome.extension.getBackgroundPage();


//Wire up event event handlers
document.addEventListener("DOMContentLoaded", function(htmlButtonElement) {
  var rexButton = document.getElementById("sendRex");
  rexButton.onclick = bgPage.getURL();
});


}
