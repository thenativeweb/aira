package synthesizer

import "gitlab.com/gomidi/midi/v2"

type TR8 struct {
	Generic
}

func NewTR8(synthesizer Generic, err error) (TR8, error) {
	return TR8{synthesizer}, err
}

func (tr8 TR8) TR808() uint8 {
	return 1
}

func (tr8 TR8) TR909() uint8 {
	return 2
}

func (tr8 TR8) BassDrum() midi.Note {
	return midi.Note(midi.C(3))
}

func (tr8 TR8) BassDrumTune() uint8 {
	return 20
}

func (tr8 TR8) BassDrumAttack() uint8 {
	return 21
}

func (tr8 TR8) BassDrumDecay() uint8 {
	return 23
}

func (tr8 TR8) BassDrumCompressor() uint8 {
	return 22
}

func (tr8 TR8) SnareDrum() midi.Note {
	return midi.Note(midi.D(3))
}

// TODO: Add more sounds
