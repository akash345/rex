alert("reached")

//Decode JSON
// var friend1 = JSON.parse(chrome.storage.sync.get('contact1'));
// alert(friend1.firstname);

var friend1 = document.getElementById("friend1");
var contact1data = chrome.storage.sync.get(["contact1", "contact2" , "contact3"], function (result) {
      var contact1 = JSON.parse(result.contact1);
      var contact2 = JSON.parse(result.contact2);
      var contact3 = JSON.parse(result.contact3);

      friend1.innerHTML = contact1.firstname + " " + contact1.lastname;
      friend2.innerHTML = contact2.firstname + " " + contact2.lastname;
      friend3.innerHTML = contact3.firstname + " " + contact3.lastname;

      let sendButtons = document.getElementsByClassName("button");

      for (i = 0; i < sendButtons.length; i++) {
          sendButtons[i].addEventListener("click", sendText);
      }
    });
