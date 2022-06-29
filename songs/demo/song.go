package demo

import (
	"time"

	"github.com/thenativeweb/aira/arrangement"
	"github.com/thenativeweb/aira/synthesizer"
)

func GetSong(tr8 synthesizer.TR8, tb3 synthesizer.TB3, system1 synthesizer.Generic) arrangement.Song {
	__ := arrangement.NewPattern([]arrangement.Step{})

	bd := GetBassDrum(tr8)
	sd := GetSnareDrum(tr8)

	return arrangement.NewSong(
		arrangement.NewCover("Demo Song"),
		arrangement.NewScore(
			137.0,
			arrangement.NewSignature(4, 4),
			func() time.Duration {
				tr8.SelectSound(1, tr8.TR909())
				tb3.SelectSound(1, 2)
				tb3.SetController(tb3.Cutoff(), 64)
				tb3.SetController(tb3.Resonance(), 64)
				system1.SelectSound(1, 4)
				return time.Millisecond * 500
			},
			[]arrangement.Track{
				arrangement.NewTrack("Bassdrum", tr8, false),
				arrangement.NewTrack("Snaredrum", tr8, false),
				// arrangement.NewTrack("Hi-Hat", tr8, false),
				// arrangement.NewTrack("Crash Cymbal", tr8, false),
				// arrangement.NewTrack("Bassline", tb3, false),
				// arrangement.NewTrack("Chords", system1, false),
			},
			[]arrangement.Bar{
				// Introduction
				arrangement.NewBar([]arrangement.Pattern{bd.A, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.B, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.A, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.B, sd.C}),

				// Build-up
				arrangement.NewBar([]arrangement.Pattern{bd.A, sd.A}),
				arrangement.NewBar([]arrangement.Pattern{bd.B, sd.B}),
				arrangement.NewBar([]arrangement.Pattern{bd.A, sd.A}),
				arrangement.NewBar([]arrangement.Pattern{bd.B, sd.C}),
				arrangement.NewBar([]arrangement.Pattern{bd.C, __}),
			},
		),
	)
}
