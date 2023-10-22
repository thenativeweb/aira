package arrangement

import (
	"math"
	"time"

	"github.com/thenativeweb/aira/synthesizer"
	"gitlab.com/gomidi/midi/v2"
)

type Cover struct {
	Title string
}

func NewCover(title string) Cover {
	return Cover{title}
}

type Signature struct {
	Numerator   int
	Denominator int
}

func NewSignature(numerator, denominator int) Signature {
	return Signature{numerator, denominator}
}

type Track struct {
	Name        string
	Synthesizer synthesizer.Synthesizer
	Mute        bool
}

func NewTrack(name string, synthesizer synthesizer.Synthesizer, mute bool) Track {
	return Track{name, synthesizer, mute}
}

type Duration struct {
	Numerator   int
	Denominator int
	IsDotted    bool
	IsTriplet   bool
}

func NewDuration(numerator, denominator int, isDotted, isTriplet bool) Duration {
	if isDotted && isTriplet {
		panic("dotted and triplet must not both be set at the same time")
	}

	return Duration{numerator, denominator, isDotted, isTriplet}
}

func (duration Duration) Value(bpm float64, signature Signature, factor float64) time.Duration {
	durationNumerator := float64(duration.Numerator)
	durationDemoninator := float64(duration.Denominator)
	signatureNumerator := float64(signature.Numerator)
	minute := float64(time.Minute.Milliseconds())

	milliseconds :=
		durationNumerator / durationDemoninator * signatureNumerator *
			(minute / bpm)

	if duration.IsDotted {
		milliseconds *= 1.5
	}
	if duration.IsTriplet {
		milliseconds *= (2.0 / 3)
	}

	milliseconds *= factor

	return time.Millisecond * time.Duration(math.Floor(milliseconds))
}

type NoteStep struct {
	Note     midi.Note
	Velocity uint8
	Duration Duration
}

func NewNoteStep(note midi.Note, velocity uint8, duration Duration) NoteStep {
	return NoteStep{note, velocity, duration}
}

type ControllerStep struct {
	Controller uint8
	Value      uint8
}

func NewControllerStep(controller uint8, value uint8) ControllerStep {
	return ControllerStep{controller, value}
}

type Step struct {
	Notes       []NoteStep
	Controllers []ControllerStep
}

func NewStep(notes []NoteStep, controllers []ControllerStep) Step {
	return Step{notes, controllers}
}

type Pattern struct {
	Steps []Step
}

func NewPattern(steps []Step) Pattern {
	return Pattern{steps}
}

type Bar struct {
	Patterns []Pattern
}

func NewBar(patterns []Pattern) Bar {
	return Bar{patterns}
}

type Initialize func() time.Duration

type Score struct {
	BPM        float64
	Signature  Signature
	Initialize Initialize
	Tracks     []Track
	Bars       []Bar
}

func NewScore(bpm float64, signature Signature, initialize Initialize, tracks []Track, bars []Bar) Score {
	return Score{bpm, signature, initialize, tracks, bars}
}

type Song struct {
	Cover Cover
	Score Score
}

func NewSong(cover Cover, score Score) Song {
	return Song{cover, score}
}
