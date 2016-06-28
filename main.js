var stopRespond = false;
var bDebug = false;

var initButton = document.querySelector('#init');
var startButton = document.querySelector('#start');
var stopButton = document.querySelector('#stop');
var result = document.querySelector('.result');

if (window.Worker) { // Check if Browser supports the Worker api.
  // Requries script name as input
  var myWorker = new Worker("worker.js");

  initButton.onclick = function() {
    myWorker.postMessage(["init"]); // Sending message as an array to the worker
    debugLog('initButton posted to worker');
  };

  startButton.onclick = function() {
    stopRespond = false;
    myWorker.postMessage(["start"]); // Sending message as an array to the worker
    debugLog('startButton posted to worker');
  };

  stopButton.onclick = function() {
    myWorker.postMessage(["stop"]); // Sending message as an array to the worker
    debugLog('stopButton posted to worker');
  };

  myWorker.onmessage = function(e) {
    var command = e.data[0];

    debugLog('Worker:' + command);
    switch (command) {
      case "initRespond":
        break;
      case "startRespond":
        if (!stopRespond) {
          if (e.data[1] != "-1") {
            result.textContent = e.data[1];
          }
          myWorker.postMessage(["start"]);
        }
        break;
      case "stopRespond":
        stopRespond = true;
        result.innerHTML = e.data[1];
        break;
      case "closeRespond":
        break;
      default:
        debugLog('unknown message from worker');
    }
  };
}

var debugLog = function(s) {
  if (bDebug)
    console.log(s);
}
