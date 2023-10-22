package synthesizer

import "gitlab.com/gomidi/midi/v2"

type TR8 struct {
	Synthesizer
}

func NewTR8(synthesizer Generic, err error) (TR8, error) {
	if err != nil {
		return TR8{}, err
	}

	return TR8{synthesizer}, nil
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

func (tr8 TR8) SnareDrumTune() uint8 {
	return 25
}

func (tr8 TR8) SnareDrumSnappiness() uint8 {
	return 26
}

func (tr8 TR8) SnareDrumDecay() uint8 {
	return 28
}

func (tr8 TR8) SnareDrumCompressor() uint8 {
	return 27
}

func (tr8 TR8) LowTom() midi.Note {
	return midi.Note(midi.G(3))
}

func (tr8 TR8) LowTomTune() uint8 {
	return 46
}

func (tr8 TR8) LowTomDecay() uint8 {
	return 47
}

func (tr8 TR8) MidTom() midi.Note {
	return midi.Note(midi.B(3))
}

func (tr8 TR8) MidTomTune() uint8 {
	return 49
}

func (tr8 TR8) MidTomDecay() uint8 {
	return 50
}

func (tr8 TR8) HighTom() midi.Note {
	return midi.Note(midi.D(4))
}

func (tr8 TR8) HighTomTune() uint8 {
	return 52
}

func (tr8 TR8) HighTomDecay() uint8 {
	return 53
}

func (tr8 TR8) Rimshot() midi.Note {
	return midi.Note(midi.Db(3))
}

func (tr8 TR8) RimshotTune() uint8 {
	return 55
}

func (tr8 TR8) RimshotDecay() uint8 {
	return 56
}

func (tr8 TR8) Handclap() midi.Note {
	return midi.Note(midi.Eb(3))
}

func (tr8 TR8) HandclapTune() uint8 {
	return 58
}

func (tr8 TR8) HandclapDecay() uint8 {
	return 59
}

func (tr8 TR8) ClosedHiHat() midi.Note {
	return midi.Note(midi.Gb(3))
}

func (tr8 TR8) ClosedHiHatTune() uint8 {
	return 61
}

func (tr8 TR8) ClosedHiHatDecay() uint8 {
	return 62
}

func (tr8 TR8) OpenHiHat() midi.Note {
	return midi.Note(midi.Bb(3))
}

func (tr8 TR8) OpenHiHatTune() uint8 {
	return 80
}

func (tr8 TR8) OpenHiHatDecay() uint8 {
	return 81
}

func (tr8 TR8) CrashCymbal() midi.Note {
	return midi.Note(midi.Db(4))
}

func (tr8 TR8) CrashCymbalTune() uint8 {
	return 83
}

func (tr8 TR8) CrashCymbalDecay() uint8 {
	return 84
}

func (tr8 TR8) RideCymbal() midi.Note {
	return midi.Note(midi.Eb(4))
}

func (tr8 TR8) RideCymbalTune() uint8 {
	return 89
}

func (tr8 TR8) RideCymbalDecay() uint8 {
	return 87
}
