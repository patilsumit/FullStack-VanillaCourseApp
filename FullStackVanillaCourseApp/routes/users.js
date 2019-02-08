// Include the required modules
const { createCourse, getAllCourses, getCourseById, updateCourse } = require('../models/courses');
const express = require('express');
const Joi = require('joi'); // JSON validation

const route = express.Router();

