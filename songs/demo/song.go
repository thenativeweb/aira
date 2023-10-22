package demo

import (
	"time"

	"github.com/thenativeweb/aira/arrangement"
	"github.com/thenativeweb/aira/synthesizer"
)

func GetSong(tr8 synthesizer.TR8, tb3 synthesizer.TB3, system1 synthesizer.Synthesizer) arrangement.Song {
	__ := arrangement.NewPattern([]arrangement.Step{})

	bd := GetBassDrum(tr8)
	sd := GetSnareDrum(tr8)
	ch := GetClosedHiHat(tr8)
	cc := GetCrashCymbal(tr8)
	bs := GetBassLine(tb3)

	return arrangement.NewSong(
		arrangement.NewCover("Demo Song"),
		arrangement.NewScore(
			137.0,
			arrangement.NewSignature(4, 4),
			func() time.Duration {
				tr8.SelectSound(1, 2)
				tb3.SelectSound(1, 2)
				tb3.SetController(tb3.Cutoff(), 64)
				tb3.SetController(tb3.Resonance(), 64)
				system1.SelectSound(1, 4)
				return time.Millisecond * 500
			},
			[]arrangement.Track{
				arrangement.NewTrack("Bassdrum", tr8, false),
				arrangement.NewTrack("Snaredrum", tr8, false),
				arrangement.NewTrack("Closed Hi-Hat", tr8, false),
				arrangement.NewTrack("Crash Cymbal", tr8, false),
				arrangement.NewTrack("Bassline", tb3, false),
				arrangement.NewTrack("Chords", system1, false),
			},
			[]arrangement.Bar{
				// Intro
				arrangement.NewBar([]arrangement.Pattern{bd.A, __, ch.A, __, bs.A, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.B, __, ch.A, __, bs.A, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.A, __, ch.A, __, bs.A, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.B, sd.C, ch.A, __, bs.A, __}),

				// Build-up
				arrangement.NewBar([]arrangement.Pattern{bd.A, sd.A, ch.A, cc.A, bs.A, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.B, sd.B, ch.A, __, bs.B, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.A, sd.A, ch.A, __, bs.C, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.B, sd.C, ch.A, __, bs.D, __}),
				arrangement.NewBar([]arrangement.Pattern{bd.C, __, __, cc.A, __, __}),
			},
		),
	)
}
