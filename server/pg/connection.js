'use strict';
var pg = require('pg');
pg.defaults.ssl = true;
module.exports = class Connection {
  constructor(sql){
    this.sql = sql;

    let dbName = process.env.DB_NAME || 'imap_e2e';
    let dbHost = process.env.DB_HOST || 'localhost';
    let dbUser = process.env.DB_USER || 'djul';
    let dbPassword = process.env.DB_PASSWORD || 'dba';

    // let conString = `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
    var conString = 'postgres://iquxhghawsucgl:lyNPH-s5HeLI9j9Xbsra0GD3nk@ec2-54-228-189-127.eu-west-1.compute.amazonaws.com:5432/deotrm1iiooffc';
    this.client = new pg.Client(conString);
  };

  sqlQuery(){
    if (this.sql === '' || this.sql === null) {
      throw new Error('Method should be overridden!');
    }

    return this.sql;
  };

  runStatement(){
    return new Promise((resolve, reject) => {
      console.log('SQL query: ', this.sqlQuery());
      this.client.query(this.sqlQuery(), (err, result) => {
        if(err) {
          console.log('Unable to execute SQL: ', err);
          reject(`Error: ${err}`);
        }

        resolve(result);

        this.client.end();
      });
    });
  };

  execQuery(){
    return new Promise((resolve, reject) => {
      this.client.connect(err => {
        if(err) {
          reject(`Could not connect to PostgreSQL: ${err}`);
        }
        resolve(this.runStatement());
      });
    });
  };
};

