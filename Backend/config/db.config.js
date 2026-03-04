const mongodb = require("mongoose");

const mongoConect = async () => {
    try {
        await mongodb.connect(process.env.Mongo_api,{
            family: 4
        });

    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }       
};

module.exports = mongoConect;