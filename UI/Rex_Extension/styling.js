
document.querySelector("#collapsebutton").addEventListener("click", function(e){
    const display = document.querySelector("#collapsecontent").style.display
    if (display==="none"){
        document.querySelector("#collapsecontent").style.display="block"
    }else{
        document.querySelector("#collapsecontent").style.display="none"
    }
})



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
    alert("started sending");
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
    alert("finshed sending");
    }

let butts = document.getElementsByClassName("button");

for (i = 0; i < butts.length; i++) {
    butts[i].addEventListener("click", fun);
}

function fun() {
    let text = document.createElement("div");
    text.className = "ui small label";
    text.innerHTML = "Sent";
    this.parentNode.replaceChild(text, this);
    var data = JSON.stringify({"user" : "Vikram", "message": "message"});
    let url = "http://127.0.0.1:5000/api/echo-json"
    sendMessageViaJSON("POST", url, data);
}
