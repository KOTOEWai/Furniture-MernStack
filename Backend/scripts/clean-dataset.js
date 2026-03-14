const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFilePath = path.join(__dirname, '../data/furniture_dataset_cleaned.csv');
const outputFilePath = path.join(__dirname, '../data/furniture_dataset_cleaned_v2.csv');

const results = [];
const seenAsins = new Set();
const seenUniqIds = new Set();

let totalRows = 0;
let duplicates = 0;
let missingCriticalData = 0;

console.log('Starting data cleaning process...');

// Check if input file exists
if (!fs.existsSync(inputFilePath)) {
    console.error(`Error: Input file not found at ${inputFilePath}`);
    process.exit(1);
}

fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', (data) => {
        totalRows++;

        // 1. Deduplication (asin and uniq_id)
        const asin = data.asin ? data.asin.trim() : null;
        const uniqId = data.uniq_id ? data.uniq_id.trim() : null;

        if (!asin || seenAsins.has(asin) || !uniqId || seenUniqIds.has(uniqId)) {
            duplicates++;
            return;
        }

        // 2. Filter missing critical data
        const title = data.title_clean ? data.title_clean.trim() : null;
        // Check if price_clean exists and is not empty or non-numeric
        const priceStr = data.price_clean ? data.price_clean.trim() : "";
        const price = parseFloat(priceStr);
        const image = data.primary_image ? data.primary_image.trim() : null;

        if (!title || priceStr === "" || isNaN(price) || !image) {
            missingCriticalData++;
            return;
        }

        // 3. Normalization
        seenAsins.add(asin);
        seenUniqIds.add(uniqId);

        // Clean all fields (trim whitespace)
        const cleanedData = {};
        for (const key in data) {
            cleanedData[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
        }

        cleanedData.price_clean = price;

        results.push(cleanedData);
    })
    .on('end', () => {
        console.log(`\n--- Cleaning Summary ---`);
        console.log(`Total rows read: ${totalRows}`);
        console.log(`Duplicates removed: ${duplicates}`);
        console.log(`Rows with missing/invalid critical data skipped: ${missingCriticalData}`);
        console.log(`Final cleaned rows: ${results.length}`);

        if (results.length === 0) {
            console.log('No data to write.');
            return;
        }

        // Manual CSV writing to avoid external dependency for writing
        const headers = Object.keys(results[0]);
        const writeStream = fs.createWriteStream(outputFilePath);

        // Write header
        writeStream.write(headers.join(',') + '\n');

        // Function to escape CSV values
        const escapeCSV = (val) => {
            if (val === null || val === undefined) return '';
            let str = String(val);
            // Basic escaping for CSV if it contains commas or quotes
            if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
                str = '"' + str.replace(/"/g, '""') + '"';
            }
            return str;
        };

        results.forEach((row) => {
            const line = headers.map(header => escapeCSV(row[header])).join(',');
            writeStream.write(line + '\n');
        });

        writeStream.end();
        console.log(`\nSuccessfully saved cleaned dataset to: ${outputFilePath}`);
    })
    .on('error', (err) => {
        console.error('Error reading CSV file:', err);
    });
