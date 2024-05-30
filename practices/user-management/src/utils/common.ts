/**
 * Convert value from input date to correct format dates
 * @param {string} value
 * @returns {string}
 */
export const convertDateValue = (value: string) => {
  return new Date(value).toISOString();
};

/**
 * Generate random image if imgSrc is not available
 * @param {string} name
 * @param {string} imgSrc
 * @returns {string}
 */
export const getImageUrl = (name: string, imgSrc?: string) => {
  if (imgSrc) {
    return imgSrc;
  }

  return `https://ui-avatars.com/api/?name=${name}&rounded=true&background=random&size=28`;
};

/**
 * Get total pages
 * @param {number} dataLength
 * @param {number} limitData
 * @returns
 */
export const getTotalPages = (dataLength: number, limitData: number) => {
  const totalPages = Math.ceil(dataLength / limitData);
  return totalPages;
};
