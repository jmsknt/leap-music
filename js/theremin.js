var output = null;
var leapOptions = { enableGestures: false };
var frequency = 0;
var primary_vol = 0.0;
var harmonics_vol = 0.0;
var handPosition;
var output;

// primary oscillator
var osc = new p5.Oscillator();
osc.setType('sine');
osc.amp(primary_vol)

// set of oscillators to perform fourier transform 
var f_osc = new p5.Oscillator();
f_osc.setType('sine');
f_osc.amp(primary_vol);

var f_osc2 = new p5.Oscillator();
f_osc2.setType('sine');
f_osc2.amp(primary_vol);

var f_osc3 = new p5.Oscillator();
f_osc3.setType('sine');
f_osc3.amp(primary_vol);

var f_osc4 = new p5.Oscillator();
f_osc4.setType('sine');
f_osc4.amp(primary_vol);


// main loop
Leap.loop(leapOptions, function (frame) {

    // Display Frame object data
    frameOutput = document.getElementById("frameData");

    output = "Frame ID: " + frame.id + "<br />"
        + "Timestamp: " + frame.timestamp + " &micro;s<br />"
    

    if (frame.hands.length > 0) {
        osc.start();
        f_osc.start();
        f_osc2.start();
        f_osc3.start();
        f_osc4.start();

        hand = frame.hands[0];
        handPosition = hand.palmPosition;
        
        osc.amp(primary_vol);
        f_osc.amp(harmonics_vol)/0.33; // third harmonic
        f_osc2.amp(harmonics_vol)/0.20; // fifth harmonic
        f_osc3.amp(harmonics_vol)/0.14; // seventh harmonic
        f_osc4.amp(harmonics_vol)/0.11; // ninth harmonic

        if (handPosition[1] > 350) {
            primary_vol = 0.0;    
        }
        else {
            // scale frequency into 4th octave (middle octave)
            frequency = ((523.25 -  261.63) * handPosition[1]-30) / (300) +  261.63;
            osc.freq(frequency);
            f_osc.freq(frequency * 3);
            f_osc2.freq(frequency * 5);
            f_osc3.freq(frequency * 7);
            f_osc4.freq(frequency * 9);
        

            primary_vol = 1-(hand.grabStrength);
            harmonics_vol = primary_vol * Math.max(0, (hand.roll() / -1.57))

            output += "<br />" + "Hand detected, play sound!" + "<br />"
            // + "Primary hand position X: " + (handPosition[0]) + "<br />"
            + "Hand position Y: " + (handPosition[1]) + "<br />"
            // + "Primary hand position Z: " + (handPosition[2]) + "<br />"
            + "Hand rotation angle: " + hand.roll() + "<br />"
            + "Volume: " + (primary_vol) + "<br />"
            + "Frequency: " + Math.round(frequency).toFixed(2) + "<br />";
        }

    }
    else {
        primary_vol = 0.0;
    }
    frameOutput.innerHTML = "<div>" + output + "</div>";

})
