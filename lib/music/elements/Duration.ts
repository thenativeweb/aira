type Numerator = number;
type Denominator = number;
type Modifier = '' | '.' | 't';

type Duration = `${Numerator}/${Denominator}${Modifier}`;

export {
    Duration
};