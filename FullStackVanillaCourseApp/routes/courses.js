// Include the required modules
const { createCourse, getAllCourses, getCourseById, updateCourse ,deleteCourse } = require('../models/courses');
const express = require('express');
const Joi = require('joi'); // JSON validation
const authToken = require('../middleware/auth');

const route = express.Router();

" /api/course - URL"
// Route handler for get all courses
route.get('/', (req, res) => {
    // Get all courses
    getAllCourses()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to get course\n" + err.message);
            console.log("Error: Unable to get course\n", err);
        })
});

//API with param id
route.get('/:id', (req, res) => {
    const id = req.params.id;
    // Get the course object using id
    getCourseById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(404);
            res.send("Error: Unable to get course\n" + err.message);
            console.log("Error: Unable to get course\n", err);
        })
});

/****************** END: get requests *************/

/****************** BEGIN: post requests *************/

// http://localhost/api/course - POST - {JSON course}
// POST API to create a new course
// route.post('/', [authToken,authorizeRole], (req, res) => {
route.post('/',[authToken],(req, res) => {
    // Validate the course info
    const { error } = validateCourse(req.body); //Joi

    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Add course to db
    createCourse(req.body) // JSON course object
        .then((result) => {
            res.send(result); //  Send the result (new course object) back to user
            console.log("Created a new course: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to create course\n" + err.message);
            console.log("Error: Unable to create course\n", err);
        });
});

/****************** END: post requests *************/

/****************** BEGIN: PUT requests *************/
// Handler to update a course using put method
route.put('/:id', (req, res) => {
    // Look up the course. If not found return 404
    const id = req.params.id;
    // Get the course object using id
    getCourseById(id)
        .then((result) => {
            // id is valid. Update the course
            // Add id field to course object
            var course = req.body;
            course._id = id;
            // Validate the course info
            const { error } = validateCourse(course); //Joi

            if (error) {
                res.status(400);
                res.send(error.details[0].message); // Sending 1st error message
                console.log(error);
                return;
            }

            // Update course to db
            updateCourse(course) // JSON course object
                .then((result) => {
                    res.send(result); //  Send the result (updated course object) back to user
                    console.log("Updated course: ", result.name);
                })
                .catch((err) => {
                    res.status(500);
                    res.send("Error: Unable to update course\n" + err.message);
                    console.log("Error: Unable to create course\n", err);
                });

        })
        .catch((err) => {
            res.status(404);
            res.send("Error: Unable to get course\n" + err.message);
            console.log("Error: Unable to get course\n", err);
        })

});

// Handler to delete a course using delete method
route.delete('/:id', (req, res) => {
    console.log('welcome');
    // Look up the course. If not found return 404
    var course=req.params.id;
console.log(course);
    deleteCourse(course) // JSON course object
    .then((result) => {
        res.send(result); //  Send the result (updated course object) back to user
        console.log("Deleted course: ", result.name);
    })
    .catch((err) => {
        res.status(500);
        res.send("Error: Unable to deleted course\n" + err.message);
        console.log("Error: Unable to create course\n", err);
    });


});

// Validate function
function validateCourse(course) {
    // Define schema
    const schema = {
        _id: Joi.string(),
        name: Joi.string().min(4).max(60).required(),
        author: Joi.string().min(4).max(60).required(),
        tags: Joi.array().items(Joi.string()), // String Array
        date: Joi.date(),
        price: Joi.number(),
        isPublished: Joi.boolean()
    };

    // Validate
    const result = Joi.validate(course, schema);

    return result;
}

module.exports = route;