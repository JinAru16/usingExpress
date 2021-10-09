'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Member.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER, //sequelize.Integer과 DataTypes.Integer은 같은거임. 근데 5번라인 보면 두번째 파라미터로 DataTypes를 쓰기 때문에 DataTypes를 써주는거임.
    },
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    position: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    addmissionDate: DataTypes.DATE,
    birthday: DataTypes.DATE,
    profilemanage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};