export const isValidNumberChar = (char) => !isUndefined(char) && !isNull(char) && char.match(/^\d+$/);

export const isUndefined = (value) => typeof value === 'undefined';

export const isNull = (value) => value === null;