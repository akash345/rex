/*global chrome*/
function getURL() {
console.log('Where do you want to send this url:');
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs =>  {
                let url = tabs[0].url;
                console.log(url)
            });
    }
