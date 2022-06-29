package player

import (
	"math"
	"time"
)

func makeMetronome(bpm float64, ppqn uint8) *time.Ticker {
	millisecondsPerPulse := math.Floor(
		float64(time.Minute) / bpm / float64(ppqn))

	metronome := time.NewTicker(time.Duration(millisecondsPerPulse))

	return metronome
}
