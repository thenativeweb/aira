import { Connections } from './Connections';
import { System8, Tb3, Tr8 } from '../../aira';

const getInstruments = function ({ connections }: {
  connections: Connections;
}): { tr8: Tr8; tb3: Tb3; system8: System8 } {
  const tr8 = new Tr8({
    connection: connections.tr8,
    configuration: {
      drumset: 'TR-909',
      snareDrum: {
        snappiness: 40
      }
    }
  });

  const tb3 = new Tb3({
    connection: connections.tb3,
    configuration: {
      sound: 1,
      cutoff: 64,
      resonance: 64
    }
  });

  const system8 = new System8({
    connection: connections.system8,
    configuration: {
      sound: 4
    }
  });

  return { tr8, tb3, system8 };
};

export { getInstruments };
