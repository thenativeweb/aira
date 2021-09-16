import { MidiChannel } from './MidiChannel';

interface MidiConnection {
  port: string;
  channel: MidiChannel;
}

export { MidiConnection };
