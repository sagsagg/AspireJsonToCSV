const converter = require('json-2-csv');
const fs = require('fs');
const csvParser = require('csv-parser');

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

const convertCsvToJson = (csvFilePath, callback) => {
    const jsonArray = [];

    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (row) => {
            jsonArray.push(row);
        })
        .on('end', () => {
            callback(null, jsonArray);
        })
        .on('error', (error) => {
            callback(error, null);
        });
}

const convertJson2CSV = async () => {
    try {
        const csv = await converter.json2csv(transformTranslation());

        fs.writeFileSync('./data/translation.csv', csv)
    } catch (error) {
        console.log(error);
    }
};

const convertToSingleObject = (dataArray) => {
    return dataArray.reduce((resultObject, data) => {
        resultObject[data["Translation key"]] = data["Bahasa"];
        return resultObject;
    }, {});
}

// convertCsvToJson('./data/translations.csv', (error, jsonData) => {
//     if (error) {
//         console.error('Error converting CSV to JSON:', error);
//     } else {
//         fs.writeFileSync('translation.json', JSON.stringify(convertToSingleObject(jsonData)))
//     }
// });

convertJson2CSV();