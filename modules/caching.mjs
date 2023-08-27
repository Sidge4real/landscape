import fs from 'fs';

const get_cache_data = (subkey, desiredStatus) => {
    const filePath = 'data/json/countries.json';
    
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            if (data.length !== 0) {
                const data_json = JSON.parse(data);

                const result = [];

                for (const country in data_json) {
                    const countryData = data_json[country];
                    if (
                        countryData.hasOwnProperty(subkey) &&
                        countryData[subkey] === desiredStatus
                    ) {
                        result.push(country);
                    }
                }

                return result;
            } else {
                console.error(`Cache file is empty: ${filePath}`);
            }
        } else {
            console.error(`Cache file does not exist: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error reading cache data: ${error.message}`);
    }
    
    return [];
};


export const cache_economic = (status) => {
    let data = get_cache_data("economic_status", status);
    const filePath = 'data/cache/economic_status.json';
    const dataToCache = { [status]: data };

    try {
        fs.writeFileSync(filePath, JSON.stringify(dataToCache, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error caching economic data: ${error.message}`);
    }
};

export const cache_militair = (status) => {
    let data = get_cache_data("military_situation", status);
    const filePath = 'data/cache/military_situation.json';
    const dataToCache = { [status]: data };

    try {
        fs.writeFileSync(filePath, JSON.stringify(dataToCache, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error caching military data: ${error.message}`);
    }
};