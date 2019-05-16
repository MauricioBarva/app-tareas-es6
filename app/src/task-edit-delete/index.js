/**
 * Module Dependencies
 */

import $ from 'jquery'
import page from 'page';
import container from '../task-container/index';
import Task from '../models/task';

export var taskToUpdate;

export default function renderTasks(shows) {
    var id, nameToEdit, matterToEdit, teacherToEdit, descriptionToEdit, dateToEdit, hourToEdit, question,
        taskToBeUpdated, arrayTasks, select;
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
        <input type="date" name="date" id="date" navigation="true" value="${elemento.date}" disabled>
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
        id = $(this).closest('.tareas').find('input[id="name"]').attr('name');
        question = confirm('¿Are you sure to delete?')
        if (question) {
            page('/delete-task/' + id);
        } else {

        }
    });

    $('.editar').click(function() {
        /**
         * Aquí le digo, parese en el div que tenga la clase .tareas y encuentreme
         * el input que tenga el id="name", los guardo en un array y le digo por cada elemento
         *  pongame su atributo disabled a false
         */
        select = $(this);
        select.css('cursor', 'not-allowed').attr('disabled', true);
        id = select.closest('.tareas').find('input[id="name"]').attr('name');
        nameToEdit = select.closest('.tareas').find('input[id="name"]');
        matterToEdit = select.closest('.tareas').find('input[id="matter"]');
        teacherToEdit = select.closest('.tareas').find('input[id="teacher"]');
        descriptionToEdit = select.closest('.tareas').find('textarea[id="description"]');
        dateToEdit = select.closest('.tareas').find('input[name="date"]');
        hourToEdit = select.closest('.tareas').find('input[id="hour"]');
        arrayTasks = [nameToEdit, matterToEdit, teacherToEdit, descriptionToEdit, dateToEdit, hourToEdit];
        arrayTasks.forEach(elemento => {
            elemento.attr('disabled', false);
        });
        $('.guardar').css('cursor', 'pointer').attr('disabled', false);
        page('/update-task/' + id);

    });

    $('.guardar').click(function() {
        /**
         * Lo mismo, parese en el div que tenga id="name" y deme el valor que esta 
         * en el atributto name, en este name, guardé el id que me llega del proyecto
         * para poder editarlo desde el backend. Luego pongo los pongo en disabled otra vez. 
         * Entonces a mi var taskToUpdate que voy a enviar en el fetch por PUT digo que va a ser
         * un new Task y le asigno los valores que están dentro de los inputs, al momento de dar guardar, 
         * luego le envio una variable, en este caso taskToBeUpdated
         * para poder hacer lo de la petición.
         * 
         */
        select = $(this);
        nameToEdit = select.closest('.tareas').find('input[id="name"]');
        matterToEdit = select.closest('.tareas').find('input[id="matter"]');
        teacherToEdit = select.closest('.tareas').find('input[id="teacher"]');
        descriptionToEdit = select.closest('.tareas').find('textarea[id="description"]');
        dateToEdit = select.closest('.tareas').find('input[name="date"]');
        hourToEdit = select.closest('.tareas').find('input[id="hour"]');
        select.attr('disabled', true).css('cursor', 'not-allowed');
        $('.editar').css('cursor', 'pointer').attr('disabled', false);
        arrayTasks = [nameToEdit, matterToEdit, teacherToEdit, descriptionToEdit, dateToEdit, hourToEdit];
        arrayTasks.forEach(elemento => {
            elemento.attr('disabled', true);
        });
        taskToUpdate = new Task(nameToEdit.val(), matterToEdit.val(), teacherToEdit.val(), descriptionToEdit.val(),
            dateToEdit.val(), hourToEdit.val());

        page('/update-task/:id', taskToBeUpdated);
    });
}