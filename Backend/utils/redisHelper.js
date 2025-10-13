const redisClient = require("./redisConfig");

const RDB = {
  set: async (key, value, ttl = 60) => {
    try {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    } catch (err) {
      console.error("Redis set error:", err);
    }
  },
  get: async (key) => {
    try {
      const value = await redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error("Redis get error:", err);
      return null;
    }
  },
  del: async (key) => {
    try {
      await redisClient.del(key);
    } catch (err) {
      console.error("Redis del error:", err);
    }
  },
};

module.exports = { RDB };
