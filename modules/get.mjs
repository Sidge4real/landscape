import fs from 'fs';
import { cache_economic, cache_militair } from './caching.mjs';

let rawData = {};

/**
 * @returns {{}}
 */
const rawdata = () => {
    if(Object.keys(rawData).length == 0){
        rawData = fs.readFileSync('data/json/countries.json', 'utf8');
        return JSON.parse(rawData)
    }
    return rawData
}

/**
 * Retrieves landscapes from a specific country
 *
 *
 * @param {string} country
 * @returns {string[] | string}
 *
 * @example
 * const landscapes = landscapes("Netherlands"); // returns ["Flat Land","Canals","Tulip Fields"]
 * const landscapes2 = landscapes("doesNotExist"); // returns "N/A"
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const landscapes = (country) => {
    let data = rawdata();
    if(data.hasOwnProperty(country)){
        return data[country].landscapes
    }
    return "N/A"
}

/**
 * Retrieves capital name from a specific country
 *
 *
 * @param {string} country
 * @returns {string}
 *
 * @example
 * let capital = capital("Germany"); // "Berlin"
 * let capital2 = capital("doesNotExist"); // "N/A"
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const capital = (country) => {
    let data = rawdata();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        return data[country_uppercase].capital_city
    }
    return "N/A"
}

/**
 * Retrieves political situation from a specific country
 *
 *
 * @param {string} country
 * @returns {string}
 *
 * @example
 * let capital = political("Germany"); // "federal parliamentary republic"
 * let capital2 = political("doesNotExist"); // "N/A"
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const political = (country) => {
    let data = rawData();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        return data[country_uppercase].political_status
    }
}

/**
 * Retrieves memberships from a specific country
 *
 *
 * @param {string} country
 * @returns {string[] | string}
 *
 * @example
 * let capital = memberships("Germany"); // ["EU", "NATO"]
 * let capital2 = memberships("doesNotExist"); // "N/A"
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const memberships = (country) => {
    let data = rawData();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        if(data[country_uppercase].memberships.length == 1){
            return `${data[country_uppercase].memberships[0]}`
        }
        return data[country_uppercase].memberships
    }
}

/**
 * Retrieves military info (weak, average or strong) from a specific country
 *
 *
 * @param {string} country
 * @returns {string}
 *
 * @example
 * let capital = memberships("Germany"); // "strong"
 * let capital2 = memberships("doesNotExist"); // "N/A"
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const military = (country) => {
    let data = rawData();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        return data[country_uppercase].military
    }
}

/**
 * Retrieves continent name from a specific country
 *
 *
 * @param {string} country
 * @returns {string}
 *
 * @example
 * let capital = memberships("Germany"); // "europe"
 * let capital2 = memberships("doesNotExist"); // "N/A"
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const continent = (country) => {
    let data = rawData();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        return data[country_uppercase].continent
    }
}

/**
 * Retrieves history information from a specific country
 *
 *
 * @param {string} country
 * @returns {string}
 *
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const historical = (country) => {
    let data = rawData();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        return data[country_uppercase].history_description
    }
}

/**
 * Retrieves the country's using currency.
 * Euro, Dollar, ...
 *
 * @param {string} country
 * @returns {string}
 *
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const currency = (country) => {
    let data = rawData();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        return data[country_uppercase].currency
    }
}

/**
 * Retrieves economic status about a specific country (weak, average or strong)
 *
 * @param {string} country
 * @returns {string}
 *
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const economic = (country) => {
    let data = rawData();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        return data[country_uppercase].economic_status
    }
}

/**
 * Retrieves all official spoken languages of a specific country
 *
 * @param {string} country
 * @returns {string}
 *
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const languages = (country) => {
    let data = rawData();
    let country_uppercase = country.toUpperCase();
    if(data.hasOwnProperty(country_uppercase)){
        return data[country_uppercase].languages
    }
}

/**
 * Retrieves all countries wich belongs in the same category based on their ecenomic or military situation. 
 * They're categorized based on **"strong", "average" and "weak"** speaking as the status parameter.
 * When using the function, the data will be cached for using it later again, this brings a faster response after 2nd same request.
 * Cache will be removed when updating this package, prevents wrong cached data.
 * 
 * based_on parameter can have 2 options:
 * - "E" or "e" as economic situation
 * - "M" or "m" as military situation
 * 
 *
 * @param {string} based_on
 * @param {string} status
 * @returns {string[]}
 *
 * @since v0.0.1 @version v0.0.1
 * @author Sidge
 */
export const getByStatus = (based_on, status) => {
    let data_json = {};
    let filePath = "";
    const based_on_case_insensitive = based_on.toLowerCase();

    const validStatusOptions = ["strong", "average", "weak"];

    if (based_on_case_insensitive === "m" || based_on_case_insensitive === "e") {
        if (!validStatusOptions.includes(status.toLowerCase())) {
            throw new Error(`Invalid input for status: ${status.toLowerCase()}`);
        }
        if(based_on_case_insensitive == "m"){
            filePath = `data/cache/military_situation.json`;
        }
        else if(based_on_case_insensitive == "e"){
            filePath = `data/cache/economic_status.json`;
        }
        else{
            throw new Error(`Invalid input: ${based_ontoLowerCase()}`);
        }
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            if (data.length !== 0) {
                data_json = JSON.parse(data);
            }
        }
        else if (!data_json[status.toLowerCase()] && !fs.existsSync(filePath)) {
            if (based_on_case_insensitive === "m") {
                cache_militair(status);
            } else {
                cache_economic(status);
            }
            const data = fs.readFileSync(filePath, 'utf8');
            if (data.length !== 0) {
                data_json = JSON.parse(data);
            }
            else{
                data_json = []
            }
        }
        return data_json[status.toLowerCase()];
    } else {
        throw new Error(`Invalid input: ${based_on.toLowerCase()}`);
    }
}