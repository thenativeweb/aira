package demo

import (
	"github.com/thenativeweb/aira/arrangement"
	"github.com/thenativeweb/aira/synthesizer"
)

type CrashCymbal struct {
	A arrangement.Pattern
}

func GetCrashCymbal(tr8 synthesizer.TR8) CrashCymbal {
	__ := arrangement.NewStep([]arrangement.NoteStep{}, []arrangement.ControllerStep{})

	XX := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(tr8.CrashCymbal(), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)

	return CrashCymbal{
		A: arrangement.NewPattern([]arrangement.Step{
			XX, __, __, __, __, __, __, __, __, __, __, __, __, __, __, __,
		}),
	}
}
