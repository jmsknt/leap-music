var output = "";
var leapOptions = {enableGestures: false};
var primary_freq = 0;
var secondary_freq = 0;
var primary_amp = 0;
var secondary_amp = 0;

// primary hand base oscillator
var b_osc = new p5.Oscillator();
b_osc.setType('sine');
b_osc.amp(primary_amp);
b_osc.start();

// primary hand 2nd harmonic 
var h_osc = new p5.Oscillator();
h_osc.setType('sine');
h_osc.amp(primary_amp);
h_osc.start();

// secondary hand base oscillator
var b_osc2 = new p5.Oscillator();
b_osc2.setType('sine')
b_osc2.amp(secondary_amp);
b_osc2.start();

// secondary hand 2nd harmonic
var h_osc2 = new p5.Oscillator();
h_osc2.setType('sine');
h_osc2.amp(secondary_amp);
h_osc2.start();

Leap.loop(leapOptions, function(frame) {

    // Display Frame object data
    var frameOutput = document.getElementById("frameData");

    if (frame.hands.length > 0) {
            
        var hand_one = frame.hands[0];
        var osc_one = handOscillator(output, hand_one, b_osc, h_osc, primary_amp, primary_freq);

        frameOutput.innerHTML = "<div>" + osc_one + "</div>";

        if (frame.hands.length > 1) {
            var hand_two = frame.hands[1];
            var osc_two = handOscillator(output, hand_two, b_osc2, h_osc2, secondary_amp, secondary_freq);
    
            frameOutput.innerHTML += "<div>" + osc_two + "</div>";

        }

    }
    else {
        b_osc.amp(0);
        h_osc.amp(0);
        b_osc2.amp(0);
        h_osc2.amp(0);
    }

})

function handOscillator(output, hand, osc, harmonic, amplitude, frequency) {

    if (20 < hand.palmPosition[1] && hand.palmPosition[1] < 60) {
        frequency = 261.63 // play C4
        output += "<br />" + "<b>Playing</b> C4" + "<br />" + "Harmonic: " + frequency*2;
    }
    else if (60 < hand.palmPosition[1] && hand.palmPosition[1] < 100) {
        frequency = 293.66 // play D4
        output += "<br />" + "<b>Playing</b> D4" + "<br />" + "Harmonic: " + frequency*2;
    }
    else if (100 < hand.palmPosition[1] && hand.palmPosition[1] < 140) {
        frequency = 329.63 // play E0
        output += "<br />" + "<b>Playing</b> E4" + "<br />" + "Harmonic: " + frequency*2;

    }
    else if (140 < hand.palmPosition[1] && hand.palmPosition[1] < 180) {
        frequency = 349.23; // play F0
        output += "<br />" + "<b>Playing</b> F4" + "<br />" + "Harmonic: " + frequency*2;
    }
    else if (180 < hand.palmPosition[1] && hand.palmPosition[1] < 220) {
        frequency = 392.00; // play G0
        output += "<br />" + "<b>Playing</b> G4" + "<br />" + "Harmonic: " + frequency*2;
    }
    else if (220 < hand.palmPosition[1] && hand.palmPosition[1] < 260) {
        frequency = 440.00; // play G0
        output += "<br />" + "<b>Playing</b> A4" + "<br />" + "Harmonic: " + frequency*2;
    }
    else if (260 < hand.palmPosition[1] && hand.palmPosition[1] < 300) {
        frequency = 493.88; // play G0
        output += "<br />" + "<b>Playing</b> B4" + "<br />" + "Harmonic: " + frequency*2;
    }
    
    osc.freq(frequency);
    harmonic.freq(frequency*2);

    amplitude = 1 - hand.grabStrength;

    osc.amp(amplitude);
    harmonic.amp(amplitude * Math.max(0, (hand.roll() / -1.57)));

    output += "<br /><b>Hand Volume: </b>" + Math.round(100 * amplitude) + "%" + "<br />"

    return output;
    
}