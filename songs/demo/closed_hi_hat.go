package demo

import (
	"github.com/thenativeweb/aira/arrangement"
	"github.com/thenativeweb/aira/synthesizer"
)

type ClosedHiHat struct {
	A arrangement.Pattern
}

func GetClosedHiHat(tr8 synthesizer.TR8) ClosedHiHat {
	__ := arrangement.NewStep([]arrangement.NoteStep{}, []arrangement.ControllerStep{})

	XX := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(tr8.ClosedHiHat(), 127, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)
	xx := arrangement.NewStep(
		[]arrangement.NoteStep{arrangement.NewNoteStep(tr8.ClosedHiHat(), 40, arrangement.NewDuration(1, 16, false, false))},
		[]arrangement.ControllerStep{},
	)

	return ClosedHiHat{
		A: arrangement.NewPattern([]arrangement.Step{
			__, xx, XX, xx, __, xx, XX, xx, __, xx, XX, xx, __, xx, XX, xx,
		}),
	}
}
