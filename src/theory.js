function halfStepsToInterval(halfSteps) {
  const intervals = {
    0:  'P1',
    1:  'm2',
    2:  'M2',
    3:  'm3',
    4:  'M3',
    5:  'P4',
    6:  'A4',
    7:  'P5',
    8:  'm6',
    9:  'M6',
    10: 'm7',
    11: 'M7'
  };
  return intervals[halfSteps % 12];
}

function intervalBetween(midiKey0, midiKey1) {
  const distance = Math.abs(midiKey0 - midiKey1);
  return {
    interval: halfStepsToInterval(distance),
    isCompound: distance >= 12,
    direction: midiKey0 > midiKey1 ? 'down' : 'up'
  };
}

export { halfStepsToInterval, intervalBetween };
