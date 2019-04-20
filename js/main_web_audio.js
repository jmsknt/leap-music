var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var osc = audioCtx.createOscillator();


osc.connect(audioCtx.destination);
osc.frequency.exponentialRampToValueAtTime(466.16,audioCtx.currentTime + 1);
osc.frequency.exponentialRampToValueAtTime(523.25,audioCtx.currentTime + 2);
osc.frequency.exponentialRampToValueAtTime(293.66,audioCtx.currentTime + 3);
osc.frequency.exponentialRampToValueAtTime(466.16,audioCtx.currentTime + 5);
osc.frequency.exponentialRampToValueAtTime(293.66,audioCtx.currentTime + 7);

osc.start();
