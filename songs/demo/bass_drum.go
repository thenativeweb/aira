package demo

import (
	"github.com/thenativeweb/aira/arrangement"
	"github.com/thenativeweb/aira/synthesizer"
)

type BassDrum struct {
	A arrangement.Pattern
	B arrangement.Pattern
	C arrangement.Pattern
}

func GetBassDrum(tr8 synthesizer.TR8) BassDrum {
	__ := arrangement.NewStep(
		[]arrangement.NoteStep{},
		[]arrangement.ControllerStep{},
	)

	XX := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(tr8.BassDrum(), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)

	xx := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(tr8.BassDrum(), 80, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)

	return BassDrum{
		A: arrangement.NewPattern([]arrangement.Step{
			XX, __, __, __, XX, __, __, __, XX, __, __, __, XX, __, __, __,
		}),
		B: arrangement.NewPattern([]arrangement.Step{
			XX, __, __, __, XX, __, __, __, XX, __, __, __, XX, __, xx, __,
		}),
		C: arrangement.NewPattern([]arrangement.Step{
			XX, __, __, __, __, __, __, __, __, __, __, __, __, __, __, __,
		}),
	}
}
