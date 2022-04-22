import { add } from './sandbox';

interface SandboxTest {
  a: number;
  b: number;
  expected: number;
}

const testCases: SandboxTest[] = [
  { a: 2, b: 2, expected: 4 },
];

describe('Sandbox tests', () => {
  testCases.forEach(({ a, b, expected }, i) => {
    test(`test case ${i + 1}`, () => {
      expect(add(a, b)).toBe(expected);
    });
  });
});
