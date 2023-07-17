const converter = require('json-2-csv');
const fs = require('fs');

const rawJsonData = fs.readFileSync('./data/translation.json');
const translationJson = JSON.parse(rawJsonData);

const transformTranslation = () => {
    const outputArray = Object.keys(translationJson).map((key) => ({
        "Translation key": key,
        "English": translationJson[key],
        "Bahasa": "", // You can add other language translations here if available
        "Context": "",
    }));

    return outputArray;
}

const convertJson2CSV = async () => {
    try {
        const csv = await converter.json2csv(transformTranslation());

        fs.writeFileSync('./data/translation.csv', csv)
    } catch (error) {
        console.log(error);
    }
};

convertJson2CSV();