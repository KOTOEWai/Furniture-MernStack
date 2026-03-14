const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const filePath = path.join(__dirname, '../data/furniture_dataset_cleaned_v2.csv');

const asins = new Set();
let nullTitles = 0;
let nullPrices = 0;
let totalRows = 0;
let duplicates = 0;

fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
        totalRows++;
        if (asins.has(data.asin)) {
            duplicates++;
        }
        asins.add(data.asin);

        if (!data.title_clean) nullTitles++;
        if (!data.price_clean || isNaN(parseFloat(data.price_clean))) nullPrices++;
    })
    .on('end', () => {
        console.log('--- Verification Results ---');
        console.log(`Total Rows: ${totalRows}`);
        console.log(`Duplicates: ${duplicates}`);
        console.log(`Null Titles: ${nullTitles}`);
        console.log(`Null/Invalid Prices: ${nullPrices}`);

        if (duplicates === 0 && nullTitles === 0 && nullPrices === 0) {
            console.log('\nVerification PASSED: Data is clean and consistent.');
        } else {
            console.log('\nVerification FAILED: Issues found in cleaned data.');
        }
    });
