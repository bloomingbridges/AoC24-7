import { ADD, MULTIPLY } from "./operators.js";

export const TITLE = "// Advent of Code 2024 - Day 7: Bridge Repair //////////////////////////////////";
export const EXAMPLE = `190: 10 19
                        3267: 81 40 27
                        83: 17 5
                        156: 15 6
                        7290: 6 8 6 15
                        161011: 16 10 13
                        192: 17 8 14
                        21037: 9 7 18 13
                        292: 11 6 16 20`;
export const OPERATORS = [ADD, MULTIPLY];

export function calibrate( input ) {
  const ROWS = input.split("\n");
  var total = 0;

  console.log(`${"/".repeat(80)}`);
  console.log(`// NEW CALIBRATION USING OPERATORS: ${OPERATORS.map(( OP ) => OP.name).join(', ')}`);

  for (const ROW of ROWS) {
    const TRIMMED_ROW = ROW.trimStart();
    const COLON_INDEX = TRIMMED_ROW.indexOf(':');
    if (COLON_INDEX < 0) continue;
    const TEST_VALUE = parseInt(TRIMMED_ROW.substring(0, COLON_INDEX));
    const OPERANDS = TRIMMED_ROW.substring(COLON_INDEX + 2)
                                .split(' ')
                                .map(( operand ) => parseInt(operand));
    const SOLVABLE = solve(TEST_VALUE, OPERANDS);
    if (SOLVABLE) total += TEST_VALUE
  }
  console.log(`${"/".repeat(80)}\n// TOTAL CALIBRATION RESULT: ${total}`);
}

export function solve( test_value, operands ) {
  // console.log("\n// SOLVING..", test_value, operands);
  const SLOTS = operands.length - 1;
  // console.log(`// FILLING ${SLOTS} AVAILABLE SLOT(S)`);
  const EVALUATED_COMBOS = [];
  const COMBOS = [];
  iterate(COMBOS, new Array(SLOTS).fill(0));
  COMBOS.forEach(( combo ) => {
    EVALUATED_COMBOS.push(evaluate(test_value, operands, combo.map(( index ) => OPERATORS[index])));
  });
  return EVALUATED_COMBOS.includes(true);
}

function evaluate( test_value, operands, operators ) {
  // console.log("// GIVEN OPERATORS:", operators.map(( op ) => op.operation));
  let result = 0;
  const EQUATION = [];
  for ( let op = 0; op < operators.length; op++ ) {
    const OP = operators[op];
    const OPERAND_A = (op > 0) ? result : operands[0];
    const OPERAND_B = operands[op+1];
    result = OP(OPERAND_A, OPERAND_B);
    // Accumulate an equation string for debugging /////////////////////////////
    EQUATION.push(operands[op]);
    EQUATION.push(OP.symbol);
    if (op == operators.length - 1)
      EQUATION.push(operands[op+1]);
  }
  // console.log(`${test_value}: ${result}`);
  if (result === test_value) {
    console.log(`🟢 WORKING SOLUTION: ${test_value} == ${EQUATION.join(' ')}`);
    return true;
  } else {
    // console.log(`🔴 INCORRECT SOLUTION: ${test_value} != ${EQUATION.join(' ')} [${result}]`);
    return false;
  }
}

function iterate( accumulator, combo, index = 0 ) {
  if (index < combo.length) {
    for (let i = 0; i < OPERATORS.length; i++) {
      combo[index] = i;
      iterate(accumulator, combo, index + 1);
    }
  } else {
    accumulator.push(Array.from(combo));
    // console.log(combo);
  }
}

if (import.meta.main) {
  console.log(TITLE);
  const INPUT = Deno.readTextFileSync("./input.txt");
  calibrate(INPUT);
}
