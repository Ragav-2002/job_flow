const UAParser = require("ua-parser-js");

const getDeviceName = (user_agent) => {
    const parser = new UAParser(user_agent);
    const os = parser.getOS().name;
    return os
};

module.exports = getDeviceName;