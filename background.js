var loop = false;
var currentTime;
var seconds;
var minutes;
var hours;
var id = null;
chrome.browserAction.getBadgeText({}, function(result) {
    currentTime = result;
});
function startTimer(loop,parent) {
    if (id != null) window.clearInterval(id);
    currentID=setInterval( function(){
        if (loop) {
        seconds++;
        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes == 60) {
          hours++;
          minutes=0;
        }
        chrome.browserAction.setBadgeText({text: hours+":"+minutes+":"+seconds});
        chrome.browserAction.setTitle({title:hours+":"+minutes+":"+seconds});
      }
      },1000);
      return currentID;
}
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.funct == "start" && id == null) {
          chrome.browserAction.getBadgeText({}, function(result) {
              currentTime = result;
          });
          // wait till get
          setTimeout(function(){
          if (!currentTime || currentTime=="") {
            seconds = 0;
            minutes = 0;
            hours = 0;
          }
          else {
            divTime = currentTime.split(":");
            seconds = divTime[2];
            minutes = divTime[1];
            hours = divTime[0];
          }
          loop = true;
          id = startTimer(loop,"start");
          }, 1000);
        }
        if (request.funct == "pause") {
          loop = false;
          window.clearInterval(id);
          id = null;
        }
        if (request.funct == "reset") {
          seconds = 0;
          minutes = 0;
          hours = 0;
          chrome.browserAction.setBadgeText({text: hours+":"+minutes+":"+seconds});
          loop = true;
          id = startTimer(loop,"reset");
        }
      });
