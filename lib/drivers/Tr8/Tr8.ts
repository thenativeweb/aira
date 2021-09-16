import { Configuration } from './Configuration';
import { Drumset } from './Drumset';
import { drumsets } from './drumsets';
import { Instrument } from '../Instrument';
import { MidiConnection } from '../../types/MidiConnection';
import { MidiValue } from '../../types/MidiValue';
import { Note } from '../../types/Note';
import { Octave } from '../../types/Octave';

class Tr8 extends Instrument {
  public constructor ({ connection, configuration }: {
    connection: MidiConnection;
    configuration?: Partial<Configuration>;
  }) {
    super({ connection });

    if (configuration?.drumset) {
      this.selectDrumset({ drumset: configuration.drumset });
    }

    if (configuration?.bassDrum?.tune) {
      this.setBassDrumTune({ value: configuration.bassDrum.tune });
    }
    if (configuration?.bassDrum?.attack) {
      this.setBassDrumAttack({ value: configuration.bassDrum.attack });
    }
    if (configuration?.bassDrum?.decay) {
      this.setBassDrumDecay({ value: configuration.bassDrum.decay });
    }
    if (configuration?.bassDrum?.compressor) {
      this.setBassDrumCompressor({ value: configuration.bassDrum.compressor });
    }

    if (configuration?.snareDrum?.tune) {
      this.setSnareDrumTune({ value: configuration.snareDrum.tune });
    }
    if (configuration?.snareDrum?.snappiness) {
      this.setSnareDrumSnappiness({ value: configuration.snareDrum.snappiness });
    }
    if (configuration?.snareDrum?.decay) {
      this.setSnareDrumDecay({ value: configuration.snareDrum.decay });
    }
    if (configuration?.snareDrum?.compressor) {
      this.setSnareDrumCompressor({ value: configuration.snareDrum.compressor });
    }

    if (configuration?.lowTom?.tune) {
      this.setLowTomTune({ value: configuration.lowTom.tune });
    }
    if (configuration?.lowTom?.decay) {
      this.setLowTomDecay({ value: configuration.lowTom.decay });
    }

    if (configuration?.midTom?.tune) {
      this.setMidTomTune({ value: configuration.midTom.tune });
    }
    if (configuration?.midTom?.decay) {
      this.setMidTomDecay({ value: configuration.midTom.decay });
    }

    if (configuration?.highTom?.tune) {
      this.setHighTomTune({ value: configuration.highTom.tune });
    }
    if (configuration?.highTom?.decay) {
      this.setHighTomDecay({ value: configuration.highTom.decay });
    }

    if (configuration?.rimShot?.tune) {
      this.setRimShotTune({ value: configuration.rimShot.tune });
    }
    if (configuration?.rimShot?.decay) {
      this.setRimShotDecay({ value: configuration.rimShot.decay });
    }

    if (configuration?.handClap?.tune) {
      this.setHandClapTune({ value: configuration.handClap.tune });
    }
    if (configuration?.handClap?.decay) {
      this.setHandClapDecay({ value: configuration.handClap.decay });
    }

    if (configuration?.closedHihat?.tune) {
      this.setClosedHihatTune({ value: configuration.closedHihat.tune });
    }
    if (configuration?.closedHihat?.decay) {
      this.setClosedHihatDecay({ value: configuration.closedHihat.decay });
    }

    if (configuration?.openHihat?.tune) {
      this.setOpenHihatTune({ value: configuration.openHihat.tune });
    }
    if (configuration?.openHihat?.decay) {
      this.setOpenHihatDecay({ value: configuration.openHihat.decay });
    }

    if (configuration?.crashCymbal?.tune) {
      this.setCrashCymbalTune({ value: configuration.crashCymbal.tune });
    }
    if (configuration?.crashCymbal?.decay) {
      this.setCrashCymbalDecay({ value: configuration.crashCymbal.decay });
    }

    if (configuration?.rideCymbal?.tune) {
      this.setRideCymbalTune({ value: configuration.rideCymbal.tune });
    }
    if (configuration?.rideCymbal?.decay) {
      this.setRideCymbalDecay({ value: configuration.rideCymbal.decay });
    }
  }

  public selectDrumset ({ drumset }: {
    drumset: Drumset;
  }): void {
    this.selectSound({ value: drumsets[drumset] });
  }

  public static bassDrum (): { note: Note; octave: Octave } {
    return { note: 'c', octave: 2 };
  }

  public setBassDrumTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 20, value });
  }

  public setBassDrumAttack ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 21, value });
  }

  public setBassDrumDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 23, value });
  }

  public setBassDrumCompressor ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 22, value });
  }

  public static snareDrum (): { note: Note; octave: Octave } {
    return { note: 'd', octave: 2 };
  }

  public setSnareDrumTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 25, value });
  }

  public setSnareDrumSnappiness ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 26, value });
  }

  public setSnareDrumDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 28, value });
  }

  public setSnareDrumCompressor ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 27, value });
  }

  public static lowTom (): { note: Note; octave: Octave } {
    return { note: 'g', octave: 2 };
  }

  public setLowTomTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 46, value });
  }

  public setLowTomDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 47, value });
  }

  public static midTom (): { note: Note; octave: Octave } {
    return { note: 'b', octave: 2 };
  }

  public setMidTomTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 49, value });
  }

  public setMidTomDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 50, value });
  }

  public static highTom (): { note: Note; octave: Octave } {
    return { note: 'd', octave: 3 };
  }

  public setHighTomTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 52, value });
  }

  public setHighTomDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 53, value });
  }

  public static rimShot (): { note: Note; octave: Octave } {
    return { note: 'c#', octave: 2 };
  }

  public setRimShotTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 55, value });
  }

  public setRimShotDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 56, value });
  }

  public static handClap (): { note: Note; octave: Octave } {
    return { note: 'd#', octave: 2 };
  }

  public setHandClapTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 58, value });
  }

  public setHandClapDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 59, value });
  }

  public static closedHihat (): { note: Note; octave: Octave } {
    return { note: 'f#', octave: 2 };
  }

  public setClosedHihatTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 61, value });
  }

  public setClosedHihatDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 62, value });
  }

  public static openHihat (): { note: Note; octave: Octave } {
    return { note: 'a#', octave: 2 };
  }

  public setOpenHihatTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 80, value });
  }

  public setOpenHihatDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 81, value });
  }

  public static crashCymbal (): { note: Note; octave: Octave } {
    return { note: 'c#', octave: 3 };
  }

  public setCrashCymbalTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 83, value });
  }

  public setCrashCymbalDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 84, value });
  }

  public static rideCymbal (): { note: Note; octave: Octave } {
    return { note: 'd#', octave: 3 };
  }

  public setRideCymbalTune ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 89, value });
  }

  public setRideCymbalDecay ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 87, value });
  }
}

export { Tr8 };
