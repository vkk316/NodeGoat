const CourseDAO = require("../data/course-dao").CourseDAO;
const {
    environmentalScripts
} = require("../../config/config");

function CourseRegisterationHandler(db) {
    "use strict";

    const courseDAO = new CourseDAO(db);

    this.displayCourses = (req, res, next) => {
        const {
            userId
        } = req.session;

        courseDAO.getByUserId(userId, (error, courses) => {
            console.log(courses);
            if (error) return next(error);

            courses.userId = userId; //set for nav menu items
            return res.render("courses", {
                ...courses,
                environmentalScripts
            });
        });
    };

    this.handleCourseRegisterationUpdate = (req, res, next) => {

        const {
            userId
        } = req.session;
        const {
            courseID
        } = req.body.course_id;
        const {
            courseStatus
        } = req.body.status;

        courseDAO.update(userId, courseID, courseStatus, (err, courses) => {

            if (err) return next(err);

            return res.render("courses", {
                courses,
                environmentalScripts
            });
        });

    };

}

module.exports = CourseRegisterationHandler;
