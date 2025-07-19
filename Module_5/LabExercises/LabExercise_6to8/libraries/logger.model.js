class Logger {
    id = Math.floor(Math.random() * 1_000_000);
    log(callerID, message) {
        console.log(`Logger${this.id}: ID${callerID} -> Message: ${message}`);
    }
};

module.exports = Logger;