
// document.querySelector("#collapsebutton").addEventListener("click", function(e){
//     const display = document.querySelector("#collapsecontent").style.display
//     if (display==="none"){
//         document.querySelector("#collapsecontent").style.display="block"
//     }else{
//         document.querySelector("#collapsecontent").style.display="none"
//     }
// })



// //API function
// function sendMessageViaJSON(method, url, data){
//   alert("started sending");
//     return new Promise (function(resolve, reject){
//             var xhr = new XMLHttpRequest();
//             xhr.open(method, url, true);
//             xhr.setRequestHeader("Content-Type", "application/json")
//             xhr.send(data);
//             xhr.onreadystatechange = function(){
//                 if (this.readyState === XMLHttpRequest.DONE ){
//                     return resolve(xhr.response)
//                 }
//             }
//     })
//     alert("finished sending");
//   }

  //Send JSON function
  function sendMessageViaJSON(method, url, data){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    xhr.send(data);
    }

let butts = document.getElementsByClassName("button");

for (i = 0; i < butts.length; i++) {
    butts[i].addEventListener("click", fun);
}


function fun() {

    const user = {
        firstname : document.getElementById("userFirstName").value,
        lastname : document.getElementById("userLastName").value,
        phone : document.getElementById("userPhone").value,
    }
    const contact1 = {
        firstname : document.getElementById("contact1FirstName").value,
        lastname : document.getElementById("contact1LastName").value,
        phone : document.getElementById("contact1Phone").value,
    }
    const contact2 = {
        firstname : document.getElementById("contact2FirstName").value,
        lastname : document.getElementById("contact2LastName").value,
        phone : document.getElementById("contact2Phone").value,
    }
    const contact3 = {
        firstname : document.getElementById("contact3FirstName").value,
        lastname : document.getElementById("contact3LastName").value,
        phone : document.getElementById("contact3Phone").value,
    }
    console.log(user)
    console.log(contact1)
    console.log(contact2)
    console.log(contact3)
    chrome.storage.sync.set({user:JSON.stringify(user)},function(){console.log("userinfo stored")})
    chrome.storage.sync.set({contact1:JSON.stringify(contact1)},function(){console.log("contact1info stored")})
    chrome.storage.sync.set({contact2:JSON.stringify(contact2)},function(){console.log("contact2info stored")})
    chrome.storage.sync.set({contact3:JSON.stringify(contact3)},function(){console.log("contact3info stored")})
    chrome.browserAction.setPopup({
        popup:"index.html"
    });




    let text = document.createElement("div");
    text.className = "ui small label";
    text.innerHTML = "Sent";
    this.parentNode.replaceChild(text, this);
    var data = JSON.stringify({"user" : "Vikram", "message": "message"});
    let url = "http://127.0.0.1:5000/api/echo-json"
    sendMessageViaJSON("POST", url, data);
}

//begin button
document.getElementById("beginbutton").addEventListener("click",function(){


})
