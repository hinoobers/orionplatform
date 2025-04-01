const mysql2 = require("mysql2");

const pool = mysql2.createPool({
    host: 'ss.byenoob.com',
    user: 'u4_hroCOsRSC1',
    password: 'hTVAwmLSIYAnB8YE.@6mj1V@',
    database: 's4_adb',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

module.exports = pool.promise();