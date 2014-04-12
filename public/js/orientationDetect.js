(function (exports) {

  var count = 0;
  var preLR = 0;
  var preFB = 0;
  exports.sending = false;

  init();

  function init() {
    if (mobile) {
      if (window.DeviceOrientationEvent) {
        //document.getElementById("doEvent").innerHTML = "DeviceOrientation";
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function (eventData) {
          // gamma is the left-to-right tilt in degrees, where right is positive
          var tiltLR = eventData.gamma;

          // beta is the front-to-back tilt in degrees, where front is positive
          var tiltFB = eventData.beta;

          // call our orientation event handler
          deviceOrientationHandler(tiltLR, tiltFB);
        }, false);
      } else {
        document.getElementById("doEvent").innerHTML =
          "Not supported on your device or browser, sorry.";
      }
    }
  }

  function deviceOrientationHandler(tiltLR, tiltFB) {
    document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);

    count++;
    exports.lr = Math.round(tiltLR);
    exports.fb = Math.round(tiltFB);
    if (count % 4 === 0) {
      socket.emit('lrData', exports.lr);
      socket.emit('fbData', exports.fb);
      exports.sending = true;
    } else {
      exports.sending = false;
    }
  }

})(this);