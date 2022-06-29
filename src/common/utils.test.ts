import { pluralize } from './utils';
import { mockFetch } from '../test/testUtils';

describe('utils', () => {
  it('pluralizes', () => {
    expect(pluralize(1, 'vote')).toBe('vote');
    expect(pluralize(2, 'vote')).toBe('votes');
    expect(pluralize(1, 'country')).toBe('country');
    expect(pluralize(3, 'country', 'countries')).toBe('countries');
  });
});

describe('useFetch', () => {
  it('supports null response', () => {
    global.fetch = mockFetch<null>(null);
  });
});
