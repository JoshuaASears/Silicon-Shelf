// import
var mysql = require('mysql')

// 'connection pool'
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_searsjos',
    password        : '9009',
    database        : 'cs340_searsjos'
})

// export
module.exports.pool = pool;