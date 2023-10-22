package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/thenativeweb/aira/player"
	"github.com/thenativeweb/aira/songs/demo"
	"github.com/thenativeweb/aira/synthesizer"
	"gitlab.com/gomidi/midi/v2"
	_ "gitlab.com/gomidi/midi/v2/drivers/rtmididrv"
)

func main() {
	defer midi.CloseDriver()

	tr8, err := synthesizer.NewTR8(synthesizer.NewGeneric("MX-1 USB1", 10))
	if err != nil {
		panic(err)
	}

	tb3, err := synthesizer.NewTB3(synthesizer.NewGeneric("MX-1 USB3", 2))
	if err != nil {
		panic(err)
	}

	system1, err := synthesizer.NewGeneric("MX-1 USB2", 1)
	if err != nil {
		panic(err)
	}

	context, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGINT)
	defer stop()

	demoSong := demo.GetSong(tr8, tb3, system1)
	player.Play(demoSong, context)
}
