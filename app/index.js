import $ from 'jquery';



function getTasks() {
    return fetch('http://localhost:3500/tasks');
}

function deleteTask(id) {
    return fetch('http://localhost:3500/delete-task/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
}


var lista_tareas = $('#lista-tareas');


getTasks()
    .then(data => data.json())
    .then(tasks => {
        return tasks.tasks;
    })
    .then(arrayTasks => {
        arrayTasks.forEach(elemento => {
            var template = `
            <div class="tareas">
           
            <button class="editar">Editar</button>
            <button class="borrar">Borrar</button>
            <p>
            <label for="${elemento._id}">Nombre</label>
            <input type="text" name="name" id="${elemento._id}" value="${elemento.name}" disabled>
            </p>

            <p>
            <label for="${elemento.matter}">Materia</label>
            <input type="text" name="matter" id="${elemento.matter}" value="${elemento.matter}" disabled>
            </p>

            <p>
            <label for="${elemento.teacher}">Profesor</label>
            <input type="text" name="teacher" id="${elemento.teacher}" value="${elemento.teacher}" disabled>
            </p>

            <p>
            <label for="${elemento.description}">Descripción</label>
            <textarea name="description" id="${elemento.description}" disabled>${elemento.description}</textarea >
            </p>

            <p>
            <label for="${elemento.date}">Fecha</label>
            <input type="text" name="date" id="${elemento.date}" value="${elemento.date}" disabled>
            </p>
            
            <p>
            <label for="${elemento.hour}">Hora</label>
            <input type="text" name="hour" id="${elemento.hour}" value="${elemento.hour}" disabled>
            </p>
            <button class="guardar" disabled>Guardar</button>
            </div>
            `
            if (!localStorage.getItem(elemento._id)) {
                localStorage.setItem(elemento._id, JSON.stringify(elemento));
                lista_tareas.append(template);

            } else {
                lista_tareas.append(template);
            }


        });
        $('.tareas').find('.editar').click(function() {
            var id = $(this).closest('div').find('input[name="name"]').attr('id');
            $(this).closest('div').find('input[name="name"],input[name="matter"], input[name="teacher"] ,textarea[name="description"], input[name="date"],input[name="hour"] ')
                .attr('disabled', false);
            $('.tareas').find('.guardar').attr('disabled', false).css('cursor', 'pointer');
            console.log(id);

        });
        $('.borrar').click(function() {
            var id = $(this).closest('div').find('input[name="name"]').attr('id');
            var opcion = confirm('¿Esta seguro de borrar?');
            if (opcion == true) {
                deleteTask(id);
                setTimeout(function() {
                        location.reload();
                    },
                    600);
            }




        });
        $('.guardar').click(function() {
            alert('guardar');
        });
    })
    .catch(error => console.log(error));