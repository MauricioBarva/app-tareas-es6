/**
 * Module Dependencies
 */

import $ from 'jquery';
import page from 'page';
import { getTasks, deleteTask, addTask, updateTask } from './services/index';
import renderTasks from './task-edit-delete/index';
import Task from './models/task';
import { name, matter, teacher, description, date, hour } from './task-values/index';
import { taskToUpdate } from './task-edit-delete/index';


page('/', function() {
    //En la raíz de la página llamo las tareas
    getTasks(function(tasks) {
        //Renderizo las tareas y las pinto en el div
        renderTasks(tasks);
    });

});

$('#formulario').submit(function(e) {
    e.preventDefault();
    //Creo una tarea y le asigno los valores actuales de los input del form y luego llamo  el metodo addTask
    // y le envio la tarea
    var myTask = new Task(name.val(), matter.val(), teacher.val(), description.val(), date.val(), hour.val());
    addTask(myTask);
    setTimeout(() => {
        location.reload();
    }, 1000);
})
page('/delete-task/:id', function(ctx, next) {
    //Obtengo el id que me envian por parametro, y llamo la funcion deleteTask 
    var id = ctx.params.id
    deleteTask(id);
    setTimeout(() => {
        location.reload();
    }, 1000);
    page.redirect('/');

});

page('/update-task/:id', function(ctx, next) {
    //Le digo, cuando le de al boton guardar, captureme el id que me están enviando por parametro
    // ejecuto la función updateTask  y le envio los correspondientes parametros.
    $('.guardar').click(function() {
        var id = ctx.params.id
        updateTask(id, taskToUpdate);
        setTimeout(() => {
            location.reload();
        }, 100);
        page.redirect('/');
    });



});


page('*', function() {
    $('body').text('Not found!')
})

page()