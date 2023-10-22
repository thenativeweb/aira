package demo

import (
	"github.com/thenativeweb/aira/arrangement"
	"github.com/thenativeweb/aira/synthesizer"
	"gitlab.com/gomidi/midi/v2"
)

type BassLine struct {
	A arrangement.Pattern
	B arrangement.Pattern
	C arrangement.Pattern
	D arrangement.Pattern
}

func GetBassLine(tb3 synthesizer.TB3) BassLine {
	__ := arrangement.NewStep([]arrangement.NoteStep{}, []arrangement.ControllerStep{})

	A2 := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(midi.Note(midi.A(2)), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	A3 := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(midi.Note(midi.A(3)), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	H2 := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(midi.Note(midi.B(2)), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	H3 := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(midi.Note(midi.B(3)), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	C3 := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(midi.Note(midi.C(3)), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	C4 := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(midi.Note(midi.C(4)), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	D3 := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(midi.Note(midi.D(3)), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	D4 := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(midi.Note(midi.D(4)), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)

	return BassLine{
		A: arrangement.NewPattern([]arrangement.Step{
			__, A2, A3, A2, __, A3, A2, A3, __, A2, A3, A2, __, A3, A2, A3,
		}),
		B: arrangement.NewPattern([]arrangement.Step{
			__, H2, H3, H2, __, H3, H2, H3, __, H2, H3, H2, __, H3, H2, H3,
		}),
		C: arrangement.NewPattern([]arrangement.Step{
			__, C3, C4, C3, __, C4, C3, C4, __, C3, C4, C3, __, C4, C3, C4,
		}),
		D: arrangement.NewPattern([]arrangement.Step{
			__, D3, D4, D3, __, D4, D3, D4, __, D3, D4, D3, __, D4, D3, D4,
		}),
	}
}
