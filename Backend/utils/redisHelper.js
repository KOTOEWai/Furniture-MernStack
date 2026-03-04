const redisClient = require("./redisConfig");
const CustomError = require("./CustomError");
const RDB = {
  set: async (key, value, ttl = 3600) => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await redisClient.setEx(key, ttl, stringValue);
    } catch (err) {
     throw CustomError("Redis set error:", err);
    }
  },
  get: async (key) => {
    try {
      const value = await redisClient.get(key);
      if (!value) return null;
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (err) {
      throw CustomError("Redis get error:", err);
    }
  },
  del: async (key) => {
    try {
      await redisClient.del(key);
    } catch (err) {
     throw CustomError("Redis del error:", err);
    }
  },
};

module.exports = { RDB };
