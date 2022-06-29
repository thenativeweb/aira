package synthesizer

import "gitlab.com/gomidi/midi/v2"

type Synthesizer interface {
	SelectSound(bank, sound uint8)
	SetController(controller, value uint8)
	PlayNote(note midi.Note, velocity uint8)
	StopNote(note midi.Note)
	StopAllNotes()
}
