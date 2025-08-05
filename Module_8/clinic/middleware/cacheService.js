//const redis = require("../config/redis");
  
module.exports = {
    isTokenBlacklisted: async (accessToken) => {
      // const blacklistKey = `blacklist:${accessToken}`;
      // const isBlacklisted = await redis.get(blacklistKey);
      return isBlacklisted === "true";
    },

    // fetchCachedData: async (cacheKey) => {
    //   const cachedData = await redis.get(cacheKey);
    //   return cachedData;
    // },

    // setCacheData: async (cacheKey, data, ttl) => {
    //   await redis.setEx(cacheKey, ttl, JSON.stringify(data));
    // },
}

  