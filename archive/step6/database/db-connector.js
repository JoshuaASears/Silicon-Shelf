// import
var mysql = require('mysql')

// 'connection pool'
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '',
    password        : '',
    database        : ''
})

// export
module.exports.pool = pool;