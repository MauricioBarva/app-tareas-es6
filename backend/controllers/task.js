'use strict';
var Task = require('../models/task');
var Controller = {
    //Save Task
    saveTask: function(req, res) {

        var task = new Task();
        var data = req.body;

        task.name = data.name;
        task.matter = data.matter;
        task.teacher = data.teacher;
        task.description = data.description;
        task.date = data.date;
        task.hour = data.hour;

        task.save((error, taskStored) => {
            if (error) return res.status(500).send({ message: 'The task could not be stored' });
            if (!taskStored) return res.status(404).send({ message: 'The task does not exist' });
            return res.status(200).send({ task: taskStored });
        });

    },
    //Find all the tasks
    findTasks: function(req, res) {
        Task.find({}).sort().exec((error, tasks) => {
            if (error) return res.status(500).send({ message: 'The tasks could not be displayed' });
            if (!tasks) return res.status(404).send({ message: 'The tasks does not exist' });
            return res.status(200).send({ tasks: tasks });
        });
    },
    //Update task
    updateTask: function(req, res) {
        var taskId = req.params.id;
        var update = req.body;
        Task.findByIdAndUpdate(taskId, update, { new: true }, (error, taskUpdated) => {
            if (error) return res.status(500).send({ message: 'It was not possible to edit the task' });
            if (!taskUpdated) return res.status(404).send({ message: 'The task does not exist' });
            return res.status(200).send({ task: taskUpdated });
        });
    },
    //Find task by id
    findTaskById: function(req, res) {
        var taskId = req.params.id;
        Task.findById(taskId, (error, task) => {
            if (error) return res.status(500).send({ message: 'The task could not be displayed' });
            if (!task) return res.status(404).send({ message: 'The task does not exist' });
            return res.status(200).send({ task: task });
        });
    },
    //Delete task by id
    deleteTaskById: function(req, res) {
        var taskId = req.params.id;
        Task.findByIdAndDelete(taskId, (error, task) => {
            if (error) return res.status(500).send({ message: 'The task could not be deleted' });
            if (!task) return res.status(404).send({ message: 'The task does not exist' });
            return res.status(200).send({ task: task });
        });
    }
}

module.exports = Controller;