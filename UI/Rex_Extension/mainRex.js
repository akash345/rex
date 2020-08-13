alert("reached")

//Decode JSON
// var friend1 = JSON.parse(chrome.storage.sync.get('contact1'));
// alert(friend1.firstname);

var friend1 = document.getElementById("friend1");
var contact1data = chrome.storage.sync.get("contact1", function (contact) {
      alert(contact.firstname);
      var contact = JSON.stringify(contact);
      alert(contact.firstname);
      friend1.innerHTML = contact.firstname;
    });


var friends = document.querySelectorAll("content");
for(var i = 0; i < friends.length; i++){
    //friends[i].innerHTML = chrome.storage.get('user');
}
