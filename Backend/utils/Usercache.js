const {RDB} = require("./redisHelper");

const setCachUser = async (key,value)=>{
    await RDB.set(key,value)
}
const getCachUser = async (key)=>{
    return await RDB.get(key)
}


module.exports = {setCachUser , getCachUser}