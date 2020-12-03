function start() {
  chrome.runtime.sendMessage({
    funct: "start"
  })
}
function pause() {
  chrome.runtime.sendMessage({
    funct: "pause"
  })
}
function reset() {
  chrome.runtime.sendMessage({
    funct: "reset"
  })
}
window.onload = function() {
  document.getElementById('start').addEventListener('click', start);
  document.getElementById('pause').addEventListener('click', pause);
  document.getElementById('reset').addEventListener('click', reset);
}
