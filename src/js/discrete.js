var previousFrame = null;
var output = null;
var leapOptions = {enableGestures: false};
var currentFreq = 0;
var primaryAmplitude = 0.0;

var primaryOsc = new p5.Oscillator();
primaryOsc.setType('square');
primaryOsc.amp(primaryAmplitude)
primaryOsc.start();

// notes are ordered by octave and frequency
var notes = [
    // ocatave 0: C0, D0, E0, F0, G0, A0, B0
    [16.35,18.35,20.60,21.83,24.50,27.50,30.87],
    // ocatave 1: C1, D1, E1, F1, G1, A1, B1
    [32.70,36.71,41.20,43.65,49.00,55.00,61.74],
    // ocatave 2: C2, D2, E2, F2, G2, A2, B2
    [64.41,73.42,82.41,87.31,98.00,110.00,123.47],
    // ocatave 3: C3, D3, E3, F3, G3, A3, B3
    [130.81,146.83,164.81,174.61,190.00,220.00,246.94],
    // ocatave 4: C4, D4, E4, F4, G4, A4, B4
    [261.63,293.66,329.63,349.23,392.00,440.00,493.88],
    // ocatave 5: C5, D5, E5, F5, G5, A5, B5
    [523.25,587.33,659.25,698.25,783.99,880.00,987.77],
    // ocatave 6: C6, D6, E6, F6, G6, A6, B6
    [1046.50,1174.66,1318.51,1396.91,1567.98,1760.00,1975.53]
];

Leap.loop(leapOptions, function(frame) {

    // Display Frame object data
    var frameOutput = document.getElementById("frameData");

    var output = "Frame ID: " + frame.id  + "<br />"
                    + "Timestamp: " + frame.timestamp + " &micro;s<br />"

    if (frame.hands.length > 0) {
            
        var hand = frame.hands[0];
        primaryOsc.amp(0.1);

        if (hand.grabStrength < 0.8) {
            output += "Hand detected, play sound!" + "<br />"
            + "Freq: " + currentFreq + "<br />"
            + "Palm position X: " + (hand.palmPosition[0]) + "<br />"
            + "Palm position Y: " + (hand.palmPosition[1]) + "<br />"
            + "Palm position Z: " + (hand.palmPosition[2]) + "<br />";

            if (-100 < hand.palmPosition[0] && hand.palmPosition[0] < 100) {
                if (20 < hand.palmPosition[1] && hand.palmPosition[1] < 60) {
                    currentFreq = notes[4][0]; // play C0
                    output += "<br />" + "C0"
                }
                else if (60 < hand.palmPosition[1] && hand.palmPosition[1] < 100) {
                    currentFreq = notes[4][1]; // play D0
                    output += "<br />" + "D0"
                }
                else if (100 < hand.palmPosition[1] && hand.palmPosition[1] < 140) {
                    currentFreq = notes[4][2]; // play E0
                    output += "<br />" + "E0"

                }
                else if (140 < hand.palmPosition[1] && hand.palmPosition[1] < 180) {
                    currentFreq = notes[4][3]; // play F0
                    output += "<br />" + "F0"
                }
                else if (180 < hand.palmPosition[1] && hand.palmPosition[1] < 220) {
                    currentFreq = notes[4][4]; // play G0
                    output += "<br />" + "G0"
                }
                else if (220 < hand.palmPosition[1] && hand.palmPosition[1] < 260) {
                    currentFreq = notes[4][5]; // play G0
                    output += "<br />" + "A0"
                }
                else if (260 < hand.palmPosition[1] && hand.palmPosition[1] < 300) {
                    currentFreq = notes[4][6]; // play G0
                    output += "<br />" + "B0"
                }
            }
            console.log(notes[0][0]);
            console.log(currentFreq);
            primaryOsc.freq(currentFreq);
 

        }
        else {
            primaryOsc.amp(0.0);
        }
 
        
    }
    else {
        primaryOsc.freq(currentFreq);
    }

    frameOutput.innerHTML = "<div>" + output + "</div>";

    // Store frame for motion functions
    previousFrame = frame;

})
