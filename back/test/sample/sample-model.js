module.exports = (sequelize, DataTypes) => {
  const SampleModel = sequelize.define('SampleModel', {
    'title': DataTypes.STRING,
  });

  SampleModel.associate = jest.fn((models) => {
    SampleModel.hasMany(models.SampleChildModel);
  });

  return SampleModel;
};
