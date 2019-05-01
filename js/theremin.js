var output = "";
var leapOptions = { enableGestures: false };
var frequency = 0;
var primary_vol = 0.0;
var harmonics_vol = 0.0;
var handPosition;
var max_freq = 493.88;
var min_freq = 16.35; 
var output;

// primary oscillator
var osc = new p5.Oscillator();
osc.setType('sine');
osc.amp(primary_vol)
osc.start();

// set of oscillators to perform fourier transform //
var f_osc = new p5.Oscillator();
f_osc.setType('sine');
f_osc.amp(primary_vol);
f_osc.start();

var f_osc2 = new p5.Oscillator();
f_osc2.setType('sine');
f_osc2.amp(primary_vol);
f_osc2.start();

var f_osc3 = new p5.Oscillator();
f_osc3.setType('sine');
f_osc3.amp(primary_vol);
f_osc3.start();

var f_osc4 = new p5.Oscillator();
f_osc4.setType('sine');
f_osc4.amp(primary_vol);
f_osc4.start();
//////////////////////////////////////////////////////

osc.disconnect()
f_osc.disconnect()
f_osc2.disconnect()
f_osc3.disconnect()
f_osc4.disconnect()

// reverb processing for each oscillator
reverb = new p5.Reverb();
reverb.process(osc, 1, 15);
reverb.process(f_osc, 1, 15);
reverb.process(f_osc2, 1, 15);
reverb.process(f_osc3, 1, 15);
reverb.process(f_osc4, 1, 15);

// main loop
Leap.loop(leapOptions, function (frame) {

    // display Frame object data in UI
    frameOutput = document.getElementById("frameData");

    // check if hand is present
    if (frame.hands.length > 0) {

        hand = frame.hands[0];
        handPosition = hand.palmPosition;
        
        // set volume of each oscillator
        osc.amp(primary_vol); // master

        // the value each harmonic is multiplied by is the harmonic's relative amplitude to the master
        f_osc.amp((harmonics_vol)/3); // third harmonic
        f_osc2.amp((harmonics_vol)/5); // fifth harmonic
        f_osc3.amp((harmonics_vol)/7); // seventh harmonic
        f_osc4.amp((harmonics_vol)/9); // ninth harmonic

        // determine if hand is in ideal range
        if (handPosition[1] > 350) {
            // set the volume to 0 if it isn't
            primary_vol = 0.0;    
        }
        // if the hand is in range...
        else {

            // scale user input between 0th and 6th octaves to determine base frequency
            frequency = (max_freq -  min_freq) * ((handPosition[1]-25) / 325) +  min_freq;

            osc.freq(frequency);
            
            // set the frequencies of the odd harmonics
            f_osc.freq(frequency * 3);
            f_osc2.freq(frequency * 5);
            f_osc3.freq(frequency * 7);
            f_osc4.freq(frequency * 9);
        

            // closing hand determines the volume 
            primary_vol = 1 - hand.grabStrength;

            // the initial volume of the harmonics is calculated based on hand rotation between 0 and 90 degrees
            harmonics_vol = primary_vol * Math.max(0, (hand.roll() / -1.57))

            // output information to the UI for the user
            output = "<b>Master Volume: </b>" + Math.round(100 * primary_vol) + "%" + "<br />"
            + "<b>Frequency: </b>" + Math.round(frequency) + "Hz" + "<br />"
            + "<br />" + "<b>Harmonics</b>" + "<br />"
            + "3rd harmonic: " + Math.round(frequency * 3) + "Hz" + "<br />"
            + "5th harmonic: " + Math.round(frequency * 5) + "Hz" + "<br />"
            + "7th harmonic: " + Math.round(frequency * 7) + "Hz" + "<br />"
            + "9th harmonic: " + Math.round(frequency * 9) + "Hz" + "<br />";
        }
    }
    else {
        osc.amp(0); // master
        f_osc.amp(0); // third harmonic
        f_osc2.amp(0); // fifth harmonic
        f_osc3.amp(0); // seventh harmonic
        f_osc4.amp(0); // ninth harmonic

    }
    frameOutput.innerHTML = "<div>" + output + "</div>";

})
