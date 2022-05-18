type Numerator = number;
type Denominator = 2 | 4 | 8 | 16 | 32 | 64 | 128;
type Modifier = '' | 'D' | 'T';

type Duration = `${Numerator}/${Denominator}${Modifier}`;

export { Duration };
