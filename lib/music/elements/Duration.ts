type Numerator = number;
type Denominator = number;
type Modifier = '' | 'D' | 'T';

type Duration = `${Numerator}/${Denominator}${Modifier}`;

export { Duration };
