const UserDAO = require("./user-dao").UserDAO;

function CourseDAO(db) {
    "use strict";

    if (false === (this instanceof CourseDAO)) {
        console.log("Warning: CourseDAO constructor called without 'new' operator");
        return new CourseDAO(db);
    }

    const coursesDB = db.collection("courses");
    const userDAO = new UserDAO(db);

    this.update = (userId, courseId, course_status,callback) => {
        var payload = {} //update field

        console.log(userId)
        console.log(courseId)
        console.log(course_status)

        coursesDB.update({userId: userId, course_id: courseId},
            {$set :{status: course_status}},err => {
                if(!err){
                    userDAO.getUserById(userId, (err, user) => {

                        if (err) return callback(err, null);
        
                        payload.userName = user.userName;
                        payload.firstName = user.firstName;
                        payload.lastName = user.lastName;
                        payload.userId = userId+"";
        
                        return callback(null, payload);
                    });
                }else{
                    return callback(err, null);
                }
            })
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
