## node mysql

### server
```
npm install
npm start
```

### client(CORS)
```
http://127.0.0.1:5500/client/index.html
```

### API
| URL                       | METHOD | DESCRIPTION               |
|---------------------------|--------|---------------------------|
| /user                     | GET    | selects user              |
| /user/:id                 | GET    | select user               |
| /user                     | POST   | insert user               |
| /user/:id                 | PUT    | update user               |
| /user/:id                 | DELETE | delete user               |

### Table
```sql
CREATE TABLE IF NOT EXISTS `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
    `name` varchar(32) NOT NULL COMMENT 'user name',
    `pay` double NOT NULL COMMENT 'user pay',
    `age` int(3) NOT NULL COMMENT 'user age',
    PRIMARY KEY (`id`)
)
ENGINE          = InnoDB
DEFAULT CHARSET = latin1
COMMENT         = 'user table'
AUTO_INCREMENT  = 1;
```

> requirements
> * mysql
> * restify
> * restif-cors-middleware
> * axios (client)
