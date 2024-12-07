export function ADD( a, b ) {
    return a + b;
};
ADD.operation = "add";
ADD.symbol = '+';

export function MULTIPLY( a, b ) {
    return a * b;
};
MULTIPLY.operation = "multiply";
MULTIPLY.symbol = '*';

export function CONCAT( a, b ) {
    return parseInt(`${a}${b}`);
};
CONCAT.operation = "concatenate";
CONCAT.symbol = '||';