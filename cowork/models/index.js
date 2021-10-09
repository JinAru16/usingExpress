const Sequelize = require('sequelize');
const config = require('../config/config.json'); // config.js에 접근해서 데이터를 가져옴

const {
  username, password, database, host, dialect,
} = config.development; // congif.js 중에서도 development 객체의 접속 정보를 가져옴.
const sequelize = new Sequelize(databse, username, password, {
  host,
  dialect,
});

const Member = require('member')(sequelize, sequelize.DataTypes);

const db = {};
db.Member = Member;

module.exports = db;