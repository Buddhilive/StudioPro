var Melody1 = {
  notes: [
            {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2},
            {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4},
            {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6},
            {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8},
            {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10},
            {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12},
            {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16},
            {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18},
            {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20},
            {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22},
            {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24},
            {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26},
            {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28},
            {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32}
        ],
		quantizationInfo: {stepsPerQuarter: 1},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 32
};

var Melody2 = {
  notes:[
            {pitch: 64, quantizedStartStep: 0, quantizedEndStep: 2},
            {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4},
            {pitch: 64, quantizedStartStep: 4, quantizedEndStep: 6},
            {pitch: 60, quantizedStartStep: 6, quantizedEndStep: 8},
            {pitch: 65, quantizedStartStep: 8, quantizedEndStep: 10},
            {pitch: 60, quantizedStartStep: 10, quantizedEndStep: 12},
            {pitch: 65, quantizedStartStep: 12, quantizedEndStep: 14},
            {pitch: 60, quantizedStartStep: 14, quantizedEndStep: 16},
            {pitch: 67, quantizedStartStep: 16, quantizedEndStep: 18},
            {pitch: 60, quantizedStartStep: 18, quantizedEndStep: 20},
            {pitch: 67, quantizedStartStep: 20, quantizedEndStep: 22},
            {pitch: 60, quantizedStartStep: 22, quantizedEndStep: 24},
            {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26},
            {pitch: 59, quantizedStartStep: 26, quantizedEndStep: 28},
            {pitch: 62, quantizedStartStep: 28, quantizedEndStep: 30},
            {pitch: 59, quantizedStartStep: 30, quantizedEndStep: 32}
        ],
  quantizationInfo: {stepsPerQuarter: 1},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 32
};

var Melody3 = {
  notes: [
            {pitch: 57, quantizedStartStep: 0, quantizedEndStep: 4},
            {pitch: 62, quantizedStartStep: 4, quantizedEndStep: 6},
            {pitch: 64, quantizedStartStep: 6, quantizedEndStep: 8},
            {pitch: 65, quantizedStartStep: 8, quantizedEndStep: 10},
            {pitch: 62, quantizedStartStep: 10, quantizedEndStep: 12},
            {pitch: 64, quantizedStartStep: 12, quantizedEndStep: 16},
            {pitch: 60, quantizedStartStep: 16, quantizedEndStep: 20},
            {pitch: 62, quantizedStartStep: 20, quantizedEndStep: 26},
            {pitch: 57, quantizedStartStep: 26, quantizedEndStep: 28},
            {pitch: 57, quantizedStartStep: 28, quantizedEndStep: 32}
        ],
  quantizationInfo: {stepsPerQuarter: 1},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 32
};

var Melody4 = {
  notes: [
  {pitch: 64, quantizedStartStep: 0, quantizedEndStep: 1},
            {pitch: 62, quantizedStartStep: 1, quantizedEndStep: 2},
            {pitch: 64, quantizedStartStep: 2, quantizedEndStep: 3},
            {pitch: 65, quantizedStartStep: 3, quantizedEndStep: 4},
            {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 8},
            {pitch: 60, quantizedStartStep: 16, quantizedEndStep: 17},
            {pitch: 59, quantizedStartStep: 17, quantizedEndStep: 18},
            {pitch: 60, quantizedStartStep: 18, quantizedEndStep: 19},
            {pitch: 62, quantizedStartStep: 19, quantizedEndStep: 20},
            {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 24},
 
  ],
  quantizationInfo: {stepsPerQuarter: 1},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 24
};

var Melody5 = {
  notes: [
  {pitch: 48, quantizedStartStep: 0, quantizedEndStep: 2},
            {pitch: 52, quantizedStartStep: 2, quantizedEndStep: 4},
            {pitch: 55, quantizedStartStep: 4, quantizedEndStep: 6},
            {pitch: 60, quantizedStartStep: 6, quantizedEndStep: 8},
            {pitch: 64, quantizedStartStep: 8, quantizedEndStep: 10},
            {pitch: 67, quantizedStartStep: 10, quantizedEndStep: 12},
            {pitch: 64, quantizedStartStep: 12, quantizedEndStep: 14},
            {pitch: 60, quantizedStartStep: 14, quantizedEndStep: 16},
            {pitch: 57, quantizedStartStep: 16, quantizedEndStep: 18},
            {pitch: 60, quantizedStartStep: 18, quantizedEndStep: 20},
            {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22},
            {pitch: 69, quantizedStartStep: 22, quantizedEndStep: 24},
            {pitch: 72, quantizedStartStep: 24, quantizedEndStep: 26},
            {pitch: 76, quantizedStartStep: 26, quantizedEndStep: 28},
            {pitch: 72, quantizedStartStep: 28, quantizedEndStep: 30},
            {pitch: 69, quantizedStartStep: 30, quantizedEndStep: 32}
 
  ],
  quantizationInfo: {stepsPerQuarter: 1},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 32
};



var Drumkit1 = {
  notes: [
    { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
    { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
    { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
    { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
    { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
    { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
    { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
    { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
    { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
    { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
    { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
    { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
    { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
    { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
    { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
    { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
    { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
    { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 11
};