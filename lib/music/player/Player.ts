interface Player {
  play: () => Promise<void>;
  stop: () => Promise<void>;
}

export { Player };
