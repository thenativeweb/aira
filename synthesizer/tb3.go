package synthesizer

type TB3 struct {
	Synthesizer
}

func NewTB3(synthesizer Generic, err error) (TB3, error) {
	if err != nil {
		return TB3{}, err
	}

	return TB3{synthesizer}, nil
}

func (tb3 TB3) Cutoff() uint8 {
	return 74
}

func (tb3 TB3) Resonance() uint8 {
	return 71
}
