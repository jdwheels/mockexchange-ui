import { pluralize } from './utils';
import { mockFetch } from '../test/testUtils';

describe('utils', () => {
  it('pluralizes', () => {
    expect(pluralize(1, 'vote')).toBe('1 vote');
    expect(pluralize(2, 'vote')).toBe('2 votes');
    expect(pluralize(1, 'country')).toBe('1 country');
    expect(pluralize(3, 'country', 'countries')).toBe('3 countries');
  });
});

describe('useFetch', () => {
  it('supports null response', () => {
    global.fetch = mockFetch<null>(null);
  });
});
