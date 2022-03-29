const UserDAO = require("./user-dao").UserDAO;

function CourseDAO(db) {
    "use strict";

    if (false === (this instanceof CourseDAO)) {
        console.log("Warning: CourseDAO constructor called without 'new' operator");
        return new CourseDAO(db);
    }

    const coursesDB = db.collection("courses");
    const userDAO = new UserDAO(db);

    this.update = (userId, preTax, afterTax, roth, callback) => { //update field
        const parsedUserId = parseInt(userId);

        // Create contributions document
        const courses = {
            userId: parsedUserId,
            preTax: preTax,
            afterTax: afterTax,
            roth: roth
        };

        coursesDB.update({
            userId
            },
            contributions, {
                upsert: true //may constain
            },
            err => {
                if (!err) {
                    console.log("Updated courses");
                    // add user details
                    userDAO.getUserById(parsedUserId, (err, user) => {

                        if (err) return callback(err, null);

                        courses.userName = user.userName;
                        courses.firstName = user.firstName;
                        courses.lastName = user.lastName;
                        courses.userId = userId;

                        return callback(null, courses);
                    });
                } else {
                    return callback(err, null);
                }
            }
        );
    };

    this.getByUserId = (userId, callback) => {
        coursesDB.findOne({
                userId: userId
            },
            (err, courses) => {
                if (err) return callback(err, null);

                // Set defualt courses if not set
                courses = courses || {
                    preTax: 2,
                    afterTax: 2,
                    roth: 2
                };

                // add user details
                userDAO.getUserById(userId, (err, user) => {

                    if (err) return callback(err, null);
                    courses.userName = user.userName;
                    courses.firstName = user.firstName;
                    courses.lastName = user.lastName;
                    courses.userId = userId;

                    callback(null, courses);
                });
            }
        );
    };
}

module.exports = { CourseDAO };
