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

        courseDAO.update(parseInt(userId), req.body.course_id, req.body.status, (error, courses) => {
            if (error) return next(error);

            courses.userId = userId; //set for nav menu items
            return res.render("courses", {
                ...courses,
                environmentalScripts
            });
        });
    }

}

module.exports = CourseRegisterationHandler;
