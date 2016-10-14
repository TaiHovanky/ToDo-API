module.exports = function (sequelize, DataTypes) {
    return sequelize.define('todo', {
        description: {
            type: DataTypes.STRING,
            allowNull: false, //user must include a description with the todo item
            validate: {
                len: [1, 250]  //prevents empty strings from being added as todos. Only takes strings 1-250 characters long
            }
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false, //user must include a completed status
            defaultValue: false
        } //don't need a notEmpty for a Boolean since you it has to be true or false
    }); //the todo model
}