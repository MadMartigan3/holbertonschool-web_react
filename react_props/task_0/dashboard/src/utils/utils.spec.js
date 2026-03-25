import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('getCurrentYear', () => {
  test('returns the current year', () => {
    const expectedYear = new Date().getFullYear();
    expect(getCurrentYear()).toBe(expectedYear);
  });
});

describe('getFooterCopy', () => {
  test('returns "Holberton School" when argument is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('returns "Holberton School main dashboard" when argument is false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });
});

describe('getLatestNotification', () => {
  test('returns the correct notification string', () => {
    expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});