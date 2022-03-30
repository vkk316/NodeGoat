const UserDAO = require("./user-dao").UserDAO;

function CourseDAO(db) {
    "use strict";

    if (false === (this instanceof CourseDAO)) {
        console.log("Warning: CourseDAO constructor called without 'new' operator");
        return new CourseDAO(db);
    }

    const coursesDB = db.collection("courses");
    const userDAO = new UserDAO(db);

    this.update = (userId, courseID, courseStatus, callback) => { //update field
        const parsedUserId = parseInt(userId);

        // Create contributions document
        const courses = {
            status: courseStatus
        };

        coursesDB.update({
            userId,
            courseID
            },
            courses,
            err => {
                if (!err) {
                    console.log("Updated courses");
                    // add user details
                    this.getByUserId(parsedUserId, (err, c) => {

                        if (err) return callback(err, null);

                        return callback(null, c);
                    });
                } else {
                    return callback(err, null);
                }
            }
        );
    };

    this.getByUserId = (userId, callback) => {
        let payload = {};
        coursesDB.find({userId: userId}).toArray((err, c) => {
            if (err) return callback(err, null);
            //if (!courses) return callback("ERROR: No memos found", null);
            userDAO.getUserById(userId, (err, user) => {

                if (err) return callback(err, null);

                payload.userName = user.userName;
                payload.firstName = user.firstName;
                payload.lastName = user.lastName;
                payload.userId = userId;
                payload.data = c;

                return callback(null, payload);
            });
        });
    };
}

module.exports = { CourseDAO };
