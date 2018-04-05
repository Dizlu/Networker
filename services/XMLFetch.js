// @flow
/**
 * Fetches data from provided link to RSS
 * @returns {Promise<string>}
 * @constructor
 * @param link
 */
export default async (link: string) => {
  const result = await fetch(link);

  return result.text();
};
