var aFoundPrimes = [];
var iIsThisAPrime = 1;
var bDebug = false;

onmessage = function(e) {
  var command = e.data[0];

  debugLog('Message received from main script:' + command);
  switch (command) {
    case "init":
      aFoundPrimes.length = 0;
      iIsThisAPrime = 1;
      postMessage(["initRespond"]);
      debugLog('initRespond back to main script');
      break;

    case "start":
      iIsThisAPrime++;
      var iWorkersResult = -1;
      if (fnTestPrime(iIsThisAPrime)) {
        iWorkersResult = iIsThisAPrime;
        aFoundPrimes[aFoundPrimes.length] = iIsThisAPrime;
      }

      postMessage(["startRespond", iWorkersResult]);
      debugLog('startRespond back to main script');
      break;
    case "stop":
      postMessage(["stopRespond", fnPrintResult(true)]);
      debugLog('stopRespond back to main script');
      break;
    case "close":
      close();
      break;
    default:
      debugLog('Worker received unknown message');
  }
}

var fnTestPrime = function(iIsThisAPrime) {
  for (var iPreviousPrime = 0; iPreviousPrime < aFoundPrimes.length - 1; iPreviousPrime++) {
    if (iIsThisAPrime % aFoundPrimes[iPreviousPrime] == 0)
      return false;
  }
  return true;
}

var fnPrintResult = function(desc = false) {
  var sResult = ""
  if (desc) {
    for (var iPreviousPrime = aFoundPrimes.length - 1; iPreviousPrime >= 0; iPreviousPrime--) {
      sResult += iPreviousPrime + ": " + aFoundPrimes[iPreviousPrime] + "<br />";
    }
  } else {
    for (var iPreviousPrime = 0; iPreviousPrime < aFoundPrimes.length - 1; iPreviousPrime++) {
      sResult += iPreviousPrime + ": " + aFoundPrimes[iPreviousPrime] + "<br />";
    }
  }
  return sResult;
}

var debugLog = function(s) {
  if (bDebug)
    console.log(s);
}
