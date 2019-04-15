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

var osc2 = new p5.Oscillator();
osc2.setType('sine');
osc2.amp(amplitude);
osc2.start();

var osc3 = new p5.Oscillator();
osc3.setType('sine');
osc3.amp(amplitude);
osc3.start();

var osc4 = new p5.Oscillator();
osc3.setType('sine');
osc3.amp(amplitude);
osc3.start();

// primaryOsc.disconnect();
// primaryOscPartner.disconnect();

reverb = new p5.Reverb();
reverb.process(primaryOsc, 1, 5);
reverb.process(primaryOscPartner, 1, 5);
reverb.process(osc2, 1, 5);
reverb.process(osc3, 1, 5);
reverb.process(osc4, 1, 5);


// main loop
Leap.loop(leapOptions, function (frame) {

    // Display Frame object data
    frameOutput = document.getElementById("frameData");

    output = "Frame ID: " + frame.id + "<br />"
        + "Timestamp: " + frame.timestamp + " &micro;s<br />"
    

    if (frame.hands.length > 0) {
        primaryHand = frame.hands[0];
        
        if (primaryHand.palmPosition[1] > 300) {
            primaryOsc.amp(0.0);
            primaryOscPartner.amp(0.0);    
            osc2.amp(0.0);
            osc3.amp(0.0);
            osc4.amp(0.0);
    
        }
        else {
            // scale the frequency betweeen the range of 523.25 HZ (C5) and 65.41 Hz (C2)
            primaryFrequency = ((523.25 - 65.41) * primaryHand.palmPosition[1]-30) / (270) +  65.41;
            primaryOsc.freq(primaryFrequency);
            primaryOscPartner.freq(3 * primaryFrequency);
            osc2.freq(primaryFrequency * 5);
            osc3.freq(primaryFrequency * 7);
            osc4.freq(primaryFrequency * 9);
        

            amplitude = 1-(primaryHand.grabStrength);
            primaryOsc.amp(amplitude);
            primaryOscPartner.amp(amplitude);
            osc2.amp(amplitude);
            osc3.amp(amplitude);
            osc4.amp(amplitude);

            output += "<br />" + "Hand detected, play sound!" + "<br />"
            + "Primary hand position X: " + (primaryHand.palmPosition[0]) + "<br />"
            + "Primary hand position Y: " + (primaryHand.palmPosition[1]) + "<br />"
            + "Primary hand position Z: " + (primaryHand.palmPosition[2]) + "<br />"
            + "Primary hand amplitude: " + (amplitude) + "<br />"
            + "Primary hand frequency: " + Math.round(primaryFrequency).toFixed(2) + "<br />";
        }

    }
    else {
        primaryOsc.amp(0.0);
        primaryOscPartner.amp(0.0);    
        osc2.amp(0.0);
        osc3.amp(0.0);
        osc4.amp(0.0);

    }
    frameOutput.innerHTML = "<div>" + output + "</div>";

    // Store frame for motion functions
    previousFrame = frame;

})
