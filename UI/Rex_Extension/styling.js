
document.querySelector("#collapsebutton").addEventListener("click", function(e){
    const display = document.querySelector("#collapsecontent").style.display
    if (display==="none"){
        document.querySelector("#collapsecontent").style.display="block"
    }else{
        document.querySelector("#collapsecontent").style.display="none"
    }
})



//API function
function callAPI(method, url, data){
    return new Promise (function(resolve, reject){
            let xhr = new XMLHttpRequest();     
            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(data);    
            xhr.onreadystatechange = function(){
                if (this.readyState === XMLHttpRequest.DONE ){
                    return resolve(xhr.response)
                }
            }
    })
  }

let butts = document.getElementsByClassName("button");

for (i = 0; i < butts.length; i++) {
    butts[i].addEventListener("click", fun);
}

function fun() {
    let text = document.createElement("div");
    text.className = "ui small label";
    text.innerHTML = "Sent!";
    this.parentNode.replaceChild(text, this);  
}