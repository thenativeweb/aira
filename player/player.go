package player

import (
	"context"
	"time"

	"github.com/thenativeweb/aira/arrangement"
)

const ppqn = 24

func Play(song arrangement.Song, context context.Context) {
	for _, track := range song.Score.Tracks {
		track.Synthesizer.StopAllNotes()
	}

	time.Sleep(song.Score.Initialize())

	metronome := makeMetronome(song.Score.BPM, ppqn)
	position := NewPosition()

	for {
		select {
		case <-context.Done():
			metronome.Stop()
			for _, track := range song.Score.Tracks {
				track.Synthesizer.StopAllNotes()
			}
			return
		case <-metronome.C:
			if position.Bar > len(song.Score.Bars) {
				return
			}

			for index, track := range song.Score.Tracks {
				if track.Mute {
					continue
				}

				bar := song.Score.Bars[position.Bar-1]
				pattern := bar.Patterns[index]

				if len(pattern.Steps) == 0 {
					continue
				}

				patternIndex, ok := getPatternIndex(position, pattern, song)
				if !ok {
					continue
				}

				step := pattern.Steps[patternIndex]

				for _, controllerStep := range step.Controllers {
					track.Synthesizer.SetController(
						controllerStep.Controller,
						controllerStep.Value)
				}

				for _, noteStep := range step.Notes {
					go func(track arrangement.Track, noteStep arrangement.NoteStep) {
						track.Synthesizer.PlayNote(
							noteStep.Note,
							noteStep.Velocity)

						duration := noteStep.Duration.Milliseconds(song, 0.9)
						time.Sleep(duration)

						track.Synthesizer.StopNote(noteStep.Note)
					}(track, noteStep)
				}
			}

			position = position.Proceed(song.Score.Signature)
		}
	}
}

func getPatternIndex(position Position, pattern arrangement.Pattern, song arrangement.Song) (int, bool) {
	index := (position.Beat-1)*ppqn + (position.Pulse - 1)
	factor := song.Score.Signature.Numerator * ppqn / len(pattern.Steps)

	if index%factor != 0 {
		return 0, false
	}

	patternIndex := index / factor
	return patternIndex, true
}
