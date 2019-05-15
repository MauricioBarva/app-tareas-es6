/**
 * Module Dependencies
 */

import $ from 'jquery'
import page from 'page';
import container from '../task-container/index';
import Task from '../models/task';

export var taskToUpdate = new Task('', '', '', '', '', '');

export default function renderTasks(shows) {
    shows.forEach(elemento => {
        var template = `
        <div id="divid" class="tareas">
        <button class="editar">Editar</button>
        <button class="borrar">Borrar</button>
        <p>
        <label for="name">Nombre</label>
        <input type="text" name="${elemento._id}" id="name" value="${elemento.name}" disabled>
        </p>

        <p>
        <label for="matter">Materia</label>
        <input type="text" name="matter" id="matter" value="${elemento.matter}" disabled>
        </p>

        <p>
        <label for="teacher">Profesor</label>
        <input type="text" name="teacher" id="teacher" value="${elemento.teacher}" disabled>
        </p>

        <p>
        <label for="description">Descripción</label>
        <textarea name="description" id="description" disabled >${elemento.description}</textarea>
        </p>

        <p>
        <label for="date">Fecha</label>
        <input type="date" name="date" id="date" value="${elemento.date}" disabled>
        </p>

        <p>
        <label for="hour">Hora</label>
        <input type="text" name="hour" id="hour" value="${elemento.hour}" disabled>
        </p>
        <button class="guardar" disabled>Guardar</button>
        </div>
        `

        container.append(template);
    });


    //Buttons acá
    $('.borrar').click(function() {
        /*Cuando le de click a este boton, busca en la etiqueta más cercana que tenga
        la clase [ .tareas ], encuentrame el input con id name y devuelveme el valor contenido
        dentro del atributo name*/
        var id = $(this).closest('.tareas').find('input[id="name"]').attr('name');
        var question = confirm('¿Are you sure to delete?')
        if (question) {
            page('/delete-task/' + id);
        } else {

        }
    });

    $('.editar').click(function() {
        /**
         * Aquí le digo, parese en el div que tenga la clase .tareas y encuentreme
         * el input que tenga el id="name" y pongame su atributo disabled a false,
         * se repite el proceso con los demas inputs
         */
        var nameToEdit = $(this).closest('.tareas').find('input[id="name"]');
        nameToEdit.attr('disabled', false);
        var matterToEdit = $(this).closest('.tareas').find('input[id="matter"]');
        matterToEdit.attr('disabled', false);
        var teacherToEdit = $(this).closest('.tareas').find('input[id="teacher"]');
        teacherToEdit.attr('disabled', false);
        var descriptionToEdit = $(this).closest('.tareas').find('textarea[id="description"]');
        descriptionToEdit.attr('disabled', false);
        var dateToEdit = $(this).closest('.tareas').find('input[name="date"]');
        dateToEdit.attr('disabled', false);
        var hourToEdit = $(this).closest('.tareas').find('input[id="hour"]');
        hourToEdit.attr('disabled', false);
        $('.guardar').css('cursor', 'pointer').attr('disabled', false);
    });
    $('.guardar').click(function() {
        /**
         * Lo mismo, parese en el div que tenga id="name" y deme el valor que esta 
         * en el atributto name, en este name, guardé el id que me llega del proyecto
         * para poder editarlo desde el backend. Luego pongo los pongo en disabled otra vez. 
         * Entonces a mi clase Task que voy a enviar en el fetch por PUT le asigno los 
         * valores que están dentro de los inputs, al momento de dar guardar, 
         * luego le envio el id y una variable, en este caso taskToBeUpdated
         * para poder hacer la petición.
         * 
         */
        var id = $(this).closest('.tareas').find('input[id="name"]').attr('name');
        var nameToEdit = $(this).closest('.tareas').find('input[id="name"]');
        nameToEdit.attr('disabled', true);
        var matterToEdit = $(this).closest('.tareas').find('input[id="matter"]');
        matterToEdit.attr('disabled', true);
        var teacherToEdit = $(this).closest('.tareas').find('input[id="teacher"]');
        teacherToEdit.attr('disabled', true);
        var descriptionToEdit = $(this).closest('.tareas').find('textarea[id="description"]');
        descriptionToEdit.attr('disabled', true);
        var dateToEdit = $(this).closest('.tareas').find('input[name="date"]');
        dateToEdit.attr('disabled', true);
        var hourToEdit = $(this).closest('.tareas').find('input[id="hour"]');
        hourToEdit.attr('disabled', true);
        $(this).css('cursor', 'not-allowed').attr('disabled', true);
        taskToUpdate.setName(nameToEdit.val());
        taskToUpdate.setMatter(matterToEdit.val());
        taskToUpdate.setTeacher(teacherToEdit.val());
        taskToUpdate.setDescription(descriptionToEdit.val());
        taskToUpdate.setDate(dateToEdit.val());
        taskToUpdate.setHour(hourToEdit.val());
        var taskToBeUpdated;
        page('/update-task/' + id, taskToBeUpdated);
    });
}