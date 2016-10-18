module.exports = function (sequelize, DateTypes) {
    return sequelize.define('user', {
        email: {
            type: DateTypes.STRING,
            allowNull: false, //user must include an email address with the todo item
            unique: true, //makes sure no other user records in db with this same email address
            validate: {
                isEmail: true  //built in sequelize functionality that validates whether it's an email
            }
        },
        password: {
            type: DateTypes.STRING,
            allowNull: false, //user must include a password
            validate: {
                len: [7, 100] //look in Validate Regex
            }
        } //don't need a notEmpty for a Boolean since you it has to be true or false
    }, {
        hooks: {
            beforeValidate: function(user, options){
                if(typeof user.email === 'string'){
                    user.email = user.email.toLowerCase();
                }
            }
        }
    });
}