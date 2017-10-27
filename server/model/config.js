const mysql = require('mysql');

module.exports = {
   name: 'rest-api',
   version: '0.0.1',
   db: {
        get : mysql.createConnection({
            host     : 'localhost',
            user     : '',
            password : '',
            database : ''
        }),
        open : (con) => con.connect( (err) => err ? console.log('error') : console.log('connected'))
   }
}