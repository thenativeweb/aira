package synthesizer

type TB3 struct {
	Generic
}

func NewTB3(synthesizer Generic, err error) (TB3, error) {
	return TB3{synthesizer}, err
}

func (tb3 TB3) Cutoff() uint8 {
	return 74
}

func (tb3 TB3) Resonance() uint8 {
	return 71
}
