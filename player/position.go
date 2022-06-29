package player

import "github.com/thenativeweb/aira/arrangement"

type Position struct {
	Bar   int
	Beat  int
	Pulse int
}

func NewPosition() Position {
	return Position{1, 1, 1}
}

func (position Position) Proceed(signature arrangement.Signature) Position {
	position.Pulse++
	if position.Pulse > ppqn {
		position.Pulse = 1
		position.Beat++
	}
	if position.Beat > signature.Numerator {
		position.Pulse = 1
		position.Beat = 1
		position.Bar++
	}
	return position
}
