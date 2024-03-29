
var friend1 = document.getElementById("friend1");
listContacts()
function listContacts(){
  chrome.storage.sync.get(["contacts", "sentCount"], function (result) {
    //fetch sent Count
    const sentCount = document.getElementById("sentCount")
    sentCount.innerHTML = "0"
    if (result.sentCount) sentCount.innerHTML = result.sentCount

    //build contact list
    const contacts = JSON.parse(result.contacts);
    console.log(contacts)
    const contactList = document.getElementById("contactlist")
    contactList.innerHTML=""
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      console.log(tabs)
      let url
      if (tabs[0]){
        url = tabs[0].url;
      }else{
        url = "url"
      }
      contacts.map(function(contact, index){
        var para = document.createElement("div");
        para.classList.add("item")
        para.innerHTML=`
        <div class="right floated content">
          <div class="ui basic teal button" id="butt${index}">Rex</div>
        </div>
        <img class="ui avatar image" src="images/user.jpg">
        <div class="content" id="friend${index}" style="
        white-space: nowrap;
        width: 130px;
        overflow: hidden;
        text-overflow: ellipsis; " >
        ${contact.firstname} ${contact.lastname}
        </div>`
        contactList.appendChild(para);
        document.getElementById(`butt${index}`).addEventListener("click", function() {
          addSentCount()
          sendMessageViaJSON("POST", {"phone_num" :  contact.phone, "URL" : url})
          let text = document.createElement("div");
          text.className = "ui small label";
          text.innerHTML = "Sent";
          this.parentNode.replaceChild(text, this);
        });
      });
    })
    // var contact2 = JSON.parse(result.contact2);
    // var contact3 = JSON.parse(result.contact3);
    // var phone_nums = [contact1.phone, contact2.phone, contact3.phone];

    // friend1.innerHTML = contact1.firstname + " " + contact1.lastname;
    // friend2.innerHTML = contact2.firstname + " " + contact2.lastname;
    // friend3.innerHTML = contact3.firstname + " " + contact3.lastname;

    // let sendButtons = document.getElementsByClassName("button");
    // let url = getURL();

    // //async call for url
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    //     let url = tabs[0].url;
    //     phone_nums.map(function(phone, index){
    //       sendButtons[index].addEventListener("click", function() {
    //         sendMessageViaJSON("POST", JSON.stringify({"phone_num" :  phone, "URL" : url}))
    //       });
    //     })
    // });

    //Essentailly hardcoding 3 here until we cleanup UI
});
}

//Send JSON function
function sendMessageViaJSON(method, data){
//  alert("started sending");
  let url = "https://sheltered-anchorage-53354.herokuapp.com/api/send-message"
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
    chrome.storage.sync.get(["user"], function (result) {
    if(result.user){
      const currentUser = JSON.parse(result.user)
      xhr.send(JSON.stringify({...data, username: currentUser.firstname + " " + currentUser.lastname, userphone: currentUser.phone}));
    }else{
      xhr.send(JSON.stringify(data));
    }})
//  alert("finshed sending");
}
function addSentCount(){
  chrome.storage.sync.get(["sentCount"], function (result) {
    if(result.sentCount){
      const sentCount = (parseInt(result.sentCount) + 1).toString()
      chrome.storage.sync.set({sentCount:sentCount},function(){console.log("sentCount updated")})
      document.getElementById("sentCount").innerHTML = sentCount
    }else{
      chrome.storage.sync.set({sentCount:"1"},function(){console.log("sentCount updated")})
      document.getElementById("sentCount").innerHTML = "1"
    }
})
}
function getURL() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let url = tabs[0].url;
      return url;
      // use `url` here inside the callback because it's asynchronous!
  });
}



document.getElementById("collapsebutton").addEventListener("click",function(){
  document.getElementById("collapsecontent").style.display="block"
})
document.getElementById("addcontact").addEventListener("click",function(){
  const newContact = {
    firstname : document.getElementById("addfirstname").value,
    lastname : document.getElementById("addlastname").value,
    phone : document.getElementById("addphone").value,
  }
  chrome.storage.sync.get(["contacts"], function (result) {
    console.log(result.contacts)
    if (!result.contacts){
      chrome.storage.sync.set({contacts:JSON.stringify([newContact])},function(){console.log("new contact stored")})
    }else{
      chrome.storage.sync.set({contacts:JSON.stringify([...JSON.parse(result.contacts), newContact])},function(){console.log("new contact stored")})
    }
    
    listContacts()
    document.getElementById("addfirstname").value = ""
    document.getElementById("addlastname").value = ""
    document.getElementById("addphone").value = ""
    document.getElementById("collapsecontent").style.display="none"
  })
})
//Rex Sent Functionality
let butts = document.getElementsByClassName("button");
let sentRex = 0;




  var data = JSON.stringify({"user" : "Vikram", "message": "message"});
  let url = "http://127.0.0.1:5000/api/echo-json"
  sendMessageViaJSON("POST", url, data);

