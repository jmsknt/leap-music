var previousFrame = null;
var output = null;
var leapOptions = { enableGestures: false };
var primaryFrequency = 0;
var amplitude = 0.0;
var primaryPhase = 0.0;
var secondaryFrequency = 0;
var primaryHand;
// var secondaryHand;
var output;
var frameOutput;


// P5 STUFF
var primaryOsc = new p5.Oscillator();
primaryOsc.setType('sine');
primaryOsc.amp(amplitude)
primaryOsc.start();

var primaryOscPartner = new p5.Oscillator();
primaryOscPartner.setType('sine');
primaryOscPartner.amp(amplitude);
primaryOscPartner.start();
 
primaryOsc.disconnect();
primaryOscPartner.disconnect();

reverb = new p5.Reverb();
reverb.process(primaryOsc, 1, 2);
reverb.process(primaryOscPartner, 1, 5);

primaryOsc.amp(0.6);
primaryOsc.freq(523.25);
primaryOsc.start();

// // main loop
// Leap.loop(leapOptions, function (frame) {

//     // Display Frame object data
//     frameOutput = document.getElementById("frameData");

//     output = "Frame ID: " + frame.id + "<br />"
//         + "Timestamp: " + frame.timestamp + " &micro;s<br />"
    

//     if (frame.hands.length > 0) {
//         primaryHand = frame.hands[0];
        
//         // P5 STUFF

//         primaryFrequency = 5 * primaryHand.palmPosition[1];
//         primaryOsc.freq(primaryFrequency);
//         primaryOscPartner.freq(primaryFrequency);
    

//         amplitude = 1-(primaryHand.grabStrength);
//         primaryOsc.amp(amplitude);
//         primaryOscPartner.amp(0);

//         output += "<br />" + "Hand detected, play sound!" + "<br />"
//         + "Primary hand position X: " + (primaryHand.palmPosition[0]) + "<br />"
//         + "Primary hand position Y: " + (primaryHand.palmPosition[1]) + "<br />"
//         + "Primary hand position Z: " + (primaryHand.palmPosition[2]) + "<br />"
//         + "Primary hand amplitude: " + (amplitude) + "<br />"
//         + "Primary hand frequency: " + Math.round(primaryFrequency).toFixed(2) + "<br />";
    
//     }
//     else {
//         primaryOsc.amp(0.0);
//         primaryOscPartner.amp(0.0);    

//     }
//     frameOutput.innerHTML = "<div>" + output + "</div>";

//     // Store frame for motion functions
//     previousFrame = frame;

// })
