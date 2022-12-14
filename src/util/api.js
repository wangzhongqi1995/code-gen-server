const mysql = require("mysql2");
const dbConfig = require("./db");
const sqlMap = require("./sqlMap");

// 初始化连接池
const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true,
});

exports = {
  getValue(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [id], (err, result) => {
        res.json(result);
        connection.release();
      });
    });
  },
  setValue(req, res, next) {
    console.log(req.body);
    var id = req.body.id,
      name = req.body.name;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [name, id], (err, result) => {
        res.json(result);
        connection.release();
      });
    });
  },
};
