module.exports = (sequelize, DataTypes) => {
  const SampleChildModel = sequelize.define('SampleChildModel', {
    'title': DataTypes.STRING,
  });

  SampleChildModel.associate = jest.fn((models) => {
    SampleChildModel.belongsTo(models.SampleModel);
  });

  return SampleChildModel;
};
