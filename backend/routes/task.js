'use strict';

var express = require('express');
var TaskController = require('../controllers/task');
var router = express.Router();

router.post('/save-task', TaskController.saveTask);
router.get('/tasks', TaskController.findTasks);
router.put('/edit-task/:id', TaskController.updateTask);
router.get('/task/:id', TaskController.findTaskById);
router.delete('/delete-task/:id', TaskController.deleteTaskById);


module.exports = router;