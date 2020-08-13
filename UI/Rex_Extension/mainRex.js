alert("reached")

//Decode JSON
// var friend1 = JSON.parse(chrome.storage.sync.get('contact1'));
// alert(friend1.firstname);

var friend1 = document.getElementById("friend1");
var contact1data = chrome.storage.sync.get(["contact1", "contact2" , "contact3"], function (result) {
      var contact1 = JSON.parse(result.contact1);
      var contact2 = JSON.parse(result.contact2);
      var contact3 = JSON.parse(result.contact3);
      var phone_nums = [contact1.phone, contact2.phone, contact3.phone];

      friend1.innerHTML = contact1.firstname + " " + contact1.lastname;
      friend2.innerHTML = contact2.firstname + " " + contact2.lastname;
      friend3.innerHTML = contact3.firstname + " " + contact3.lastname;

      let sendButtons = document.getElementsByClassName("button");
      let url = getURL();
      var button1 = document.getElementById('butt1')
      alert(button1.innerHTML)
      var data = JSON.stringify({"phone_num" :  parseInt(phone_nums[i]), "URL" : url});
      button1.addEventListener("click", sendMessageViaJSON("POST", data))
      //Essentailly hardcoding 3 here until we cleanup UI
      // for (i = 0; i < phone_nums.length; i++) {
      //     var data = JSON.stringify({"phone_num" :  parseInt(phone_nums[i]), "URL" : url});
      //     sendButtons[i].addEventListener("click", sendMessageViaJSON("POST", data));
      // }
    });
//Send JSON function
function sendMessageViaJSON(method, data){
  alert("started sending");
  let url = "http://127.0.0.1:5000/api/send_message"
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  alert("finshed sending");
  }

function getURL() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let url = tabs[0].url;
      alert(url);
      return url;
      // use `url` here inside the callback because it's asynchronous!
  });
}
