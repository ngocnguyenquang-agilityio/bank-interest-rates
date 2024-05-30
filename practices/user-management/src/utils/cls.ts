/**
 * Remove white space of a string
 * @param {string} input
 * @returns {string}
 */
export const cls = (input: string) =>
  input
    .replace(/\s+/gm, ' ')
    .split(' ')
    .filter((cond) => typeof cond === 'string')
    .join(' ')
    .trim();
