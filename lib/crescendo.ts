const crescendo = function <TStep> (steps: TStep[]): TStep[] {
  const increasePerStep = Math.floor(127 / steps.length);

  return steps.map((step, index): TStep => ({
    ...step,
    velocity: increasePerStep * (index + 1)
  }));
};

export { crescendo };
