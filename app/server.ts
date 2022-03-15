import { flaschenpost } from 'flaschenpost';
import http from 'http';
import { getSynthesizersApi, LocalSynthesizer } from '../lib/aira';

const logger = flaschenpost.getLogger();

const api = getSynthesizersApi({
  synthesizers: {
    tr8: new LocalSynthesizer({ connection: { port: 'MX-1 USB1', channel: 10 }}),
    tb3: new LocalSynthesizer({ connection: { port: 'MX-1 USB3', channel: 2 }})
  }
});

const server = http.createServer(api);
const port = 3_000;

server.listen(port, (): void => {
  logger.info('Server running.', { port });
});
