const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
var cors = require('./cors');

const Feedback = require('../models/feedback');

const feedbackRouter = express.Router();

feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')
.options(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Feedback.find(req.query)
    .populate('feedback.author')
    .then((feedback) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(feedback)
    }, (err) => next(err))
        .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Feedback.create(req.body)
    .then((feedback) => {
        console.log('Feedback Created ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(feedback)
    }, (err) => next(err))
        .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /feedback');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Feedback.remove({})
    .then((resp) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = feedbackRouter;