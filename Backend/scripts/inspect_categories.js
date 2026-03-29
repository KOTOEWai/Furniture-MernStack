const fs = require("fs");
const csv = require("csv-parser");

const normalizePythonListString = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean).map((v) => String(v).trim()).filter(Boolean);
    if (typeof value !== "string") return [];

    const trimmed = value.trim();
    if (!trimmed || trimmed.toLowerCase() === "nan" || trimmed.toLowerCase() === "none") return [];

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        const inner = trimmed.slice(1, -1).trim();
        if (!inner) return [];

        return inner
            .split(",")
            .map((part) => part.trim())
            .map((part) => part.replace(/^['"]/, "").replace(/['"]$/, "").trim())
            .filter(Boolean);
    }

    return [trimmed];
};

const categories = new Set();
fs.createReadStream("d:/project/Funiture/Backend/data/furniture_dataset_cleaned_v2.csv")
    .pipe(csv())
    .on("data", (data) => {
        const cats = normalizePythonListString(data.categories_clean);
        cats.forEach(c => categories.add(c));
    })
    .on("end", () => {
        console.log(JSON.stringify(Array.from(categories).sort(), null, 2));
    });
