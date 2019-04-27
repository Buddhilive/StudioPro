//Loading Checkpoints
var drum_machine = new mm.MusicRNN('../checkpoints/drumkit_rnn');

Promise.all([drum_machine.initialize()]).then(function() {
    setTimeout(function(){ 
        document.getElementById("theOverlay").style.display = "none";
        document.getElementById("theModal").style.display = "none";
    }, 3000);
});

//Initializing UI Components
var seqWidth = window.innerWidth - 400;
var seqHeight = window.innerHeight - 180;

var grandSequencer = new Nexus.Sequencer('#grandMatrix', {
    'size': [seqWidth, seqHeight],
    'mode': 'toggle',
    'rows': 9,
    'columns': 32
});
grandSequencer.colorize("accent","#FF6F00");
grandSequencer.colorize("fill","#37474F");

var dialerVar = new Nexus.Dial('#dialerVar' ,{
    'size': [50,50],
    'interaction': 'radial',
    'mode': 'relative', 
    'min': 0.5,
    'max': 2,
    'step': 0.1,
    'value': 1
});
dialerVar.colorize("accent","#FF6F00");
var numberVar= new Nexus.Number('#numberVar');
numberVar.link(dialerVar);

var dialerTemp = new Nexus.Dial('#dialerTemp' ,{
    'size': [50,50],
    'interaction': 'radial', 
    'mode': 'relative', 
    'min': 100,
    'max': 400,
    'step': 20,
    'value': 200
});
dialerTemp.colorize("accent","#FFA800");
var numberTemp = new Nexus.Number('#numberTemp');
numberTemp.link(dialerTemp);

//button functions declaration
document.getElementById("btnPlay").onclick = function() {playSequence()};
document.getElementById("btnStop").onclick = function() {stopSequence()};
document.getElementById("btnGenerate").onclick = function() {generateMusic()};
document.getElementById("btnSettings").onclick = function() {updateSetup()};
var btnSave = document.getElementById("btnSave");
btnSave.onclick = function() {saveMIDI()};
var melodyMenu = document.getElementById("melodyMenu");
var notification = document.querySelector('.mdl-js-snackbar');

//initialize sounds
var drum_kick = new Tone.Player("../sounds/kick.mp3").toMaster();
var drum_snare = new Tone.Player("../sounds/snare.mp3").toMaster();

var drum_tom_high = new Tone.Player("../sounds/tom-high.mp3").toMaster();
var drum_tom_mid = new Tone.Player("../sounds/tom-mid.mp3").toMaster();
var drum_tom_low = new Tone.Player("../sounds/tom-low.mp3").toMaster();

var drum_hihat_open = new Tone.Player("../sounds/hihat-open.mp3").toMaster();
var drum_hihat_closed = new Tone.Player("../sounds/hihat-closed.mp3").toMaster();

var drum_clap = new Tone.Player("../sounds/clap.mp3").toMaster();
var drum_ride = new Tone.Player("../sounds/ride.ogg").toMaster();

var notification_main = new Tone.Player("../sounds/slow-spring-board.mp3").toMaster();
var notification_end = new Tone.Player("../sounds/jingle-bells-sms.mp3").toMaster();

var toneynth = new Tone.Synth().toMaster();


//initializing variables
var drumSeq;
var playTempo = numberTemp.value;
var rnn_temperature = numberVar.value;
var sampleDrumkit = Drumkit1;

//melodyMenu.innerHTML = "Melody1";


//Program
function playSequence() {
    grandSequencer.start(playTempo);
    document.getElementById("btnStop").disabled = false;
    document.getElementById("btnPlay").disabled = true;
}

function stopSequence() {
    grandSequencer.stop();
    document.getElementById("btnPlay").disabled = false;
    document.getElementById("btnStop").disabled = true;
}

async function generateMusic() {
    btnSave.disabled = true;

    notification_main.start();

    if (drum_machine.isInitialized() == true) {


        /*let drumSeq = await drum_machine.sample(1, 0.5);
		mm.Player().start(drumseq);
		console.log(JSON.stringify(drumSeq));*/
        grandSequencer.matrix.populate.all([0, 0]);

        //var music_qns = mm.sequences.quantizeNoteSequence(Melody5, 1);

        drumSeq = await drum_machine.continueSequence(sampleDrumkit, 32, rnn_temperature);
        

        //console.log(JSON.stringify(melodySeq));

        for (var i = 0; drumSeq.notes.length > i; i++) {
            var counters = drumSeq.notes[i].quantizedStartStep;
            var pitch = drumSeq.notes[i].pitch;
            var rowCell = 0;

            switch (pitch) {
                case 36:
                    rowCell = 0;
                    break;
                case 38:
                    rowCell = 1;
                    break;
                case 50:
                    rowCell = 2;
                    break;
                case 48:
                    rowCell = 3;
                    break;
                case 45:
                    rowCell = 4;
                    break;
                case 46:
                    rowCell = 5;
                    break;
                case 42:
                    rowCell = 6;
                    break;
                case 39:
                    rowCell = 7;
                    break;
                case 51:
                    rowCell = 8;
                    break;
            }
            //new mm.Player().start(drumSeq);

            grandSequencer.matrix.set.cell(counters, rowCell, 1);
            //console.log("Column:"+counters+" Row:" + rowCell);
        }

        notification.MaterialSnackbar.showSnackbar(
            {
                message: 'Music Generated!',
                timeout: 2000
            }
        );

        notification_end.start();
        btnSave.disabled = false;

        /*const teapot = await mm.urlToNoteSequence("midi/DRUM1.mid");
		const drums_qns = mm.sequences.quantizeNoteSequence(teapot, 4);
		drum_machine.continueSequence(drums_qns, 32, 0.5).then((drumSeq) => {
			console.log("in");
			new mm.Player().start(drumSeq);
		console.log(JSON.stringify(drumSeq));
		});*/
    }
}

grandSequencer.on('step', function(v) {
    //console.log(v);
    if (v[8] == 1) {
        drum_kick.start();
    }
    if (v[7] == 1) {
        drum_snare.start();
    }
    if (v[6] == 1) {
        drum_tom_high.start();
    }
    if (v[5] == 1) {
        drum_tom_mid.start();
    }
    if (v[4] == 1) {
        drum_tom_low.start();
    }
    if (v[3] == 1) {
        drum_hihat_open.start();
    }
    if (v[2] == 1) {
        drum_hihat_closed.start();
    }
    if (v[1] == 1) {
        drum_clap.start();
    }
    if (v[0] == 1) {
        drum_ride.start();
    }
    
});

function updateSetup() {
    playTempo = numberTemp.value;
    rnn_temperature = numberVar.value;
    melodyUpdate();

    document.querySelector('.mdl-layout__obfuscator').classList.remove("is-visible");
    document.querySelector('.mdl-layout__drawer').classList.remove("is-visible");
    document.getElementById("theDrawer").setAttribute('aria-hidden', true);

    notification.MaterialSnackbar.showSnackbar(
        {
            message: 'Settings Saved!',
            timeout: 2000
        }
    );

};

function melodyUpdate() {
    //console.log('change', melodyMenu.value);
    switch (melodyMenu.value) {
        case "Drumkit1":
            sampleDrumkit = Drumkit1;
            break;
        case "Drumkit2":
            sampleDrumkit = Drumkit2;
            break;
        case "Drumkit3":
            sampleDrumkit = Drumkit3;
            break;
        case "Drumkit4":
            sampleDrumkit = Drumkit4;
            break;
        case "Drumkit5":
            sampleDrumkit = Drumkit5;
            break;
    }
};


function saveMIDI () {
        const midiB = mm.sequenceProtoToMidi(drumSeq);
        const fileB = new Blob([midiB], {type: 'audio/midi'});
        saveAs(fileB, 'drums_by_buddhilive' + Date.now() + '.mid');
}

grandSequencer.on('change', function(v) {
    var pitch = v.row + 48
    //toneynth.triggerAttackRelease(Tone.Frequency(pitch, "midi").toFrequency(), '8n');
    });