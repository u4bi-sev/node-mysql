const config  = require('./model/config'),
      restify = require('restify'),
      corsMiddleware = require('restify-cors-middleware');

/* cross origin http */
const cors = corsMiddleware( { origins: ['http://127.0.0.1:5500'] } );
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    url     : config.hostname
});


const connection = config.db.get;
config.db.open(connection);



server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);
server.use((req, res, next) => {
    // access token
    console.log(new Date(), req.method, req.url);
    next();
});


server.get('/user', (req, res) => {
    connection.query('SELECT * FROM user', (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});


server.get('/user/:id', (req, res) => {
    connection.query('SELECT * FROM user WHERE id=?', [req.params.id], (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});


server.post('/user', (req, res) => {
    
    let postData  = req.body;

    connection.query('INSERT INTO user SET ?', postData, (error, results, fields) => {
        if (error) throw error;
        
        let data = { id : results.insertId, ...req.body };        
        res.end(JSON.stringify(data));
    });

});


server.put('/user/:id', (req, res) => {
    
    let sql = `UPDATE user
               SET
                    name = ?,
                    pay = ?,
                    age = ?
               WHERE
                    id = ?`;

    connection.query(sql,
        [
            req.body.name,
            req.body.pay,
            req.body.age,
            req.params.id

        ], (error, results, fields) => {

            if (error) throw error;

            let data = { id : req.params.id , ...req.body };
            res.end(JSON.stringify(data));
            
        }
    );
    
});


server.del('/user/:id', (req, res) => {
    connection.query('DELETE FROM user WHERE id=?', [req.params.id], (error, results, fields) => {
        if (error) throw error;

        let data = { id : req.params.id , message : 'deleted user' };
        res.end(JSON.stringify(data));
    });
});

server.listen(7778, () => console.log(server.name, server.url));