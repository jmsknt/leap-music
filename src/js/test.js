var osc1 = new p5.Oscillator();
osc1.setType('sine');
osc1.amp(1);

var osc2 = new p5.Oscillator();
osc2.setType('sine');
osc2.amp(0.33);

var osc3 = new p5.Oscillator();
osc3.setType('sine');
osc3.amp(0.2);

var osc4 = new p5.Oscillator();
osc4.setType('sine');
osc4.amp(0.14);

var osc5 = new p5.Oscillator();
osc5.setType('sine');
osc5.amp(0.11);

var osc6 = new p5.Oscillator();
osc6.setType('sine');
osc6.amp(0.091);

var osc7 = new p5.Oscillator();
osc6.setType('sine');
osc6.amp(0.077);


// square wave is generated through the odd harmonics of the base frequency:
// frequency is mutliplied by n and amplitude is divided by n, 
// e.g. 3rd harmonic of 110 Hz at amplitude 1 is 550 Hz with 0.33 amplitude

primaryFrequency = 110
osc1.freq(primaryFrequency);
osc2.freq(primaryFrequency * 3);
osc3.freq(primaryFrequency * 5);
osc4.freq(primaryFrequency * 7);
osc5.freq(primaryFrequency * 9);
osc6.freq(primaryFrequency * 11);
osc7.freq(primaryFrequency * 13);

osc1.start();
osc2.start();
osc3.start();
osc4.start();
osc5.start();
osc6.start();
osc7.start();
