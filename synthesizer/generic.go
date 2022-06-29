package synthesizer

import (
	"gitlab.com/gomidi/midi/v2"
)

type Generic struct {
	channel int8
	send    func(midi.Message) error
}

func NewGeneric(port string, channel int8) (Generic, error) {
	outPort, err := midi.FindOutPort(port)
	if err != nil {
		return Generic{}, err
	}

	send, err := midi.SendTo(outPort)
	if err != nil {
		return Generic{}, err
	}

	return Generic{
		channel - 1,
		send,
	}, nil
}

func (synthesizer Generic) SelectSound(bank, sound uint8) {
	for _, message := range midi.ResetChannel(uint8(synthesizer.channel), bank-1, sound-1) {
		synthesizer.send(message)
	}
}

func (synthesizer Generic) SetController(controller, value uint8) {
	message := midi.ControlChange(uint8(synthesizer.channel), controller, value)
	synthesizer.send(message)
}

func (synthesizer Generic) PlayNote(note midi.Note, velocity uint8) {
	message := midi.NoteOn(uint8(synthesizer.channel), note.Value(), velocity)
	synthesizer.send(message)
}

func (synthesizer Generic) StopNote(note midi.Note) {
	message := midi.NoteOff(uint8(synthesizer.channel), note.Value())
	synthesizer.send(message)
}

func (synthesizer Generic) StopAllNotes() {
	for _, message := range midi.SilenceChannel(synthesizer.channel) {
		synthesizer.send(message)
	}
}
