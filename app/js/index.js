//Loading Checkpoints
//var drum_machine = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn');

//var drum_machine = new mm.MusicRNN('https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/drum_kit_rnn');

var drum_machine = new mm.MusicRNN('checkpoints/drumkit_rnn');

//var music_machine = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');

var music_machine = new mm.MusicRNN('checkpoints/melody_rnn');

Promise.all([drum_machine.initialize(),music_machine.initialize()]).then(function() {
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
    'rows': 45,
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
var saveMenu = document.getElementById("saveMenu");
var notification = document.querySelector('.mdl-js-snackbar');

//initialize sounds
var drum_kick = new Tone.Player("sounds/kick.mp3").toMaster();
var drum_snare = new Tone.Player("sounds/snare.mp3").toMaster();

var drum_tom_high = new Tone.Player("sounds/tom-high.mp3").toMaster();
var drum_tom_mid = new Tone.Player("sounds/tom-mid.mp3").toMaster();
var drum_tom_low = new Tone.Player("sounds/tom-low.mp3").toMaster();

var drum_hihat_open = new Tone.Player("sounds/hihat-open.mp3").toMaster();
var drum_hihat_closed = new Tone.Player("sounds/hihat-closed.mp3").toMaster();

var drum_clap = new Tone.Player("sounds/clap.mp3").toMaster();
var drum_ride = new Tone.Player("sounds/ride.ogg").toMaster();

var notification_main = new Tone.Player("sounds/slow-spring-board.mp3").toMaster();
var notification_end = new Tone.Player("sounds/jingle-bells-sms.mp3").toMaster();

var toneynth = new Tone.Synth().toMaster();


//initializing variables
var drumSeq;
var melodySeq;
var playTempo = numberTemp.value;
var rnn_temperature = numberVar.value;
var sampleMelody = Melody1;

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
    saveMenu.disabled = true;

    notification_main.start();

    if (drum_machine.isInitialized() == true && music_machine.isInitialized() == true) {


        /*let drumSeq = await drum_machine.sample(1, 0.5);
		mm.Player().start(drumseq);
		console.log(JSON.stringify(drumSeq));*/
        grandSequencer.matrix.populate.all([0, 0]);

        //var music_qns = mm.sequences.quantizeNoteSequence(Melody5, 1);

        drumSeq = await drum_machine.continueSequence(Drumkit1, 32, rnn_temperature);
        melodySeq = await music_machine.continueSequence(sampleMelody, 32, rnn_temperature);

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


        for (var i = 0; melodySeq.notes.length > i; i++) {
            var counters = melodySeq.notes[i].quantizedStartStep;
            var pitch = melodySeq.notes[i].pitch;
            var rowCell = pitch - 48;

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
        saveMenu.disabled =false;

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
    if (v[45] == 1) {
        drum_kick.start();
    }
    if (v[44] == 1) {
        drum_snare.start();
    }
    if (v[43] == 1) {
        drum_tom_high.start();
    }
    if (v[42] == 1) {
        drum_tom_mid.start();
    }
    if (v[41] == 1) {
        drum_tom_low.start();
    }
    if (v[40] == 1) {
        drum_hihat_open.start();
    }
    if (v[39] == 1) {
        drum_hihat_closed.start();
    }
    if (v[38] == 1) {
        drum_clap.start();
    }
    if (v[37] == 1) {
        drum_ride.start();
    }
    for (var i=0; i < 37; i++) {
        var pitch = i + 48;
        if (v[i] == 1) {
            toneynth.triggerAttackRelease(Tone.Frequency(pitch, "midi").toFrequency(), '8n');
        }
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
        case "Melody1":
            sampleMelody = Melody1;
            break;
        case "Melody2":
            sampleMelody = Melody2;
            break;
        case "Melody3":
            sampleMelody = Melody3;
            break;
        case "Melody4":
            sampleMelody = Melody4;
            break;
        case "Melody5":
            sampleMelody = Melody5;
            break;
    }
};

function saveUpdate() {
    //console.log(saveMenu);
    saveMenu.value = saveMenu.value
}

function saveMIDI () {
    var midiType = saveMenu.value;

    if (midiType == 'drums') {
        const midiB = mm.sequenceProtoToMidi(drumSeq);
        const fileB = new Blob([midiB], {type: 'audio/midi'});
        saveAs(fileB, 'drums_by_buddhilive' + Date.now() + '.mid');
    } else if (midiType == 'melody') {
        const midiB = mm.sequenceProtoToMidi(melodySeq);
        const fileB = new Blob([midiB], {type: 'audio/midi'});
        saveAs(fileB, 'melody_by_buddhilive' + Date.now() + '.mid');
    }

}

grandSequencer.on('change', function(v) {
    var pitch = v.row + 48
    //toneynth.triggerAttackRelease(Tone.Frequency(pitch, "midi").toFrequency(), '8n');
    });