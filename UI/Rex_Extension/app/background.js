/*global chrome*/
console.log("We are receiving");
/*
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
}); */



//TODO(Vikram) Populate these values from frontend user submitted data
var userName = "vikramrk"
var email = "vikramrk3@gmail.com"
var password = "rex"
var phoneNumber = 6789069312
var contactNames = ["Rao"];
var contactNum = [1112223333];

fetch('/__/firebase/init.json').then(async response => {
  firebase.initializeApp(await response.json());
});


firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

function getURL() {
console.log('Where do you want to send this url:');
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs =>  {
                let url = tabs[0].url;
                console.log(url)
            });
    }
