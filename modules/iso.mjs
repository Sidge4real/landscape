import fs from 'fs';
import csv from 'csv-parser';

/**
 * 
 * @param {string[]} countryCodes 
 * @param {string} code 
 * @returns {string}
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
function getCountryNameByCode(countryCodes, code) {
  return countryCodes[code] || 'N/A';
}

/**
 * 
 * @param {string[]} countryCodes 
 * @param {string} name 
 * @returns {string}
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
function getCountryCodeByName(countryCodes, name) {
  const lowercaseName = name.toLowerCase();
  for (const code in countryCodes) {
    if (countryCodes[code].toLowerCase() === lowercaseName) {
      return code;
    }
  }
  return "N/A";
}

/**
 * Retrieves information about a country based on the country name or country code (ISO).
 *
 *
 * @param {string} country
 * @returns {Promise<string>}
 *
 * @example
 * const countryInfo = await getCountryInfo("Netherlands"); // returns "NL"
 * const countryInfo2 = await getCountryInfo("doesNotExist"); // returns "N/A"
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
const getCountryInfo = (country) => {
    return new Promise((resolve, reject) => {
    const countryCodes = {};
    let search = country.trim();
    let country_code = null;
    let country_name = null;

    if (search.length === 2 || search.length === 3) {
      country_code = search.toUpperCase();
    } else {
      country_name = search.toLowerCase();
    }

    fs.createReadStream('data/countryCodes.csv')
      .pipe(csv())
      .on('data', (row) => {
        countryCodes[row.Code] = row.Name;
      })
      .on('end', () => {
        if (country_code) {
          resolve(getCountryNameByCode(countryCodes, country_code));
        } else if (country_name) {
          resolve(getCountryCodeByName(countryCodes, country_name));
        } else {
          reject(new Error("Input is not a country code or name"));
        }
      });
  });
}

export default getCountryInfo