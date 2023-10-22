package demo

import (
	"github.com/thenativeweb/aira/arrangement"
	"github.com/thenativeweb/aira/synthesizer"
)

type SnareDrum struct {
	A arrangement.Pattern
	B arrangement.Pattern
	C arrangement.Pattern
}

func GetSnareDrum(tr8 synthesizer.TR8) SnareDrum {
	__ := arrangement.NewStep([]arrangement.NoteStep{}, []arrangement.ControllerStep{})

	XX := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(tr8.SnareDrum(), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	xx := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(tr8.SnareDrum(), 80, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)

	return SnareDrum{
		A: arrangement.NewPattern([]arrangement.Step{
			__, __, __, __, XX, __, __, __, __, __, __, __, XX, __, __, xx,
		}),
		B: arrangement.NewPattern([]arrangement.Step{
			__, __, __, __, XX, __, __, __, __, xx, xx, xx, XX, __, XX, XX,
		}),
		C: arrangement.NewPattern([]arrangement.Step{
			XX, __, __, __, __, __, XX, __, XX, __, XX, __, XX, __, XX, __,
			XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX, XX,
		}),
	}
}
