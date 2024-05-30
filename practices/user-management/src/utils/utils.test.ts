import { cls } from './cls';
import { convertDateValue } from './common';

describe('Test cls helper', () => {
  test('Should remove all whitespace', () => {
    const stringTest = 'Redundant     space';
    const result = cls(stringTest);
    expect(result).toEqual('Redundant space');
  });
});

describe('Test getDateValue helper', () => {
  test('Should convert to ISOString format', () => {
    const testValue = '2023-12-13';
    const result = convertDateValue(testValue);
    expect(result).toEqual('2023-12-13T00:00:00.000Z');
  });
});
