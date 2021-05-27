# aira

aira runs loops on Roland AIRA series synthesizers.

## Status

| Category         | Status                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Version          | [![npm](https://img.shields.io/npm/v/aira)](https://www.npmjs.com/package/aira)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/aira)                                                                                   |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/aira)                                                                               |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/aira/workflows/Release/badge.svg?branch=main) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/aira)                                                                         |

## Installation

```shell
$ npm install aira
```

## Quick Start

First you need to add a reference to `aira` to your application:

```javascript
const { getNoteLengths, Note, Tb3, Tr8, System8 } = require('aira');
```

If you use TypeScript, use the following code instead:

```typescript
import { getNoteLengths, Note, Tb3, Tr8, System8 } from 'aira';
```

For information on how to use these types, please refer to the demo mentioned below. Detailed documentation will be added once the API is a little bit more stable.

### Running the demo

In the `./lib/bin/app.ts` file you can see a demo of how to use this module. From the root level you can run it using:

```shell
$ npx ts-node lib/bin/app.ts
```

Please note that the demo expects the following set up:

- Roland MX-1 as MIDI interface
- Roland TR-8 connected to USB 1, using channel 10
- Roland TB-3 connected to USB 2, using channel 2
- Roland System 8 connected to USB 4, using channel 1

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
